import axios from "axios";

const client = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://api.inftytrade.xyz/v1/",
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://78.46.76.71:8080/v1/",
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/v1/", 
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://pumpbit-proxy-server-psi.vercel.app/v1/",
});

export const tickets = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://api.inftytrade.xyz/v1/",
})

export default client;



//deploy




