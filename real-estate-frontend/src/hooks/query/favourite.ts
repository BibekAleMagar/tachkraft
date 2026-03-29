import { useQuery } from "@tanstack/react-query"
import { getFavorites } from "../../api/favorite"

export const useFavorites = () => {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites
    })
}