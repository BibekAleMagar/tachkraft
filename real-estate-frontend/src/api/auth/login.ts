import type { LoginDto } from "../../components/types/login";
import { api } from "../axios";


export const loginUser =async (data: LoginDto) => {
    const res = await api.post('/auth/login', data)
    return res.data;
}