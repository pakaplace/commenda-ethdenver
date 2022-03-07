import docusign from 'docusign-esign';
import fs from 'fs';

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

const TEMPLATE_ID = '';


const authenticate = async () => {
  const jwtLifetime = 10 * 60; // request 10 minutes
  const api = new docusign.ApiClient();
  api.setOAuthBasePath('account-d.docusign.com');

  const rsaKey = fs.readFileSync('/Users/rohanramchand/tmp/commenda/jwtRS256.key');

  const { body: { access_token: accessToken } } = await api.requestJWTUserToken(
    DOCUSIGN_INTEGRATION_KEY,
    DOCUSIGN_USER_ID,
    ['signature', 'impersonation'],
    rsaKey,
    jwtLifetime,
  );

  const { accounts } = await api.getUserInfo(accessToken);
  const { accountId, baseUri } = accounts.find(account => account.isDefault === 'true');

  return {
    accessToken,
    accountId,
    basePath: `${baseUri}/restapi`,
  };
};


authenticate().then(console.log);
