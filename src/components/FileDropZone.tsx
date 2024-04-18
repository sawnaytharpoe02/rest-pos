import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";

interface Props {
  onDrop: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onDrop }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 3,
        border: "2px dotted lightgray",
        p: 1,
        cursor: "pointer",
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drop the files here ...</Typography>
      ) : (
        <Typography>Drop some files here, or click to select</Typography>
      )}
    </Box>
  );
};

export default FileDropZone;
