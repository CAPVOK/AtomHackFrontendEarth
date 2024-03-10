import { apiInstance } from "../../shared/api";
import { BASE_URL } from "../../shared/config";

export const upload = async (options: { reportId: number; file: File }) => {
  const formData = new FormData();
  formData.append("file", options.file);
  return apiInstance.put<{ id: number }>(
    `${BASE_URL}/api/document/${options.reportId}/file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const remove = async (options: { reportId: number; fileId: number }) => {
  return apiInstance.delete<null>(
    `${BASE_URL}/api/document/${options.reportId}/file/${options.fileId}`
  );
};
