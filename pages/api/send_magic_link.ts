import { NextApiRequest, NextApiResponse } from "next";
import { Session } from 'next-iron-session';
import loadStytch from "../../lib/loadStytch"
type NextIronRequest = NextApiRequest & { session: Session };




export default async (req: NextIronRequest, res: NextApiResponse<Data>) => {

  const path = "http://localhost:3000";
  const magicLinkUrl = `${path}/authenticate`;

  if (req.method === 'POST') {
    const client = loadStytch();
    const data = JSON.parse(req.body);

    const params = {
      email: data.email,
      login_magic_link_url: magicLinkUrl,
      signup_magic_link_url: magicLinkUrl,
  };

  const resp = await client.magicLinks.email.loginOrCreate(params);

  if (resp.status_code.toString() === '200') {
    // Set session
    req.session.destroy();
    // Save additional user data here
    req.session.set('user', {
      id: resp.user_id,
    });
    await req.session.save();
    res.status(200).send({ msg: `successfully authenticated ${resp.user_id}` });
  } else {
    throw Error('Error authenticating your code');
  }

  res.status(200).json({ methodId: resp.email_id });
  } else {
    // Handle any other HTTP method
  }
}
  