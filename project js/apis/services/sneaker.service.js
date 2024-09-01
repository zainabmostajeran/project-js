import { httpClient } from "../client";
import { urls } from "../urls";

export async function getSneakers({
  page = 1,
  limit = 10,
  search = "",
  brands = [],
} = {}) {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (search) params.append("search", search);
  if (brands.length > 0) params.append("brands", brands.join(","));
  const response = await httpClient().get(
    `${urls.sneaker.new}?${params.toString()}`
  );
  return response.data;
}
export async function getSneakersBrand() {
  const response = await httpClient().get(urls.sneaker.brands);
  return response.data;
}
export async function getSneakersItem(id) {
  const response = await httpClient().get(urls.sneaker.item + `${id}`);
  return response.data;
}
