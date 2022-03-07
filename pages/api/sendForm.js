import { fetch } from 'fetch';
import * as jose from 'jose';


const RECIPIENT = {
  name: 'Rohan Ramchand',
  email: 'rohan@ramchand.me',
};

const SENDER  = {
  name: 'Yaacov Tarko',
  email: 'yaacov@commenda.io',
};

const DOCUSIGN_ACCOUNT_ID = '3d434dd3-1d94-4fac-b62d-56b83a9281e5';
const DOCUSIGN_BASE_URL = 'https://demo.docusign.net';

const TEMPLATE_ID = '';


const authenticate = () => {
  const authentication_uri = 'https://account-d.docusign.com/oauth/auth';

};
