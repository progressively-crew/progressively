/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes, useState } from "react";
import { Button, Flex, HStack, Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Typography } from "./Typography";

const RawSwitch = styled.div`
  transition: all 0.3s;
  position: relative;

  &:before {
    transition: all 0.3s;
    position: absolute;
    width: ${({ theme }: any) => theme.sizes[6]};
    height: ${({ theme }: any) => theme.sizes[6]};
    border-radius: 50%;
    content: "";
    background: ${({ theme }: any) => theme.colors.white};
    transform: translateX(
      ${(props) => (props["data-is-checked"] ? "0%" : "-100%")}
    );
  }
`;

export interface SwitchProps extends HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  type: "button" | "submit";
  optimistic?: boolean;
}

export const Switch = ({ checked, optimistic, ...props }: SwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  return (
    <Button
      role="switch"
      aria-label="Feature flag activation"
      aria-checked={checked}
      variant="outline"
      borderRadius={32}
      onClick={() => setInternalChecked((s) => !s)}
      h={[16, 12]}
      {...props}
    >
      <HStack>
        <Typography as="span">Off</Typography>
        <RawSwitch aria-hidden data-is-checked={internalChecked}>
          {optimistic && (
            <Flex
              height={6}
              width={6}
              alignItems="center"
              justifyContent={"center"}
              aria-hidden
              position="absolute"
              right={checked ? 0 : undefined}
              left={checked ? undefined : 0}
            >
              <Spinner size="xs" />
            </Flex>
          )}
        </RawSwitch>
        <Typography as="span">On</Typography>
      </HStack>
    </Button>
  );
};
