export const MENU = [
  {
    name: "Menu",
    href: "/backoffice/menus",
    icon: "codicon:circle-filled",
  },
  {
    name: "Menu Category",
    href: "/backoffice/menu-categories",
    icon: "codicon:circle-filled",
  },
];

export const ADDON = [
  {
    name: "Addon",
    href: "/backoffice/addons",
    icon: "codicon:circle-filled",
  },
  {
    name: "Addon Category",
    href: "/backoffice/addon-categories",
    icon: "codicon:circle-filled",
  },
];

export const ORDER = [
  {
    name: "Order",
    href: "/backoffice/orders",
    icon: "",
  },
];

export const LOCATION = [
  {
    name: "Location",
    href: "/backoffice/locations",
    icon: "",
  },
];

export const COMPANY = [
  {
    name: "Company",
    href: "/backoffice/company",
    icon: "",
  },
];

export const SETTINGS = [
  {
    name: "Settings",
    href: "/backoffice/settings",
    icon: "",
  },
];

export const TABLE = [
  {
    name: "Table",
    href: "/backoffice/tables",
    icon: "",
  },
];

export interface ISidebarMenu {
  name: string;
  href: string;
  icon: string;
}
