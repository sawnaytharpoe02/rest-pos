import React from "react";
import { FormControl, FormLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MenuCategory, Menu } from "@prisma/client";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = -100;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  title: string;
  selected: number[] | undefined;
  setSelected: (value: number[]) => void;
  items: MenuCategory[] | Menu[];
}

const MultiSelect = ({ title, selected, setSelected, items }: Props) => {
  return (
    <FormControl size="small" sx={{ width: "100%" }}>
      <FormLabel>{title}</FormLabel>
      <Select
        value={selected}
        multiple
        onChange={(e) => {
          const selectedValues = e.target.value as number[];
          setSelected(selectedValues);
        }}
        renderValue={(selected: number[]) => {
          return items
            .filter((item) => selected.includes(item.id))
            .map((item) => item.name)
            .join(", ");
        }}
        MenuProps={MenuProps}>
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Checkbox checked={selected?.includes(item.id)} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
