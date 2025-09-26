import React from "react";
import { FileInput } from "@mantine/core";

const UploadFile = ({ onFileSelected, disabled }) => {
  const handleFileUpload = async (file) => {
    if (onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <FileInput
      radius="md"
      label="Upload your resume"
      description="Supported formats: PDF"
      placeholder="Choose file"
      onChange={handleFileUpload}
      accept="application/pdf"
      clearable={!disabled}
      disabled={disabled}
    />
  );
};

export default UploadFile;
