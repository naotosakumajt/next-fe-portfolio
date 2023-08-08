import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const response = await fetch('https://hooks.slack.com/services/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', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: req.body.text,
      }),
    });

    if (response.ok) {
      return res.status(200).end();
    } else {
      return res.status(500).end();
    }
  } catch (error) {
    return res.status(500).end();
  }
}
