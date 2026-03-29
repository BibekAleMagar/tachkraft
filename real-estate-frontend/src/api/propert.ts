import type { PropertyDto } from "../components/types/properties";
import { api } from "./axios";


export const getProperty = async () => {
    const res = await api.get<PropertyDto[]>('/properties')
    return res.data;
}
