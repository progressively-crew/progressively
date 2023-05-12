import { renderHook } from "@testing-library/react-hooks";
import { useIsAuthorized } from "../useIsAuthorized";
import { IsSaasProvider } from "../../../saas/contexts/IsSaasProvider";

interface WrapperProps {
  children: React.ReactNode;
}

describe("hello", () => {
  describe("Self hosted", () => {
    it("returns true when the project is open source", () => {
      const wrapper = ({ children }: WrapperProps) => (
        <IsSaasProvider isSaas={false}>{children}</IsSaasProvider>
      );

      const { result } = renderHook(() => useIsAuthorized(), { wrapper });

      expect(result.current).equal(true);
    });
  });
});
