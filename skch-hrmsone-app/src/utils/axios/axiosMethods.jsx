import FileSaver from "file-saver";
import { axiosInterceptor } from "./axiosInterceptor";

// --------------------
// HTTP METHODS
// --------------------

export const GET = async (url, params = {}, config = {}) => {
  const response = await axiosInterceptor.get(url, {
    ...config,
    params,
  });
  return response.data;
};

export const POST = async (url, payload = {}, config = {}) => {
  const response = await axiosInterceptor.post(url, payload, config);
  return response.data;
};

export const PUT = async (url, payload = {}, config = {}) => {
  const response = await axiosInterceptor.put(url, payload, config);
  return response.data;
};

export const DELETE = async (url, config = {}) => {
  const response = await axiosInterceptor.delete(url, config);
  return response.data;
};

// --------------------
// FILE DOWNLOAD
// --------------------

const getFileName = (disposition, fallback = "download") => {
  if (!disposition) return fallback;
  // RFC 5987 filename*=UTF-8''...
  const encodedFileName = disposition.match(
    /filename\*\s*=\s*UTF-8''([^;]+)/i,
  )?.[1];
  if (encodedFileName) {
    try {
      return decodeURIComponent(encodedFileName.trim());
    } catch {
      return encodedFileName;
    }
  }
  // filename="report.xlsx" OR filename=report.xlsx
  return (
    disposition.match(/filename\s*=\s*"([^"]+)"/i)?.[1] ||
    disposition.match(/filename\s*=\s*([^;]+)/i)?.[1]?.trim() ||
    fallback
  );
};

const downloadFile = async (response, fallbackName) => {
  const blob = response.data;

  if (!(blob instanceof Blob) || blob.size === 0) {
    throw new Error("Downloaded file is empty.");
  }

  // Blob error responses may contain JSON instead of the actual file.
  if (blob.type.includes("application/json")) {
    const errorData = JSON.parse(await blob.text());
    throw new Error(errorData.message || "File download failed.");
  }

  const filename = getFileName(
    response.headers["content-disposition"],
    fallbackName,
  );

  FileSaver.saveAs(blob, filename);
};

export const DOWNLOAD_FILE = async (url, payload = {}, config = {}) => {
  const response = await axiosInterceptor.post(url, payload, {
    ...config,
    responseType: "blob",
  });

  return downloadFile(response, "download");
};

export const DOWNLOAD_FILE_GET = async (url, params = {}, config = {}) => {
  const response = await axiosInterceptor.get(url, {
    ...config,
    params,
    responseType: "blob",
  });

  return downloadFile(response, "download");
};

// --------------------
// FILE UPLOAD
// --------------------

export const UPLOAD_FILE = (
  url,
  file,
  {
    dto,
    onProgress,
    headers = {},
    fileKey = "file",
    dtoKey = "dto",
    ...config
  } = {},
) => {
  const formData = new FormData();

  formData.append(fileKey, file);

  if (dto != null) {
    formData.append(
      dtoKey,
      new Blob([JSON.stringify(dto)], {
        type: "application/json",
      }),
    );
  }

  return axiosInterceptor.post(url, formData, {
    ...config,
    headers,
    onUploadProgress: (event) => {
      if (event.total && onProgress) {
        onProgress(Math.round((event.loaded * 100) / event.total));
      }
    },
  });
};

export default axiosInterceptor;
