import React, { createRef } from "react";
import Button from "@atlaskit/button";
import { useUpload } from "../../service/upload";

type FileContent = string;

const createOnFileInputChange = (
  input: HTMLInputElement
): Promise<FileContent> =>
  new Promise<FileContent>((resolve, reject) => {
    const file = input?.files?.[0];
    if (!file) {
      throw Error("No file");
    }
    const reader = new FileReader();
    reader.onload = (content) => {
      if (
        content.target?.result &&
        typeof content.target?.result === "string"
      ) {
        resolve(content.target.result);
      } else {
        reject(Error("Uh oh"));
      }
    };
    reader.readAsText(file);
  });

export const Upload = () => {
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
