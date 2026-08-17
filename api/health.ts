export default function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  const hasApiKey = !!apiKey && apiKey !== 'MY_GEMINI_API_KEY';
  res.status(200).json({
    status: 'ok',
    hasApiKey,
  });
}
