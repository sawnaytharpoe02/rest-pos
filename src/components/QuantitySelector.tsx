import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({ value, onIncrease, onDecrease }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
      }}>
      <Typography variant="h6" sx={{ userSelect: "none" }}>
        Quantity
      </Typography>
      <ButtonGroup>
        <Button
          size="small"
          sx={{ color: "primary.main" }}
          onClick={onDecrease}>
          <Icon icon="radix-icons:dash" fontSize={22} />
        </Button>
        <Button size="small" sx={{ color: "#000" }}>
          {value}
        </Button>
        <Button
          size="small"
          sx={{ color: "primary.main" }}
          onClick={onIncrease}>
          <Icon icon="bi:plus" fontSize={22} />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default QuantitySelector;
