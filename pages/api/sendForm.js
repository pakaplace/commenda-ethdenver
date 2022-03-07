import { getSession } from 'next-auth/react';
import docusign from 'docusign-esign';
import { prisma } from '../../db.ts';
import fs from 'fs';
import { promisify } from 'util';

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

const SCOPES = ['signature', 'impersonation'];
const JWT_LIFETIME = 10 * 60;  // 10 minutes

const promptConsent = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    scope: SCOPES.join('+'),
    client_id: process.env.DOCUSIGN_INTEGRATION_KEY,
    redirect_uri: "https://developers.docusign.com/platform/auth/consent",
  });
  console.log(`Redirect URL: https://${process.env.DOCUSIGN_OAUTH_BASE_URL}/oauth/auth?${params}`);
  return true;
};

const authenticate = async () => {
  const api = new docusign.ApiClient();
  api.setOAuthBasePath(process.env.DOCUSIGN_OAUTH_BASE_URL);

  const rsaKey = fs.readFileSync(process.env.DOCUSIGN_RSA_KEY_LOCATION);
  const { body: { access_token: accessToken } } = await api.requestJWTUserToken(
    process.env.DOCUSIGN_INTEGRATION_KEY,
    process.env.DOCUSIGN_USER_ID,
    SCOPES,
    rsaKey,
    JWT_LIFETIME,
  );

  const { accounts } = await api.getUserInfo(accessToken);
  const userInfo = accounts.find(acc => acc.isDefault === 'true');
  return {
    accessToken,
    apiAccountId: userInfo.accountId,
    basePath: `${userInfo.baseUri}/restapi`,
  };
};

const sendForm = async (req, res) => {
  // if (req.method !== 'POST') {
  //   return res.status(405).send({ message: 'Only POST requests allowed' });
  // }

  const {data: session} = getSession();
  if (!session) {
    return res.status(403);
  }

  req.body = REQ_BODY;

  let token;
  try {
    token = await authenticate();
  } catch (e) {
    if (e.response?.body?.error === 'consent_required' && promptConsent()) {
      await promisify(setTimeout)(10 * 1000);
      token = await authenticate();
    } else {
      console.log(`Error: ${e}`);
      return res.status(500);
    }
  }

  const envelope = new docusign.EnvelopeDefinition();
  envelope.templateId = process.env.DOCUSIGN_TEMPLATE_ID;

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
  api.setBasePath(token.basePath);
  api.addDefaultHeader('Authorization', `Bearer ${token.accessToken}`);

  const envelopesApi = new docusign.EnvelopesApi(api);
  try {
    const results = await envelopesApi.createEnvelope(token.apiAccountId, { envelopeDefinition: envelope });
    console.log(results);
  } catch (e) {
    console.log(e);
    return res.status(400);
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
