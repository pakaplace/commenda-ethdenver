const RedirectToDocusign = () => {
  const searchParams = new URLSearchParams({
    response_type: 'code',
    scope: 'signature',
    client_id: '4723f1f4-ec4b-43ba-b83f-9cb0c3d8298e',
    state: 'foobar',
    redirect_uri: 'http://localhost:3000/auth/docusign/callback',
  });
  window.location.href = `https://account-d.docusign.com/oauth/auth?${searchParams}`;
  return null;
};

export default RedirectToDocusign;
