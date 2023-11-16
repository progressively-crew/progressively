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

      return tokens?.accessToken?.accessToken;
    } catch {
      throw new Error("Authentication failed.");
    }
  };

  const logout = async () => {
    const token = await getIdToken();

    if (token) {
      const idToken = token.idToken;
      authClient.tokenManager.clear();

      return (
        issuer +
        "/v1/logout?client_id=" +
        clientId +
        "&id_token_hint=" +
        idToken +
        "&post_logout_redirect_uri=" +
        window.location.origin
      );
    }

    return window.location.origin;
  };

  return {
    openLoginPage,
    getIdToken,
    getAccessToken,
    getUser,
    setTokensFromUrl,
    logout,
  };
};

export function logout() {}
