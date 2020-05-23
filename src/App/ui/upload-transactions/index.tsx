import React, { createRef } from "react";
import Button from "@atlaskit/button";
import { useUpload } from "../../service/upload-transactions";
import { createOnFileInputChange } from "./utils";

export const UploadTransactions = () => {
  const fileInputRef = createRef<HTMLInputElement>();
  const [upload, result] = useUpload();
  return (
    <>
      {result.error && `Error message: ${result.error?.message}`}
      <Button type="file" onClick={() => fileInputRef.current?.click()}>
        Upload CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={() => {
          const fileInput = fileInputRef.current;
          if (fileInput) {
            createOnFileInputChange(fileInput).then((fileContent) => {
              upload({ transactionsCsv: fileContent });
            });
          }
        }}
      />
    </>
  );
};
