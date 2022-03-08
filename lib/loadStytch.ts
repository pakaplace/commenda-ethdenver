import * as stytch from 'stytch';

let client: stytch.Client;
const loadStytch = () => {
  if (!client) {
    client = new stytch.Client({
      project_id: process.env.STYTCH_PROJECT_ID,
      secret: process.env.STYTCH_SECRET,
      // use stytch.envs.live if you want to hit the live api
      env: stytch.envs.test,
    });
  }

  return client;
};

export default loadStytch;