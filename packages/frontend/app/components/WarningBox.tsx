import { AiOutlineWarning } from "react-icons/ai";
import { styled } from "~/stitches.config";
import { Li, Ul } from "./Ul";

export interface WarningBoxProps {
  title: React.ReactNode;
  list?: {
    [key: string]: string;
  };
}

const WarningBoxWrapper = styled("figure", {
  background: "$warningBg",
  color: "$warningFg",
  border: "1px solid $warningBorder",
  padding: "$spacing$3",
  borderRadius: "$borderRadius$regular",
  fontFamily: "$default",

  "& svg": {
    marginRight: "$spacing$1",
  },

  "& figcaption": {
    display: "flex",
    alignItems: "center",
    marginBottom: "$spacing$2",
    fontWeight: "$bold",
  },
});

export const WarningBox = ({ list, title }: WarningBoxProps) => {
  const warnings = list ? Object.keys(list) : undefined;

  return (
    <WarningBoxWrapper tabIndex={-1}>
      <figcaption>
        <AiOutlineWarning aria-hidden />
        <strong>{title}</strong>
      </figcaption>

      {list && warnings && (
        <Ul>
          {warnings.map((warningKey) => (
            <Li key={`warning-${warningKey}`} id={`warning-${warningKey}`}>
              {list[warningKey]}
            </Li>
          ))}
        </Ul>
      )}
    </WarningBoxWrapper>
  );
};
