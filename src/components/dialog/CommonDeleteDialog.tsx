import * as React from "react";
import { Dialog, Box, CircularProgress } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import FormButton from "@/components/button/FormButton";
import { useAppSelector } from "@/store/hook";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  handleDelete: () => void;
}

const CommonDeleteDialog = ({
  title,
  content,
  handleDelete,
  open,
  close,
}: Props) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}>
        <Box sx={{ p: 2 }}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: "24px", pb: "16px" }}>
            <FormButton onClick={close}>Cancel</FormButton>
            <FormButton onClick={handleDelete}>Delete</FormButton>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default CommonDeleteDialog;
