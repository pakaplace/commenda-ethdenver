/* eslint-disable react/jsx-filename-extension */
import { CallbackOptions, StyleConfig } from '@stytch/stytch-js';
import { SDKProductTypes, Stytch } from '@stytch/stytch-react';
import React from 'react';


const callbacks: CallbackOptions = {
  onEvent: (data) => {
    // TODO: check whether the user exists in your DB
    if (data.eventData.type === 'USER_EVENT_TYPE') {
      console.log({
        userId: data.eventData.userId,
        email: data.eventData.email,
      });
    }
  },
  onSuccess: (data) => console.log(data),
  onError: (data) => console.log(data),
};

const REDIRECT_URL_BASE="http://localhost:3000";

const magicLinksView = {
  products: [SDKProductTypes.emailMagicLinks],
  emailMagicLinksOptions: {
    loginRedirectURL: `${REDIRECT_URL_BASE  }/api/authenticate_magic_link`,
    loginExpirationMinutes: 30,
    signupRedirectURL: `${REDIRECT_URL_BASE  }/api/authenticate_magic_link`,
    signupExpirationMinutes: 30,
    createUserAsPending: false,
  },
};

const sdkStyle: StyleConfig = {
  fontFamily: '"Helvetica New", Helvetica, sans-serif',
  primaryColor: '#19303d',
  primaryTextColor: '#090909',
  width: '321px',
  hideHeaderText: true,
};

function LoginWithMagicLinks() {
 return <>
      <h2> Sign up or log in</h2>
      <p> Enter your email address to receive an Email Magic Link for authentication.</p>
      <Stytch
        publicToken= {process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN}
        loginOrSignupView={magicLinksView}
        style={sdkStyle}
        callbacks={callbacks}
      />
    </>
}

export default LoginWithMagicLinks;