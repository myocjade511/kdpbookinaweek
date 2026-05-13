// Serverless function to handle form submissions
// Deployed as an API route on Vercel

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Log the submission (Vercel logs)
    console.log('📝 NEW LEAD:', JSON.stringify({
      name: data.fullName,
      email: data.email,
      package: data.package,
      topic: data.bookTopic?.substring(0, 50),
      goal: data.bookGoal,
      urgency: data.urgency,
      source: data.source,
      timestamp: new Date().toISOString()
    }));

    // Send email notification if SMTP is configured
    if (process.env.SMTP_HOST && process.env.NOTIFICATION_EMAIL) {
      // Email notification setup placeholder
      // In production: add nodemailer or SendGrid here
    }

    // Store in Vercel KV if available
    if (process.env.KV_REST_API_URL) {
      // Store lead data
      // await kv.lpush('leads', JSON.stringify(data));
    }

    return res.status(200).json({
      success: true,
      message: 'Application received. We will contact you within 24 hours.',
      redirectTo: '/thank-you'
    });
  } catch (error) {
    console.error('❌ Form submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
