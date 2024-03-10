import { ActionIcon, NavLink } from "@mantine/core";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import DraftReport from "../../feature/DraftReport";
import { useState } from "react";
import { Text } from "@mantine/core";

import s from "./ReportSidebar.module.scss";
import { smallRoutes as AppRoutes } from "../../AppRoutes";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";

export const ReportSidebar = () => {
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const { user, logout } = useAuth();

  const logoutHandleClick = () => {
    logout();
  };

  const items = AppRoutes.map((item) => (
    <NavLink
      component={Link}
      to={item.path}
      className="custom-navlink"
      key={item.label}
      label={item.label}
      active={true}
      rightSection={<IconChevronRight size="18" stroke={1.5} />}
      leftSection={item.icon}
      color="green.8"
    />
  ));

  return (
    <>
      {isDraftOpen && <DraftReport toggleReport={setIsDraftOpen} />}
      <div className={s.sidebar}>
        <div className={s["sidebar-manage"]}>
          <Text size="md" fw={700}>
            {user.name.toUpperCase()}
          </Text>
          <ActionIcon
            variant="light"
            color="red"
            size="lg"
            aria-label="Settings"
            onClick={logoutHandleClick}
          >
            <IconLogout className={s["sidebar__refresh-btn"]} stroke={2} />
          </ActionIcon>
        </div>
        {/* <Text size="md" fw={700}>
          {user.name.toUpperCase()}
        </Text>
        <ActionIcon
          variant="light"
          color="red"
          size="lg"
          aria-label="Settings"
          onClick={logoutHandleClick}
        >
          <IconLogout className={s["sidebar__refresh-btn"]} stroke={2} />
        </ActionIcon> */}
        <div className="sidebar-menu">{items}</div>
      </div>
    </>
  );
};
