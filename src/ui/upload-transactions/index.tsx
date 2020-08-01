import React, { createRef } from "react";
import Button from "@atlaskit/button";
import { useUpload } from "../../services/upload-transactions";
import { createOnFileInputChange } from "./utils";
import { ErrorMessage } from "../error-message";

export const UploadTransactions = () => {
  const fileInputRef = createRef<HTMLInputElement>();
  const [upload, result] = useUpload();
  return (
    <>
      {result.error && (
        <ErrorMessage
          title="Failed to record transactions"
          error={result.error}
        />
      )}
      <Button
        type="file"
        isLoading={result.loading}
        onClick={() => fileInputRef.current?.click()}
      >
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
