import { getSession } from 'next-auth/react';
import docusign from 'docusign-esign';
import { prisma } from '../../db.ts';

const CLIENT_ID = process.env.DOCUSIGN_INTEGRATION_KEY;
const CLIENT_SECRET = process.env.DOCUSIGN_SECRET_KEY;

const generateSafe = async (req, res) => {
  const { code } = req.query;

  const api = new docusign.ApiClient();
  api.setOAuthBasePath('account-d.docusign.com');
  const token = await api.generateAccessToken(CLIENT_ID, CLIENT_SECRET, code);
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ error: 'Unauthenticated' });
  }

  const expiryDateTime = new Date(Date.now() + (1000 * token.expiresIn));
  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      docusignAccessToken: token.accessToken,
      docusignAccessTokenExpires: expiryDateTime,
    },
  });

  return res.redirect(302, '/form');
};

export default generateSafe;
