import { useSession, getSession } from 'next-auth/react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';
import { Prisma, PrismaClient } from '@prisma/client';
import { access } from 'fs';
import docusign from 'docusign-esign';

const CLIENT_ID = process.env.DOCUSIGN_INTEGRATION_KEY;
const CLIENT_SECRET = process.env.DOCUSIGN_SECRET_KEY;

const generateSafe = async (req, res) => {
  const { code } = req.query;
  console.log(code);

  console.log(CLIENT_ID, CLIENT_SECRET);

  const api = new docusign.ApiClient();
  api.setOAuthBasePath('account-d.docusign.com');
  const token = await api.generateAccessToken(CLIENT_ID, CLIENT_SECRET, code);
  console.log(token);
  const session = await getSession({ req });
  if (!session) {
    console.log('Unauthenticated:');
    return res.status(403).json({ error: 'Unauthenticated' });
  }

  const prisma = new PrismaClient();
  const expiryDateTime = new Date(Date.now() + (1000 * token.expiresIn));
  console.log(`expires at${expiryDateTime}`);
  const updateUser = await prisma.user.update({
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
