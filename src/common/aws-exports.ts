export const AMPLIFY_CONFIG = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID,
  },
};

export const AUTH_CONFIG = (language) => ({
  oauth: {
    domain: process.env.NEXT_PUBLIC_AWS_COGNITO_DOMAIN,
    redirectSignIn: `${process.env.NEXT_PUBLIC_AWS_COGNITO_REDIRECT_SIGN_IN}${
      language === "ar" ? "/ar" : ""
    }`,
    redirectSignOut: `${process.env.NEXT_PUBLIC_AWS_COGNITO_REDIRECT_SIGN_OUT}${
      language === "ar" ? "/ar" : ""
    }`,
    responseType: "code",
  },
});
