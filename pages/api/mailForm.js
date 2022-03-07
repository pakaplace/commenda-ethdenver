export default async (req, res) => {
  console.log(req.body);

  try {
    const API_KEY = process.env.DOCUSIGN_API_ACCOUNT_ID;
    const response = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        body: JSON.stringify({ email }),
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    const responseJson = await response.json();

    if (response.status >= 400) {
      return res.status(400).json({
        error: await responseJson[0],
      });
    }

    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
