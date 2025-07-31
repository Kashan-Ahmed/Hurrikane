export const numberWithCommas = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    console.error("Invalid input: value must be a number.");
    return "-";
  }
  return value.toLocaleString("en-US");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectToQueryString = (params: Record<string, any>): string => {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (value === null || value === undefined) return "";
      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean) // Remove any empty strings
    .join("&");
};

export const formatFileSize = (sizeInBytes: number | undefined) => {
  if (sizeInBytes) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2);
  } else {
    return 0;
  }
};

export const objectToFormData = <T>(obj: T): FormData => {
  const form = new FormData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appendData = (data: any, namespace: string = "") => {
    // eslint-disable-next-line prefer-const
    for (let key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        const formKey = namespace ? `${namespace}[${key}]` : key;

        if (Array.isArray(data[key])) {
          // Handle arrays separately
          data[key].forEach((item, index) => {
            const arrayNamespace = `${formKey}[${index}]`;
            if (typeof item === "object" && !(item instanceof File)) {
              // Flatten nested objects within arrays by merging the key directly
              for (const nestedKey in item) {
                if (item.Object.prototype.hasOwnProperty.call(nestedKey)) {
                  form.append(
                    `
                    ${arrayNamespace}${nestedKey}`,
                    item[nestedKey] as string,
                  );
                }
              }
            } else {
              form.append(arrayNamespace, item as string);
            }
          });
        } else if (
          typeof data[key] === "object" &&
          !(data[key] instanceof File)
        ) {
          // Recursively convert nested objects
          appendData(data[key], formKey);
        } else {
          // Append to FormData
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.append(formKey, data[key] as any); // Type assertion for appending
        }
      }
    }
  };

  appendData(obj); // Start appending data from the object
  return form;
};

export const downloadImage = async (url: string, fileName: string) => {
  try {
    // Open image in a new tab
    window.open(url, "_blank");

    // Fetch the image as a blob
    const response = await fetch(url);
    const blob = await response.blob();

    // Extract the file extension from the URL
    const urlParts = url.split(".");
    const extension = urlParts[urlParts.length - 1].split(/[?#]/)[0]; // Handles query params and fragments
    const defaultFileName = `downloaded-image.${extension}`;

    // Create a link element for downloading the image
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);

    // Set the href to the object URL
    link.href = objectUrl;

    // Set the download attribute with the custom or default filename
    link.setAttribute(
      "download",
      fileName ? `${fileName}.${extension}` : defaultFileName,
    );

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the DOM and revoke the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Failed to download the image:", error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toUrlEncoded = (obj: Record<string, any>): string => {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`,
    )
    .join("&");
};

export const extractFileName = (url: string): string => {
  const fileName = url.split("/").pop()?.split("?")[0] || "";
  const [nameWithoutExtension, extension] = fileName.split(".");
  const cleanedName = nameWithoutExtension.split("_")[0];
  return cleanedName + (extension ? "." + extension : "");
};

export const getFileExtension = (url: string): string | null => {
  const urlWithoutParams = url.split("?")[0]; // Remove query parameters
  const parts = urlWithoutParams.split("."); // Split by period to isolate the extension
  return parts.length > 1 ? parts[parts.length - 1] : null; // Return the last part if available
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1]; // Remove the Data URL prefix
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const makeUserName = (
  firstName?: string,
  lastName?: string,
): string | null => {
  return [firstName, lastName].filter(Boolean).join(" ") || null;
};
