import nock from "nock";

export const startMockServer = () => {
  nock("https://api.progressively.app")
    .get(
      "/sdk/eyJjbGllbnRLZXkiOiIzN2MxNWNmOS0zNjI1LTQ1MTYtOTA4MC03NDkzMWVkNjM5ZDQifQ=="
    )
    .reply(200, { showDocumentationButton: false });
};
