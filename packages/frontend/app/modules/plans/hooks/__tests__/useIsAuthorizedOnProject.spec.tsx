import { renderHook } from "@testing-library/react-hooks";
import { useIsAuthorizedOnProject } from "../useIsAuthorizedOnProject";
import { IsSaasProvider } from "../../../saas/contexts/IsSaasProvider";
import { BillingInfo } from "../../types";
import { BillingProvider } from "../../context/BillingProvider";
import { ProjectsProvider } from "~/modules/projects/contexts/ProjectsProvider";
import { Project } from "~/modules/projects/types";

interface WrapperProps {
  children: React.ReactNode;
}

describe("useIsAuthorizedOnProject", () => {
  describe("Self hosted", () => {
    it("returns true when the project is open source", () => {
      const wrapper = ({ children }: WrapperProps) => (
        <IsSaasProvider isSaas={false}>{children}</IsSaasProvider>
      );

      const { result } = renderHook(() => useIsAuthorizedOnProject(), {
        wrapper,
      });

      expect(result.current).equal(true);
    });
  });

  describe("SaaS", () => {
    let billingInfo: BillingInfo;
    let projects: Array<Project>;

    const getWrapper =
      () =>
      // eslint-disable-next-line react/display-name
      ({ children }: WrapperProps) =>
        (
          <ProjectsProvider projects={projects}>
            <BillingProvider billingInfo={billingInfo}>
              <IsSaasProvider isSaas={true}>{children}</IsSaasProvider>
            </BillingProvider>
          </ProjectsProvider>
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

      projects = [];
    });

    it("returns true when the project is SaaS and there is an active plan and no projects", () => {
      // No project, and has 1 slot available
      projects = [];
      billingInfo!.activePlan!.projectCount = 1;

      const wrapper = getWrapper();

      const { result } = renderHook(() => useIsAuthorizedOnProject(), {
        wrapper,
      });

      expect(result.current).equal(true);
    });

    it("returns false when the project is SaaS and there is an active plan and 1 project", () => {
      // 1 project, and has 1 slot available
      projects = [
        {
          name: "Project",
          createdAt: "",
          uuid: "1",
          environments: [],
        },
      ];
      billingInfo!.activePlan!.projectCount = 1;

      const wrapper = getWrapper();
      const { result } = renderHook(() => useIsAuthorizedOnProject(), {
        wrapper,
      });

      expect(result.current).equal(false);
    });

    describe("trial", () => {
      it("returns true when the project is SaaS, remaining days of the trial is 4 there is no project yet", () => {
        // No project, and has 1 slot available
        projects = [];
        billingInfo!.activePlan = undefined;
        billingInfo.remainingTrialingDays = 4;

        const wrapper = getWrapper();

        const { result } = renderHook(() => useIsAuthorizedOnProject(), {
          wrapper,
        });

        expect(result.current).equal(true);
      });

      it("returns false when the project is SaaS, remaining days of the trial is 4 but there is already a project", () => {
        // No project, and has 1 slot available
        projects = [
          {
            name: "Project",
            createdAt: "",
            uuid: "1",
            environments: [],
          },
        ];
        billingInfo!.activePlan = undefined;
        billingInfo.remainingTrialingDays = 4;

        const wrapper = getWrapper();

        const { result } = renderHook(() => useIsAuthorizedOnProject(), {
          wrapper,
        });

        expect(result.current).equal(false);
      });
    });
  });
});
