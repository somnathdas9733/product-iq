import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}



export const app = express();
app.use(express.json({ limit: '25mb' }));

// API Route: Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY',
  });
});

// API Route: Generate Product Intelligence
app.post('/api/generate', async (req, res) => {
    try {
      const { productName, category, material, specifications, applications, additionalInfo } = req.body;

      if (!productName && !category && !specifications) {
        return res.status(400).json({ error: 'Please provide at least a Product Name or Category.' });
      }

      const ai = getGeminiClient();

      if (!ai) {
        return res.status(400).json({ error: 'GEMINI_API_KEY is missing or invalid. Please configure your API key in .env' });
      }

      const prompt = `You are ProductIQ, an expert industrial product data intelligence engine.
Analyze the following manufacturer-provided raw product details:
- Product Name: ${productName || 'Not specified'}
- Category: ${category || 'Not specified'}
- Material: ${material || 'Not specified'}
- Technical Specifications: ${specifications || 'Not provided'}
- Applications: ${applications || 'Not provided'}
- Additional Information: ${additionalInfo || 'None'}

STRICT RULES:
1. Extract and summarize information ONLY from facts provided above.
2. NEVER invent technical measurements, performance ratings, certifications, voltages, dimensions, or warranties not present in the user input.
3. If critical specifications are not provided, do NOT fabricate them. Instead, explicitly list them in "missingInformation" (e.g. Dimensions, Weight, Voltage, Temperature Range, Pressure Class, Standards/Certifications, Warranty).
4. Generate a professional commerce-ready short description using ONLY the provided facts.
5. Generate concise, verified key features bullet points directly traceable to provided details.
6. Generate 5-8 relevant B2B SEO keywords for catalog search.
7. Calculate an accurate completenessScore from 0 to 100 based on presence of core B2B industrial catalog attributes (Name, Category, Material, Key Specs, Applications, Physical Metrics, Certifications).
8. In "validation":
   - "status": set to "READY" if completenessScore >= 85 and critical specs are present; otherwise "NEEDS REVIEW".
   - "statusReason": brief explanation of readiness or key missing gaps.
   - "completeInformation": string array of specific data points provided by user.
   - "missingInformation": string array of missing fields relevant to this product category.
   - "potentialIssues": array of any conflicting or ambiguous points in user input (leave empty if none).
   - "scoreBreakdown": list of core criteria items with field name, present (boolean), and impact.
9. In "traceability":
   - "sourceProvided": map the exact user inputs.
   - "aiEnriched": list shortDescription, features, seoKeywords, missingFieldsIdentified.

Return the JSON matching the required schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              category: { type: Type.STRING },
              shortDescription: { type: Type.STRING },
              features: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              applications: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              specifications: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.STRING },
                  },
                  required: ['name', 'value'],
                },
              },
              seoKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              missingInformation: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              completenessScore: { type: Type.INTEGER },
              validation: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING },
                  statusReason: { type: Type.STRING },
                  completeInformation: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  missingInformation: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  potentialIssues: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  completenessPercentage: { type: Type.INTEGER },
                  scoreBreakdown: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        field: { type: Type.STRING },
                        present: { type: Type.BOOLEAN },
                        impact: { type: Type.STRING },
                      },
                      required: ['field', 'present', 'impact'],
                    },
                  },
                },
                required: [
                  'status',
                  'statusReason',
                  'completeInformation',
                  'missingInformation',
                  'potentialIssues',
                  'completenessPercentage',
                ],
              },
              traceability: {
                type: Type.OBJECT,
                properties: {
                  sourceProvided: {
                    type: Type.OBJECT,
                    properties: {
                      productName: { type: Type.STRING },
                      category: { type: Type.STRING },
                      material: { type: Type.STRING },
                      specifications: { type: Type.STRING },
                      applications: { type: Type.STRING },
                      additionalInfo: { type: Type.STRING },
                    },
                  },
                  aiEnriched: {
                    type: Type.OBJECT,
                    properties: {
                      shortDescription: { type: Type.STRING },
                      features: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      seoKeywords: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      missingFieldsIdentified: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                  },
                },
                required: ['sourceProvided', 'aiEnriched'],
              },
            },
            required: [
              'productName',
              'category',
              'shortDescription',
              'features',
              'applications',
              'specifications',
              'seoKeywords',
              'missingInformation',
              'completenessScore',
              'validation',
              'traceability',
            ],
          },
        },
      });

      const text = response.text || '';
      const parsedData = JSON.parse(text);
      return res.json(parsedData);
    } catch (err: any) {
      console.error('Gemini Generate Error:', err);
      return res.status(500).json({ error: 'Failed to generate product intelligence using Gemini AI', details: err?.message });
    }
  });

  // API Route: Extract from PDF / Document Sheet
  app.post('/api/extract-pdf', async (req, res) => {
    try {
      const { fileBase64, mimeType, rawText } = req.body;

      const ai = getGeminiClient();

      if (!ai) {
        return res.status(400).json({ error: 'GEMINI_API_KEY is missing or invalid. Please configure your API key in .env' });
      }

      const promptText = `Extract raw manufacturer product specifications from this document into structured fields:
1. Product Name
2. Product Category
3. Material
4. Technical Specifications (all numbers, dimensions, tolerances, pressures, flow rates, ratings)
5. Applications (use cases, industries)
6. Additional Information (certifications, operating limits, standards)

Only extract facts present in the source. Do NOT hallucinate.`;

      let parts: any[] = [];
      if (fileBase64 && mimeType) {
        parts.push({
          inlineData: {
            mimeType: mimeType,
            data: fileBase64,
          },
        });
        parts.push({ text: promptText });
      } else if (rawText) {
        parts.push({ text: `${promptText}\n\nDocument Text:\n${rawText}` });
      } else {
        return res.status(400).json({ error: 'No document data provided' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              category: { type: Type.STRING },
              material: { type: Type.STRING },
              specifications: { type: Type.STRING },
              applications: { type: Type.STRING },
              additionalInfo: { type: Type.STRING },
            },
            required: ['productName', 'category', 'material', 'specifications', 'applications'],
          },
        },
      });

      const extracted = JSON.parse(response.text || '{}');
      return res.json(extracted);
    } catch (err: any) {
      console.error('PDF Extraction Error:', err);
      return res.status(500).json({ error: 'Failed to extract data from document', details: err?.message });
    }
  });

async function startServer() {
  const PORT = 3000;

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ProductIQ Server listening on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

