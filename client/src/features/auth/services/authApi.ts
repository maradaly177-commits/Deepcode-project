import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api", // chỉnh theo backend của bạn
});

export const authApi = {
    login: (data: { email: string; password: string }) =>
        api.post("/auth/login", data),
    register: (data: { name: string; email: string; password: string }) =>
        api.post("/auth/register", data),
};
