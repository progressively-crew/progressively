import { HTMLAttributes } from "react";

export const Ul = (props: HTMLAttributes<HTMLUListElement>) => (
  <ul {...props} />
);

export const Li = (props: HTMLAttributes<HTMLLIElement>) => <li {...props} />;
