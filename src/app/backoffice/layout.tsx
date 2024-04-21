"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  List,
  Button,
} from "@mui/material";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import MenuItemDropDown from "./_components/MenuItemDropDown";
import AppSnackbar from "@/components/snackbar/AppSnackbar";
import { fetchAppData } from "@/store/slice/appSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import NextTopLoader from "nextjs-toploader";
import AddonCategoryForm from "@/components/form/AddonCategoryForm";
import {
  MENU,
  ADDON,
  SETTINGS,
  LOCATION,
  TABLE,
  ORDER,
} from "@/constant/route";
import { ISidebarMenu } from "@/constant/route";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  marginTop: "auto",
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(10px)",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - (${theme.spacing(10)} + 1px))`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BackOfficeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = useTheme();
  const [isOpen, setOpen] = useState(false);
  const { init, isLoading } = useAppSelector((state) => state.app);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({}));
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sideBarMenuArr: {
    menus: ISidebarMenu[];
    menuIcon: string;
    menuLabel: string;
  }[] = [
    {
      menus: ORDER,
      menuIcon: "mingcute:shopping-bag-2-fill",
      menuLabel: "Order",
    },
    { menus: MENU, menuIcon: "solar:home-2-bold-duotone", menuLabel: "Menu" },
    {
      menus: ADDON,
      menuIcon: "solar:waterdrop-bold-duotone",
      menuLabel: "Addon",
    },
    {
      menus: LOCATION,
      menuIcon: "mingcute:location-3-fill",
      menuLabel: "Location",
    },
    {
      menus: TABLE,
      menuIcon: "material-symbols:table-restaurant-rounded",
      menuLabel: "Table",
    },
    {
      menus: SETTINGS,
      menuIcon: "solar:settings-bold-duotone",
      menuLabel: "Settings",
    },
  ];

  const renderMenuItemDropDown = useMemo(() => {
    return sideBarMenuArr.map((v, index) => {
      return (
        <MenuItemDropDown
          key={index}
          menus={v.menus}
          isOpenDrawer={isOpen}
          menuIcon={v.menuIcon}
          menuLabel={v.menuLabel}
        />
      );
    });
  }, [sideBarMenuArr]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={isOpen}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}>
          <Typography variant="h6" noWrap component="div">
            {selectedLocation?.name}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              signOut();
              navigate.push("/");
            }}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader sx={{ justifyContent: "flex-start", pl: 3 }}>
          <Link href="/backoffice">
            <img src="/logo.svg" width={30} />
          </Link>
        </DrawerHeader>

        <List sx={{ padding: "10px" }}>
          {/* App */}
          {renderMenuItemDropDown}
        </List>

        <DrawerFooter>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              ...(isOpen && { display: "none" }),
              color: `${theme.palette.primary.light}`,
            }}
            edge="start">
            <LuChevronsRight />
          </IconButton>
          <IconButton
            aria-label="close drawer"
            onClick={handleDrawerClose}
            sx={{
              ...(!isOpen && { display: "none" }),
              color: `${theme.palette.primary.light}`,
            }}>
            <LuChevronsLeft />
          </IconButton>
        </DrawerFooter>
      </Drawer>
      <Box component="main" sx={{ pt: "64px", width: "100%" }}>
        <Box sx={{ minHeight: "100vh", p: 4 }}>
          <AppSnackbar />
          <NextTopLoader color="#5BE49B" showSpinner={false} />
          {isLoading ? <Typography>Loading ...</Typography> : children}
        </Box>
      </Box>
    </Box>
  );
};

export default BackOfficeLayout;
