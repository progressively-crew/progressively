import { Link } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { MdClose, MdErrorOutline } from "react-icons/md";
import { HStack } from "../HStack";

import { Li, Ul } from "../Ul";

export interface ErrorBoxProps {
  list: {
    [key: string]: string;
  };
}

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
    <div className="error-box p-4 bg-red-100 text-red-700 rounded border-l-8 border-l-red-600 flex flex-row justify-between">
      <figure ref={boxRef} tabIndex={-1}>
        <div>
          <HStack spacing={2}>
            <MdErrorOutline aria-hidden />
            <figcaption>
              <strong>{label}</strong>
            </figcaption>
          </HStack>

          <Ul>
            {errors.map((errorKey) => (
              <Li key={`error-${errorKey}`} id={`error-${errorKey}`}>
                {list[errorKey]}
              </Li>
            ))}
          </Ul>
        </div>
      </figure>

      <Link to={location.pathname} className="text-xl">
        <MdClose aria-label="Close the banner" />
      </Link>
    </div>
  );
};
