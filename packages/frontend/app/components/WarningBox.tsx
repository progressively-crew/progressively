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
  padding: "$spacing$8",
  borderRadius: "$borderRadius$regular",
  fontFamily: "$default",
  display: "flex",
  gap: "$spacing$3",

  "& svg": {
    fontSize: "$h3",
  },

  "& figcaption": {
    marginBottom: "$spacing$4",
    fontWeight: "$bold",
    lineHeight: "$content",
  },
});

export const WarningBox = ({ list, title }: WarningBoxProps) => {
  const warnings = list ? Object.keys(list) : undefined;

  return (
    <WarningBoxWrapper tabIndex={-1}>
      <AiOutlineWarning aria-hidden />

      <div>
        <figcaption>
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
      </div>
    </WarningBoxWrapper>
  );
};
