import {
  AiOutlineAppstore,
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaToggleOff } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { MdAppRegistration, MdBubbleChart } from "react-icons/md";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

export const DocMenu = () => {
  return (
    <HorizontalNav label={`Flag related`}>
      <li role="separator">
        <p className="uppercase text-black text-sm font-bold">
          Rollout details
        </p>
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
        <p className="uppercase text-black text-sm font-bold">Measuring</p>
      </li>

      <NavItem to={`/dashboard/projects/`} icon={<AiOutlineBarChart />}>
        Insights
      </NavItem>

      <NavItem to={`/dashboard/projects/`} icon={<MdBubbleChart />}>
        Metrics
      </NavItem>

      <li role="separator">
        <p className="uppercase text-black text-sm font-bold">Other</p>
      </li>

      <NavItem to={`/dashboard/projects/`} icon={<TbSend />}>
        Webhooks
      </NavItem>

      <NavItem to={`/dashboard/projects/`} icon={<AiOutlineSetting />}>
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
