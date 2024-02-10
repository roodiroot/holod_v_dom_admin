import {
  fetchUtils,
  DataProvider,
  CreateParams,
  UpdateParams,
} from "react-admin";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_REST_URL;
const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", token);
  return fetchUtils.fetchJson(url, options);
};

type ProductParams = {
  id: number;
  name: string;
  typeId: number;
  brandId: number;
  description?: string | undefined;
  price?: number;
  img?:
    | {
        rawFile: File;
      }[]
    | undefined;
  logo?: {
    rawFile: File;
  };
  options: { title: string; description: string }[];
};

const createPostFormData = (
  params: CreateParams<ProductParams> | UpdateParams<ProductParams>
) => {
  const formData = new FormData();
  params?.data?.options &&
    formData.append("option", JSON.stringify(params?.data?.options));
  if (params?.data?.img?.length)
    for (let i = 0; i < params?.data?.img?.length; i++) {
      if (params?.data?.img[i]?.rawFile) {
        formData.append("img", params?.data?.img[i].rawFile);
      }
    }
  console.log(params.data?.logo);
  params.data?.logo && formData.append("logo", params.data.logo.rawFile);
  params.data?.name && formData.append("name", params.data.name);
  params.data?.typeId && formData.append("typeId", `${params.data.typeId}`);
  params.data?.brandId && formData.append("brandId", `${params.data.brandId}`);
  params.data?.price && formData.append("price", `${params.data.price}`);
  params.data?.description &&
    formData.append("description", params.data?.description);
  return formData;
};

const dataProductProviders: DataProvider = {
  getList: async (resource, params) => {
    // console.log(params);
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([perPage, (page - 1) * perPage]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const { json } = await httpClient(url);

    return {
      data: json.data || [],
      total: json.count || 10,
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: json?.data || [], total: json?.count || 10 };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([perPage, (page - 1) * perPage]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return {
      data: json?.data || [],
      total: json?.count || 10,
    };
  },

  create: async (resource, params) => {
    const formData = createPostFormData(params);
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: formData,
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const formData = createPostFormData(params);
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: formData,
    });
    return { data: json };
  },

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
    });
    return { data: json };
  },

  deleteMany: async (resource, params: any) => {
    const url = `${apiUrl}/${resource}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
      body: JSON.stringify(params.ids),
    });
    return { data: json };
  },
};

export default dataProductProviders;
