import { apiInstance } from "../../shared/api";
import {
  ReportDeliveryStatus,
  ReportListModel,
  ReportModel,
  ReportUpdateApi,
} from "./types";

const ENDPOINTS = {
  base: "/api/document/",
  withPath: (path: unknown) => `/api/document/${path}`,
};

export const getAll = async (options: {
  page: number;
  pageSize: number;
  type: "draft" | "formed";
  deliveryStatus?: ReportDeliveryStatus;
  ownerOrTitle?: string;
}) => {
  const { type, ...params } = options;
  return apiInstance.get<ReportListModel>(ENDPOINTS.withPath(type), {
    params,
  });
};

export const getDetailed = async (options: { id: number }) => {
  return apiInstance.get<ReportModel>(ENDPOINTS.withPath(options.id));
};

export const create = async () => {
  return apiInstance.post<{ id: number }>(ENDPOINTS.base);
};

export const update = async (options: ReportUpdateApi & { id: number }) => {
  return apiInstance.put<null>(ENDPOINTS.withPath(options.id), {
    owner: options.owner,
    title: options.title,
    payload: options.payload,
  });
};

export const send = async (options: { id: number }) => {
  return apiInstance.post<null>(ENDPOINTS.withPath(options.id));
};

export const remove = async (options: { id: number }) => {
  return apiInstance.delete<null>(ENDPOINTS.withPath(options.id));
};
