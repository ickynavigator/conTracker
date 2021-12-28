import axios from "axios";

export const ApiUrl =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_API_URL !== ""
    ? "https://contracker316.herokuapp.com"
    : process.env.NEXT_PUBLIC_API_URL;
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

export const getWantedCriminals = async (pageNum = 1, pageSize = 10) => {
  const res = axios.get(
    `${BASEURL}/person/wanted?pageNumber=${pageNum}&pageSize=${pageSize}`,
  );
  return (await res).data;
};

export const submitCrime = async data => {
  const res = axios.post(`${BASEURL}/report/crime`, data);
  return (await res).data;
};

export const submitMissing = async data => {
  const res = axios.post(`${BASEURL}/report/missing`, data);
  return (await res).data;
};

export const submitContactForm = async data => {
  const res = axios.post(`${BASEURL}/report/contact`, data);
  return (await res).data;
};

export const submitComplaint = async data => {
  const res = axios.post(`${BASEURL}/report/complaint`, data);
  return (await res).data;
};

export default {};
