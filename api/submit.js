// Simple form handler — stores to Vercel deploy logs
// For production: connect to SendGrid, Resend, or a CRM API

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    console.log('=== NEW BOOK LEAD ===');
    console.log(JSON.stringify(data, null, 2));

    // For now, log it so you can see leads in Vercel logs
    // Production: integrate with SendGrid, Resend, or Zapier webhook

    return res.status(200).json({
      success: true,
      message: 'Application received. We will contact you within 24 hours.'
    });
  } catch (error) {
    console.error('Form error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
