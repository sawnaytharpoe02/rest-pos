export const MENU = [
  {
    name: "Menu",
    href: "/backoffice/menu",
    icon: "codicon:circle-filled",
  },
  {
    name: "Menu Category",
    href: "/backoffice/menu-category",
    icon: "codicon:circle-filled",
  },
];

export const ADDON = [
  {
    name: "Addon",
    href: "/backoffice/addon",
    icon: "codicon:circle-filled",
  },
  {
    name: "Addon Category",
    href: "/backoffice/addon-category",
    icon: "codicon:circle-filled",
  },
];

export const ORDER = [
  {
    name: "Order",
    href: "/backoffice/order",
    icon: "",
  },
];

export const LOCATION = [
  {
    name: "Location",
    href: "/backoffice/location",
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
    href: "/backoffice/table",
    icon: "",
  },
];

export interface ISidebarMenu {
  name: string;
  href: string;
  icon: string;
}
