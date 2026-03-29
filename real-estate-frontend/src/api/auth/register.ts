import type { RegisterDto } from "../../components/types/register";
import { api } from "../axios";

export const registerUser =async (data: RegisterDto) => {
    const res = await api.post('/auth/register', data)
    return res.data;
}