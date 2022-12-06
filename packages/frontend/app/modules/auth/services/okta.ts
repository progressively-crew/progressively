import { OktaAuth, OktaAuthOptions, TokenParams } from "@okta/okta-auth-js";
import { OktaConfig } from "../types";

export const OktaserviceClientSide = ({
  issuer,
  clientId,
  isOktaActivated,
}: OktaConfig) => {
  if (!isOktaActivated) return;

  const config: OktaAuthOptions = {
    issuer,
    clientId,
    redirectUri: "/oauth2/callback",
    responseType: "code",
  };

  const authClient: OktaAuth = new OktaAuth(config);

  const openLoginPage = async () => {
    const tokenParams: TokenParams = { scopes: ["openid", "profile", "email"] };

    authClient.token.getWithRedirect(tokenParams);
  };

  const getIdToken = () => authClient.tokenManager.get("id_token");

  const getAccessToken = () => authClient.tokenManager.get("access_token");

  const getUser = () => authClient.getUser();

  const setTokensFromUrl = async () => {
    try {
      const { tokens } = await authClient.token.parseFromUrl();

      if (tokens.idToken) {
        authClient.tokenManager.add("id_token", tokens.idToken);
      }

      if (tokens.accessToken) {
        authClient.tokenManager.add("access_token", tokens.accessToken);
      }
    } catch {
      throw new Error("Authentication failed.");
    }
  };

  return {
    openLoginPage,
    getIdToken,
    getAccessToken,
    getUser,
    setTokensFromUrl,
  };
};

// export function logout() {
//   getIdToken().then(function (token) {
//     if (token) {
//       var idToken = token.idToken;
//       oktaAuth.tokenManager.clear();
//       window.location.href =
//         ISSUER +
//         "/v1/logout?client_id=" +
//         CLIENT_ID +
//         "&id_token_hint=" +
//         idToken +
//         "&post_logout_redirect_uri=" +
//         window.location.origin;
//     } else {
//       router.push("/");
//     }
//   });
// }
