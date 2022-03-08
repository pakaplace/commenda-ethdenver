import { NextApiRequest, NextApiResponse } from "next";
import { Session } from 'next-iron-session';
import loadStytch from "../../lib/loadStytch"
import withSession from '../../lib/with-session'

type NextIronRequest = NextApiRequest & { session: Session };

type Data = {
  msg: string,
};


async function handler (req: NextIronRequest, res: NextApiResponse<Data>) {
  console.log(req);
  if (req.method === 'GET') {
    const client = loadStytch();
    const { token } = req.query;
    try {
      const resp = await client.magicLinks.authenticate(token as string, {session_duration_minutes: 24 * 60});
      // Set session
      req.session.destroy();
      req.session.set('user', {
        user_id: resp.user_id,
      });
      // Save additional user data here
      await req.session.save();
      console.log("Redirecting to home!");
      return res.redirect(302, "/");
    } catch (error) {
      const errorString = JSON.stringify(error);
      console.log(error);
      return res.status(400).json({ msg: errorString });
    }
  } else {
    // Handle any other HTTP method
    return res.status(400).json({ msg: "We only take GET requests here." });
  }
}

export default withSession(handler);