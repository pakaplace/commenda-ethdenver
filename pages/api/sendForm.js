import { getSession } from 'next-auth/react';
import docusign from 'docusign-esign';
import { prisma } from '../../db.ts';

const REQ_BODY = {
  companyName: 'WA',
  companyAddress: '1701 E Company St.',
  stateOfIncorporation: 'Delaware',
  incorporationDate: '2022-03-03',
  investorName: 'InvestorName',
  investorTitle: 'investorTitle',
  investorEmail: 'yaacov@commenda.io',
  investorAddress: '1 Investor Rd.',
  companyRepresentativeName: 'Company Rep Name',
  companyRepresentativeTitle: 'CEO',
  companyRepresentativeEmail: 'yaacov@commenda.io',
  purchaseDate: '2022-03-07',
  purchaseAmount: '12456',
  valuationCap: '123',
};

// TODO: Use env variables.
const DOCUSIGN_ACCOUNT_ID = '3d434dd3-1d94-4fac-b62d-56b83a9281e5';
const DOCUSIGN_USER_ID = '41688e67-c3e3-4923-b8d1-65d91f299f00';
const DOCUSIGN_BASE_URL = 'https://demo.docusign.net';

const DOCUSIGN_INTEGRATION_KEY = '4723f1f4-ec4b-43ba-b83f-9cb0c3d8298e';

const TEMPLATE_ID = '222ce673-455a-4c83-8509-5f242ab0f6c0';

const sendForm = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  req.body = REQ_BODY;

  const session = await getSession({ req });
  if (!session) {
    console.log('Unauthenticated:');
    return res.status(403).json({ error: 'Unauthenticated' });
  }

  console.log(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      docusignAccessToken: true,
      docusignAccessTokenExpires: true,
    },
  });
  const envelope = new docusign.EnvelopeDefinition();
  envelope.templateId = TEMPLATE_ID;

  // TODO: Fill in template with form contents:
  const CompanyRepresentative = docusign.TemplateRole.constructFromObject({
    roleName: 'Company Representative',
    company: req.body.companyName,
    stateOfIncorporation: req.body.stateOfIncorporation,
    name: req.body.companyRepresentativeName,
    email: req.body.companyRepresentativeEmail,
    title: req.body.companyRepresentativeTitle,
    purchaseDate: req.body.purchaseDate,
    purchaseAmount: req.body.purchaseAmount,
    valuationCap: req.body.valuationCap,
    companyAddress: req.body.companyAddress,
  });

  const InvestorRepresentative = docusign.TemplateRole.constructFromObject({
    roleName: 'Investor Representative',
    name: req.body.investorName,
    title: req.body.investorTitle,
    email: req.body.investorEmail,
    address: req.body.investorAddress,
  });

  envelope.templateRoles = [InvestorRepresentative, CompanyRepresentative];
  envelope.status = 'sent';

  const api = new docusign.ApiClient();
  api.setBasePath(`${DOCUSIGN_BASE_URL}/restapi`);
  api.addDefaultHeader('Authorization', `Bearer ${user.docusignAccessToken}`);

  try {
    const envelopesApi = new docusign.EnvelopesApi(api);
    const results = await envelopesApi.createEnvelope(DOCUSIGN_ACCOUNT_ID, { envelopeDefinition: envelope });
    console.log(results);
  } catch (error) {
    console.log(`error${error}`);
    return error;
  }

  // Preview: (doesn't work:  A value was not found for parameter 'returnUrl')
  // envelopesApi.createEnvelopeRecipientPreview(DOCUSIGN_ACCOUNT_ID, results.envelopeId, (error, data, response) => {
  //   console.log(error);
  //   console.log(data);
  //   console.log(response);
  // })

  return res.status(200).json({});
};

export default sendForm;
