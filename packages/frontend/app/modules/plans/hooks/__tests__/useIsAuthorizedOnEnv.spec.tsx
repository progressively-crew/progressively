import { renderHook } from "@testing-library/react-hooks";
import { useIsAuthorizedOnEnv } from "../useIsAuthorizedOnEnv";
import { IsSaasProvider } from "../../../saas/contexts/IsSaasProvider";
import { BillingInfo } from "../../types";
import { BillingProvider } from "../../context/BillingProvider";
import { Project, UserRoles } from "~/modules/projects/types";
import { ProjectProvider } from "~/modules/projects/contexts/ProjectProvider";

interface WrapperProps {
  children: React.ReactNode;
}

describe("useIsAuthorizedOnEnv", () => {
  describe("Self hosted", () => {
    it("returns true when it s self hosted", () => {
      const wrapper = ({ children }: WrapperProps) => (
        <IsSaasProvider isSaas={false}>{children}</IsSaasProvider>
      );

      const { result } = renderHook(() => useIsAuthorizedOnEnv(), {
        wrapper,
      });

      expect(result.current).equal(true);
    });
  });

  describe("SaaS", () => {
    let billingInfo: BillingInfo;
    let project: Project;

    const getWrapper =
      (userRole: UserRoles) =>
      // eslint-disable-next-line react/display-name
      ({ children }: WrapperProps) =>
        (
          <ProjectProvider project={project} userRole={userRole}>
            <BillingProvider billingInfo={billingInfo}>
              <IsSaasProvider isSaas={true}>{children}</IsSaasProvider>
            </BillingProvider>
          </ProjectProvider>
        );

    beforeEach(() => {
      billingInfo = {
        plans: [],
        activePlan: {
          createdAt: "",
          projectCount: 1,
          environmentCount: 1,
          evaluationCount: 1,
          uuid: "1",
        },
        remainingTrialingDays: 0,
      };

      project = {
        name: "Project",
        createdAt: "",
        uuid: "1",
        environments: [],
      };
    });

    it("returns false when the user is not an administrator even if billing is valid", () => {
      billingInfo!.activePlan!.environmentCount = 1;

      const wrapper = getWrapper(UserRoles.User);
      const { result } = renderHook(() => useIsAuthorizedOnEnv(), {
        wrapper,
      });

      expect(result.current).equal(false);
    });

    it("returns true when SaaS and there is an active plan with 1 env and project has no env", () => {
      // Valid plan , 1 env and project with no env yet
      billingInfo!.activePlan!.environmentCount = 1;
      project.environments = [];

      const wrapper = getWrapper(UserRoles.Admin);
      const { result } = renderHook(() => useIsAuthorizedOnEnv(), {
        wrapper,
      });

      expect(result.current).equal(true);
    });
  });
});
