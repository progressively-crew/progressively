import { styled } from "~/stitches.config";

export interface BrowserProps {
  children: React.ReactNode;
}

const BrowserWrapper = styled("div", {
  width: "150px",
  borderRadius: "$borderRadius$regular",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  background: "$apollo",
});

const ActionBar = styled("div", {
  padding: "$spacing$4",
  background: "$nemesis",
});

const BrowserContent = styled("div", {
  color: "$hades",
  fontFamily: "$default",
});

const ActionDots = styled("div", {
  display: "flex",
  gap: "$spacing$2",
  "& span:first-of-type": {
    display: "inline-block",
    borderRadius: "50%",
    height: "12px",
    width: "12px",
    background: "#ED594A",
  },
  "& span:nth-child(2)": {
    display: "inline-block",
    borderRadius: "50%",
    height: "12px",
    width: "12px",
    background: "#FDD800",
  },
  "& span:last-of-type": {
    display: "inline-block",
    borderRadius: "50%",
    height: "12px",
    width: "12px",
    background: "#5AC05A",
  },
});

export const Browser = ({ children }: BrowserProps) => {
  return (
    <BrowserWrapper>
      <ActionBar>
        <ActionDots aria-hidden>
          <span />
          <span />
          <span />
        </ActionDots>
      </ActionBar>
      <BrowserContent>{children}</BrowserContent>
    </BrowserWrapper>
  );
};
