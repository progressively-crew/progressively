import { useEffect } from "react";
import prismjs from "prismjs";
import themePath from "prismjs/themes/prism-tomorrow.css";
import { LinksFunction, Outlet } from "remix";
import { Logo } from "~/components/Logo";
import { Container, Flex } from "@chakra-ui/react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: themePath }];
};

export default function ReactLayout() {
  useEffect(() => {
    prismjs.highlightAll();
  }, []);

  return (
    <div>
      <Container maxW="3xl">
        <Flex
          p={3}
          as={"nav"}
          aria-label="General"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Logo />
        </Flex>
      </Container>
      <Container maxW="3xl">
        <main>
          <Outlet />
        </main>
      </Container>
    </div>
  );
}
