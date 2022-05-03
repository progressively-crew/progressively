import { extendTheme, theme } from "@chakra-ui/react";

const lightError = {
  50: "#fbeaeb",
  100: "#f3bfc2",
  200: "#ea9499",
  300: "#e26970",
  400: "#da3f48",
  500: "#c0252e",
  600: "#961d24",
  700: "#6b151a",
  800: "#400c0f",
  900: "#150405",
};

export const lightTheme = extendTheme({
  colors: {
    brand: theme.colors.facebook,
    success: theme.colors.green,
    error: lightError,
    warning: theme.colors.orange,
    text: theme.colors.gray,
  },
  semanticTokens: {
    colors: {
      background100: "gray.100",
      background200: "gray.200",
      background: "white",
      error: "red.500",
      textlight: {
        default: "gray.600",
      },
      header: {
        default: "gray.800",
      },
    },
  },
});
