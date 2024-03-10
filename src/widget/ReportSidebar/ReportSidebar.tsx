import { ActionIcon, NavLink } from "@mantine/core";
import {
  IconChevronRight,
  IconRefresh,
} from "@tabler/icons-react";

import s from "./ReportSidebar.module.scss";
import { smallRoutes as AppRoutes } from "../../AppRoutes";
import { Link, useLocation } from "react-router-dom";

export const ReportSidebar = () => {

  const { pathname } = useLocation();

  const items = AppRoutes.map((item) => (
    <NavLink
      component={Link}
      to={item.path}
      className="custom-navlink"
      key={item.label}
      label={item.label}
      active={item.path === pathname}
      rightSection={<IconChevronRight size="18" stroke={1.5} />}
      leftSection={item.icon}
      color="violet.6"
    />
  ));

  return (
    <>
      <div className={s.sidebar}>
        <div className={s["sidebar__new-btn"]}>
          <ActionIcon
            variant="filled"
            color="violet"
            size="lg"
            aria-label="Settings"
          >
            <IconRefresh className={s["sidebar__refresh-btn"]} stroke={2} />
          </ActionIcon>
        </div>
        <div className="sidebar-menu">{items}</div>
      </div>
    </>
  );
};
