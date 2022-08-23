import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { FiLayers } from "react-icons/fi";
import { MdOutlineGroupWork } from "react-icons/md";
import { Divider } from "~/components/Divider";
import { HStack } from "~/components/HStack";
import { DarkLogo } from "~/components/Logo/DarkLogo";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { getProjects } from "~/modules/projects/services/getProjects";
import { UserProject } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { styled } from "~/stitches.config";

const MenuWidth = "300px";

const MenuContainer = styled("nav", {
  width: MenuWidth,
  background: "$hades",
  height: "100%",
  position: "fixed",
  left: 0,
});

const MenuListWrapper = styled("div", { padding: "0 $spacing$4" });

const MenuList = styled("ul", {
  padding: "0 $spacing$4",
});

const SubMenuList = styled("ul", {
  position: "relative",
  padding: "0 $spacing$4",

  "&::before": {
    content: '""',
    position: "absolute",
    width: "1px",
    height: "100%",

    marginLeft: "2px",
    background: "rgba(255,255,255,0.5)",
  },

  "& li": {
    marginLeft: "$spacing$4",
  },
});

const MenuItem = styled("li", {
  "& a": {
    color: "$nemesisLight",
    boxSizing: "border-box",
    padding: "0 $spacing$3",
    width: "100%",
    cursor: "pointer",
    display: "flex",
    height: "$ctaSmall",
    alignItems: "center",
    textDecoration: "none",
    borderRadius: "$borderRadius$regular",
  },

  "& a svg": {
    color: "$apollo",
  },

  "& a span": {
    color: "currentColor",
  },

  "& a.active": {
    color: "$apollo",
    fontWeight: "$bold",
    background: "rgba(255,255,255,0.1)",
  },
});

const PageContainer = styled("div", {
  marginLeft: MenuWidth,
});

const LogoContainer = styled("div", {
  padding: "$spacing$4",
});

interface LoaderData {
  user: User;
  projects: Array<UserProject>;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | Response> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const projects = await getProjects(authCookie);

  if (projects.length === 0) {
    return redirect("/dashboard/onboarding");
  }

  return { projects, user };
};

export default function DashboardLayoutPage() {
  const { projects } = useLoaderData<LoaderData>();

  return (
    <div>
      <MenuContainer>
        <nav>
          <LogoContainer>
            <DarkLogo to={"/dashboard"} />
          </LogoContainer>

          <Divider background="nemesisLight" />

          <Spacer size={4} />

          <MenuListWrapper>
            <Typography color="apollo" fontWeight="bold" font="title">
              My projects
            </Typography>
          </MenuListWrapper>

          <Spacer size={1} />

          <MenuList>
            {projects.map((userProject) => (
              <MenuItem key={userProject.projectId}>
                <NavLink
                  to={`/dashboard/projects/${userProject.projectId}`}
                  end
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <Typography as="span" color="apollo" size="uranus">
                    <HStack as="span" spacing={2}>
                      <MdOutlineGroupWork aria-hidden />
                      <span>{userProject.project.name}</span>
                    </HStack>
                  </Typography>
                </NavLink>

                <SubMenuList>
                  {userProject.project.environments.map((env) => (
                    <MenuItem key={env.uuid}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active" : undefined
                        }
                        to={`/dashboard/projects/${userProject.projectId}/environments/${env.uuid}/flags`}
                      >
                        <Typography as="span" color="apollo" size="uranus">
                          <HStack as="span" spacing={2}>
                            <FiLayers aria-hidden />
                            <span> {env.name}</span>
                          </HStack>
                        </Typography>
                      </NavLink>
                    </MenuItem>
                  ))}
                </SubMenuList>
              </MenuItem>
            ))}
          </MenuList>
        </nav>
      </MenuContainer>

      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  );
}
