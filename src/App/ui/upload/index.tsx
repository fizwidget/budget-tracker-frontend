import React, { createRef } from "react";
import Button from "@atlaskit/button";
import { useUpload } from "../../service/upload";

export const Upload = () => {
  const fileInputRef = createRef<HTMLInputElement>();
  const [upload, result] = useUpload();
  return (
    <>
      {JSON.stringify(result)}
      <Button type="file" onClick={() => fileInputRef.current?.click()}>
        Upload CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={() => {
          const file = fileInputRef.current?.files?.[0];
          if (!file) {
            throw Error("No file");
          }
          console.table(file);
          const reader = new FileReader();
          reader.onload = (content) => {
            if (
              content.target?.result &&
              typeof content.target?.result === "string"
            ) {
              upload({ transactionsCsv: content.target.result });
            }
          };
          reader.readAsText(file);
        }}
      />
    </>
  );
};
