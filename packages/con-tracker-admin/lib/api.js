/* eslint-disable no-undef */
export const ApiUrl = "https://contracker316.herokuapp.com";
export const BASEURL = `${ApiUrl}/v1/api`;

export const getAllCriminals = async (
  pageNum = 1,
  pageSize = 10,
  search = "",
) => {
  const query = search ? `keyword=${search}` : "";
  const page = pageNum ? `pageNumber=${pageNum}` : "";
  const size = pageSize ? `pageSize=${pageSize}` : "";

  const res = axios.get(`${BASEURL}/person?${query}&${page}&${size}`);
  return (await res).data;
};
