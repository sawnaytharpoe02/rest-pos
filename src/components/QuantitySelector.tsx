import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import styled from "@mui/system/styled";
import { ButtonProps } from "@mui/material/Button";

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: "50%",
  padding: theme.spacing(1),
  minWidth: 0,
  width: 35,
  height: 35,
  color: "white",
  background: `${theme.palette.primary.main}`,
  ":hover": {
    background: `${theme.palette.primary.dark}`,
  },
}));

const QuantitySelector = ({ value, onIncrease, onDecrease }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100px",
        mt: { xs: 2, sm: 3 },
      }}>
      <CustomButton color="primary" onClick={onDecrease}>
        <Icon icon="radix-icons:dash" fontSize={22} />
      </CustomButton>
      <Typography variant="h6" sx={{ mx: 1 }}>
        {value}
      </Typography>
      <CustomButton color="primary" onClick={onIncrease}>
        <Icon icon="bi:plus" fontSize={22} />
      </CustomButton>
    </Box>
  );
};

export default QuantitySelector;
