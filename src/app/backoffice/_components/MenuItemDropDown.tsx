"use client";

import { useMemo, useState } from "react";
import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  Popover,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import { Icon } from "@iconify/react";
import MenuItem from "./MenuItem";
import { usePathname } from "next/navigation";

interface Menu {
  name: string;
  href: string;
  icon: string;
}

interface Props {
  menus: Menu[];
  isOpenDrawer: boolean;
  menuIcon: string;
  menuLabel: string;
}

const MenuItemDropDown = ({
  menus,
  isOpenDrawer,
  menuIcon,
  menuLabel,
}: Props) => {
  const pathname = usePathname();
  const isActiveSubmenu = useMemo(
    () => (menus.find((menu) => menu.href === pathname) ? true : false),
    [pathname, menus]
  );

  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenSubMenu = () => {
    setSubMenuOpen(() => !subMenuOpen);
  };

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return isOpenDrawer ? (
    <Box sx={{ textAlign: "center" }}>
      <ListItemButton
        onClick={handleOpenSubMenu}
        sx={{
          padding: "5px 16px",
          justifyContent: isOpenDrawer ? "initial" : "center",
          borderRadius: ".4rem",
          backgroundColor: isActiveSubmenu
            ? "#F0FFF4"
            : subMenuOpen
            ? "#F4F6F8"
            : "transparent",
          color: "#161C24",
        }}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpenDrawer ? 3 : "auto",
            justifyContent: "center",
          }}>
          <Icon
            icon={menuIcon}
            fontSize={22}
            color={
              isActiveSubmenu ? "#00A76F" : subMenuOpen ? "#454F5B" : "#637381"
            }
          />
        </ListItemIcon>
        <ListItemText
          primary={menuLabel}
          sx={{
            color: isActiveSubmenu ? "#00A76F" : subMenuOpen ? "#454F5B" : "",
          }}
        />
        {subMenuOpen ? (
          <Icon
            icon="lets-icons:expand-down-light"
            color={
              isActiveSubmenu ? "#00A76F" : subMenuOpen ? "#161C24" : "#637381"
            }
          />
        ) : (
          <Icon icon="lets-icons:expand-right-light" color="#637381" />
        )}
      </ListItemButton>
      <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
        {menus.map((link, index) => (
          <MenuItem key={index} link={link} isOpenDrawer={isOpenDrawer} />
        ))}
      </Collapse>
    </Box>
  ) : (
    <Box sx={{ textAlign: "center" }}>
      <Tooltip title={menuLabel} placement="right-start">
        <IconButton
          sx={{
            justifyContent: isOpenDrawer ? "initial" : "center",
            backgroundColor: isActiveSubmenu
              ? "#F0FFF4"
              : subMenuOpen
              ? "#F4F6F8"
              : "transparent",
          }}
          onClick={handleClickPopover}>
          <Icon
            icon={menuIcon}
            fontSize={22}
            color={
              isActiveSubmenu ? "#00A76F" : subMenuOpen ? "#161C24" : "#637381"
            }
          />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorPosition={{
          top: 75,
          left: 77,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        {menus.map((link, index) => (
          <MenuItem
            key={index}
            link={link}
            isOpenDrawer={isOpenDrawer}
            handleClosePopover={handleClosePopover}
          />
        ))}
      </Popover>
    </Box>
  );
};

export default MenuItemDropDown;
