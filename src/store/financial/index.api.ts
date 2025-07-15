import { Response } from "@/types/api";
import { marginsState, otaState } from "@/types/app/financial";
import { marginType, revenueType } from "@/types/store/financial";
import { api } from "@/utils/api";

export const GetMargin = async () => {
  return await api
    .get<Response<marginType>>("/api/financial/margin")
    .then((res) => res.data);
};

export const GetOTAS = async () => {
  return await api
    .get<Response<otaState[]>>("/api/financial/ota-margin")
    .then((res) => res.data);
};

export const UpdateMargin = async (data: marginsState) => {
  return await api
    .post<Response<marginType>>("/api/financial/margin", data)
    .then((res) => res.data);
};

export const GetProductRevenue = async (id: string) => {
  return await api
    .get<Response<revenueType>>(`/api/products/revenue/${id}`)
    .then((res) => res.data);
};

export const CreateOTA = async (data: otaState) => {
  return await api
    .post("/api/financial/ota-margin", data)
    .then((res) => res.data);
};

export const UpdateOTA = async (data: otaState) => {
  return await api
    .put(`/api/financial/ota-margin/${data.id}`, data)
    .then((res) => res.data);
};

export const DeleteOTA = async (id: string) => {
  return await api
    .delete(`/api/financial/ota-margin/${id}`)
    .then((res) => res.data);
};
