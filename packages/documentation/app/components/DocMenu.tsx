import {
  AiOutlineAppstore,
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaToggleOff } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { MdAppRegistration, MdBubbleChart } from "react-icons/md";
import { Nav, NavItem } from "~/components/Nav";
import { Spacer } from "./Spacer";

export const DocMenu = () => {
  return (
    <Nav label={`Flag related`}>
      <li role="separator">
        <p className="uppercase text-black text-sm font-bold">
          Rollout details
        </p>
        <Spacer size={1} />
      </li>

      <NavItem to={`/dashboard/projects/`} icon={<FaToggleOff />}>
        Overview
      </NavItem>

      <NavItem to={`/dashboard/projects/`} icon={<MdAppRegistration />}>
        Strategies
      </NavItem>

      <NavItem to={`/dashboard/projects/`} icon={<AiOutlineAppstore />}>
        Variants
      </NavItem>

      <NavItem to={`/dashboard/projects/`} icon={<AiOutlineClockCircle />}>
        Scheduling
      </NavItem>

      <li role="separator">
        <Spacer size={4} />
        <p className="uppercase text-black text-sm font-bold">Measuring</p>
        <Spacer size={1} />
      </li>

      <NavItem to={`/dashboard/projects/`} icon={<AiOutlineBarChart />}>
        Insights
      </NavItem>

      <NavItem to={`/dashboard/projects/`} icon={<MdBubbleChart />}>
        Metrics
      </NavItem>

      <li role="separator">
        <Spacer size={4} />
        <p className="uppercase text-black text-sm font-bold">Other</p>
        <Spacer size={1} />
      </li>

      <NavItem to={`/dashboard/projects/`} icon={<TbSend />}>
        Webhooks
      </NavItem>

      <NavItem to={`/dashboard/projects/`} icon={<AiOutlineSetting />}>
        Settings
      </NavItem>
    </Nav>
  );
};
