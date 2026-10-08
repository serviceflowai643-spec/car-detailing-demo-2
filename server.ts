import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with user-agent telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction for Pure Detailing UK chatbot
const SYSTEM_INSTRUCTION = `You are the official AI Detailing Concierge for Pure Detailing UK, located at Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL, United Kingdom (Phone: +44 7875 500935).
You represent master detailers Alex and Nathan.

Your Mission:
Deliver super-fast, accurate, courteous, and concise answers to clients inquiring about automotive detailing.

Knowledge Base:
1. Business Details:
   - Business Name: Pure Detailing UK
   - Detailers & Founders: Alex and Nathan (all work is handled hands-on by them)
   - Address: Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL
   - Phone: +44 7875 500935 (call or WhatsApp for bookings/advice)
   - Rating: 5.0 Google rating across 2 verified reviews ("Amazing work by Alex and Nathan. Highly recommended!")
   - Hours: Monday – Saturday: 8:00 AM – 6:00 PM, Sunday by appointment.

2. Specialist Services:
   - Exterior Detailing: Citrus foam pre-wash, two-bucket contact wash, iron fallout & tar decon, wheel barrel cleaning, hydrophobic spray seal.
   - Interior Detailing: Vacuum, steam sanitisation of vents and console, pH-balanced matte leather cleaning & conditioning (no greasy residues).
   - Paint Enhancement: Single or multi-stage dual-action machine polishing, digital paint gauge depth audit, removing 75-85%+ of swirl marks and wash marring to restore high optical gloss.
   - Full Detail: Complete exterior and interior rejuvenation package.
   - Maintenance Detail: Safe wash, ceramic sealant top-up, interior freshen up for previously detailed or coated cars.
   - Ceramic Coatings: Professional 9H SiO2 ceramic matrices offering 3 to 5 years durable chemical, UV, and salt protection with extreme water beading.

3. Strict Rules:
   - Do NOT invent or guess fixed pricing. State that accurate quotes require vehicle size, clear-coat condition, and inspection. Direct them to the "Request a Quote" form or call +44 7875 500935.
   - Do NOT invent certifications, awards, or fake guarantees.
   - Keep answers clear, direct, and swift so visitors get the answer instantly.`;

// Streaming Chat API (Server-Sent Events) for ultra-low latency / super fast response
app.post('/api/chat/stream', async (req: Request, res: Response): Promise<void> => {
  const { messages, model = 'gemini-3.1-flash-lite' } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Messages array is required' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Format multi-turn conversation contents for Gemini SDK
  const formattedContents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  try {
    if (ai) {
      // Use gemini-3.1-flash-lite with MINIMAL thinking level for maximum speed
      const responseStream = await ai.models.generateContentStream({
        model: model || 'gemini-3.1-flash-lite',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.MINIMAL,
          },
          temperature: 0.7,
        },
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }
  } catch (error) {
    console.error('Gemini stream error:', error);
  }

  // Fast server-side fallback if Gemini key is unset or error occurred
  const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
  let fallbackReply = `Pure Detailing UK is located at Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL. Master detailers Alex & Nathan provide Exterior, Interior, Paint Enhancement, and Ceramic Coating treatments. Please submit our Request a Quote form or call us directly on +44 7875 500935!`;

  if (lastUserMsg.includes('price') || lastUserMsg.includes('cost') || lastUserMsg.includes('quote')) {
    fallbackReply = `Pricing is tailored based on your vehicle's size and paint condition. Please use the 'Request a Quote' form on our page or call Alex & Nathan on +44 7875 500935 for an exact estimate.`;
  } else if (lastUserMsg.includes('paint') || lastUserMsg.includes('swirl') || lastUserMsg.includes('polish')) {
    fallbackReply = `Our Paint Enhancement uses dual-action machine polishing to safely remove swirls and restore mirror-like clarity without risking your clear coat.`;
  } else if (lastUserMsg.includes('ceramic') || lastUserMsg.includes('coating')) {
    fallbackReply = `We apply professional 9H SiO2 ceramic coatings that provide 3-5 years of durable chemical protection and extreme hydrophobic water beading.`;
  }

  // Stream fallback words with micro-delay for realistic fast typing
  const words = fallbackReply.split(' ');
  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? '' : ' ') + words[i];
    res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
  }
  res.write('data: [DONE]\n\n');
  res.end();
});

// Non-streaming fallback endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  const { messages, model = 'gemini-3.1-flash-lite' } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Messages array is required' });
    return;
  }

  const formattedContents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: model || 'gemini-3.1-flash-lite',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.MINIMAL,
          },
        },
      });

      res.json({ text: response.text || '' });
      return;
    }
  } catch (error) {
    console.error('Gemini generateContent error:', error);
  }

  res.json({
    text: `Pure Detailing UK is open Monday–Saturday at Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL. Call Alex & Nathan on +44 7875 500935 for quotes and bookings.`,
  });
});

// Full-stack Vite mounting
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (mode: ${isDev ? 'development' : 'production'})`);
  });
}

startServer();
