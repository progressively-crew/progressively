import { useEffect, useRef } from "react";
import { MdErrorOutline } from "react-icons/md";
import { styled } from "~/stitches.config";
import { Li, Ul } from "./Ul";

export interface ErrorBoxProps {
  list: {
    [key: string]: string;
  };
}

const ErrorBoxWrapper = styled("figure", {
  background: "$errorBg",
  color: "$errorFg",
  border: "4px solid $errorBorder",
  padding: "$spacing$6 $spacing$4",
  borderRadius: "$borderRadius$regular",
  fontFamily: "$default",

  display: "flex",
  gap: "$spacing$3",

  "& svg": {
    fontSize: "$h3",
  },

  "& figcaption": {
    fontWeight: "$bold",
    marginBottom: "$spacing$4",
    lineHeight: "$content",
  },
});

export const ErrorBox = ({ list }: ErrorBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const errors = Object.keys(list);

  useEffect(() => {
    boxRef?.current?.focus();
  }, []);

  const label =
    errors.length === 1
      ? `The following error has been found:`
      : `The following ${errors.length} errors have been found:`;

  return (
    <ErrorBoxWrapper ref={boxRef} tabIndex={-1} className="error-box">
      <MdErrorOutline aria-hidden />
      <div>
        <figcaption>
          <strong>{label}</strong>
        </figcaption>

        <Ul>
          {errors.map((errorKey) => (
            <Li key={`error-${errorKey}`} id={`error-${errorKey}`}>
              {list[errorKey]}
            </Li>
          ))}
        </Ul>
      </div>
    </ErrorBoxWrapper>
  );
};
