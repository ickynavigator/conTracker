/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const ApiUrl = "https://contracker316.herokuapp.com";
const BASEURL = `${ApiUrl}/v1/api`;

const getAllCriminals = async (pageNum = 1, pageSize = 10, search = "") => {
  const query = search ? `keyword=${search}` : "";
  const page = pageNum ? `pageNumber=${pageNum}` : "";
  const size = pageSize ? `pageSize=${pageSize}` : "";

  const res = axios.get(`${BASEURL}/person?${query}&${page}&${size}`);
  return (await res).data;
};
