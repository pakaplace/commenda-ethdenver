import { Prisma, PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react"
import docusign from 'docusign-esign';
import fs from 'fs';
import { env } from 'process';
import { notValidDateWarning } from 'stream-chat-react';

// TODO: Get these from request. 

const RECIPIENT = {
  name: 'Rohan Ramchand',
  email: 'rohan@ramchand.me',
};

const SENDER  = {
  name: 'Yaacov Tarko',
  email: 'yaacov@commenda.io',
};

const DOCUSIGN_ACCOUNT_ID = '3d434dd3-1d94-4fac-b62d-56b83a9281e5';
const DOCUSIGN_USER_ID = '41688e67-c3e3-4923-b8d1-65d91f299f00';
const DOCUSIGN_BASE_URL = 'https://demo.docusign.net';

const DOCUSIGN_INTEGRATION_KEY = '4723f1f4-ec4b-43ba-b83f-9cb0c3d8298e';

const TEMPLATE_ID = '222ce673-455a-4c83-8509-5f242ab0f6c0';

const sendForm = async (req, res) => {
  // this should be a post
  const session = await getSession({ req });
  if (!session) {
      console.log("Unauthenticated:")
      return res.status(403).json({ error: "Unauthenticated" });
  }
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        docusignAccessToken: true,
        docusignAccessTokenExpires: true,
      }
  });
  const envelope = new docusign.EnvelopeDefinition();
  envelope.templateId = TEMPLATE_ID;

  // TODO: Fill in template with form contents:
  const signer = docusign.TemplateRole.constructFromObject({
    ...RECIPIENT,
    roleName: 'signer',
  });

  envelope.templateRoles = [signer];
  envelope.status = 'sent';

  const api = new docusign.ApiClient();
  api.setBasePath(`${DOCUSIGN_BASE_URL}/restapi`);
  api.addDefaultHeader('Authorization', `Bearer ${user.docusignAccessToken}`);

  const envelopesApi = new docusign.EnvelopesApi(api);
  const results = await envelopesApi.createEnvelope(
    DOCUSIGN_ACCOUNT_ID, {envelopeDefinition: envelope});
  console.log(results);

  return res.status(200).json({});


 

};

export default sendForm;