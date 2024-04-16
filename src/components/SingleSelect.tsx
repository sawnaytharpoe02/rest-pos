import React from "react";
import { Select, MenuItem, FormControl, FormLabel } from "@mui/material";
import { AddonCategory } from "@prisma/client";

interface Props {
  title: string;
  selected: number;
  setSelected: (value: number) => void;
  items: AddonCategory[];
}
const SingleSelect = ({ title, selected, setSelected, items }: Props) => {
  return (
    <FormControl size="small" sx={{ width: "100%" }}>
      <FormLabel>{title}</FormLabel>
      <Select
        value={selected}
        onChange={(e) => setSelected(e.target.value as number)}>
        {items.map((item, i) => (
          <MenuItem key={i} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelect;
