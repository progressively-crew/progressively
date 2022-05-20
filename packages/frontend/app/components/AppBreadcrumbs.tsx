import { Link } from "./Link";

export interface Crumb {
  link: string;
  label: string;
  forceNotCurrent?: boolean;
}

export type Crumbs = Array<Crumb>;

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastItemIndex = crumbs.length - 1;

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ul>
          {crumbs.map((crumb, index) => (
            <li key={crumb.link}>
              <Link
                aria-current={
                  crumb.forceNotCurrent
                    ? undefined
                    : index === lastItemIndex
                    ? "page"
                    : undefined
                }
                to={crumb.link}
              >
                {crumb.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
