type FileContent = string;

export const createOnFileInputChange = (
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
