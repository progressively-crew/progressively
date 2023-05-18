import {
  Html,
  Head,
  Preview,
  Body,
  Tailwind,
  Container,
  Section,
  Heading,
} from "@react-email/components";
import React from "react";
import { Logo } from "../components/Logo";

export interface LayoutProps {
  previewTitle: string;
  title: string;
  children: React.ReactNode;
}

export const Layout = ({ previewTitle, title, children }: LayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewTitle}</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-200 rounded-lg my-[40px] mx-auto p-[20px] w-[464px]">
            <Section className="mt-[32px] flex justify-center items-center">
              <Logo
                className="my-0 mx-auto"
                title="Progressively"
                width="40"
                height="40"
              />
            </Section>

            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {title}
            </Heading>

            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
