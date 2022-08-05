import { AiOutlineWarning } from "react-icons/ai";
import { styled } from "~/stitches.config";
import { Spacer } from "../Spacer";
import { Li, Ul } from "../Ul";

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
  padding: "$spacing$6 $spacing$4",
  borderRadius: "$borderRadius$regular",
  fontFamily: "$default",
  display: "flex",
  gap: "$spacing$3",

  "& svg": {
    fontSize: "$mars",
  },

  "& figcaption": {
    fontWeight: "$bold",
    lineHeight: "$text",
  },

  "@mobile": {
    flexDirection: "column",
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

        {warnings && list && warnings.length > 0 ? (
          <>
            <Spacer size={4} />
            <Ul>
              {warnings.map((warningKey) => (
                <Li key={`warning-${warningKey}`} id={`warning-${warningKey}`}>
                  {list[warningKey]}
                </Li>
              ))}
            </Ul>
          </>
        ) : null}
      </div>
    </WarningBoxWrapper>
  );
};
