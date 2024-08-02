const authConfig = {
    authority: 'https://bloodx-f0vwkp.zitadel.cloud', 
    client_id: '275447824106205189@bloodx',
    redirect_uri: 'http://192.168.20.18:3001/callback',
    response_type: 'code',
    scope: 'openid profile email',
    post_logout_redirect_uri: 'http://192.168.20.18:3001/',
    userinfo_endpoint: 'https://bloodx-f0vwkp.zitadel.cloud/oidc/v1/userinfo', 
    response_mode: 'query',
    code_challenge_method: 'S256',
  };

 export default authConfig;
