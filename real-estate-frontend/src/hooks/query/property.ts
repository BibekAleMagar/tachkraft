import { getProperty } from "../../api/propert";
import { useQuery } from "@tanstack/react-query";


export const useProperty = () => {
    return useQuery({
        queryKey: ['properties'],
        queryFn: getProperty
    })
}