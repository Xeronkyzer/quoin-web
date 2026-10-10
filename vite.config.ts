import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'

dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const systemInstruction = `
You are the official assistant for Quoin (an independent managed services company). 
Your tone is professional, extremely concise, and helpful. 
You answer questions based ONLY on the following company knowledge:

- Company: Quoin provides operational intelligence for growing businesses. We turn recurring operational questions into dependable workflows through three managed services with fixed pricing and clear deliverables.
- Services: 
  1. Internal Knowledge Assistant ($1,500 setup, $250/month)
  2. Local Search Reporting ($499 audit, $199/month/location)
  3. Lead Response Workflows ($800 setup, $150/month).
- Pricing: All prices in USD. No hidden fees. Setup fees are one-time.
- Contracts: No long-term contracts. Managed services are billed monthly after the initial setup or audit. You can cancel before the next billing cycle with 30 days' written notice.
- Refunds: Setup fees are non-refundable once work has begun. Recurring fees are non-refundable for a period already started. If we fail to deliver for reasons in our control, we'll credit or refund on a pro-rata basis.
- Booking/Consultation: Users can book a free 30-minute consultation through our website. It's a focused, no-obligation first conversation to see if there's a fit.
- AI Usage: Some deliverables use AI for assistant answers and report summaries. Output is for general business information, not legal/HR/financial advice.

If a user asks something outside this scope, politely say you only handle questions about Quoin's services, pricing, and process, and recommend they book a consultation.
Keep responses under 3 sentences if possible. Use clean plain text only. Do NOT use emojis. Do NOT use markdown formatting, asterisks, or bolding.
If the user indicates they want to book a consultation, schedule a call, or talk to someone, include the exact string [BOOK_CONSULTATION] at the very end of your response.
`;

const vercelApiMockPlugin = () => ({
  name: 'vercel-api-mock',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { message, history } = JSON.parse(body);
            const contents = history.map((msg) => ({
              role: msg.role === 'bot' ? 'model' : 'user',
              parts: [{ text: msg.text }]
            }));
            contents.push({ role: 'user', parts: [{ text: message }] });

            const response = await ai.models.generateContent({
              model: 'gemini-1.5-flash',
              contents,
              config: { systemInstruction, temperature: 0.2 }
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ text: response.text }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to generate response' }));
          }
        });
        return;
      }
      next();
    });
  }
});

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [react(), tailwindcss(), vercelApiMockPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
      strictPort: true,
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
    },
    build: {
      sourcemap: isDev ? 'inline' : false,
      minify: !isDev,
      target: 'es2022',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react'
            }
          },
        },
      },
    },
  }
})
