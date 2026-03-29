import type { FavouriteDto } from "../components/types/favourite";
import { api } from "./axios";

export const addFavorite = async (id: number) => {
    const res = await api.post(`/favourites/${id}`)
    return res.data;
}


export const getFavorites = async () => {
    const res = await api.get<FavouriteDto[]>('/favourites')
    return res.data;
}

export const removeFavorite = async (propertyId: number) => {
    const res = await api.delete(`/favourites/${propertyId}`)
    return res.data;
}