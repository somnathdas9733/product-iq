import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.status(400).json({
      error: 'GEMINI_API_KEY is missing or invalid. Please add GEMINI_API_KEY in Vercel Project Settings -> Environment Variables.',
    });
  }

  const { fileBase64, mimeType, rawText } = req.body || {};

  try {
    const ai = new GoogleGenAI({ apiKey });

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
    return res.status(200).json(extracted);
  } catch (err: any) {
    console.error('PDF Extraction Error:', err);
    return res.status(500).json({
      error: 'Failed to extract data from document',
      details: err?.message || String(err),
    });
  }
}
