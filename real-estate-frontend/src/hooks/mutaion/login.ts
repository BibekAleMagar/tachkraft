import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth/login";
import type { LoginDto } from "../../components/types/login";


export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginDto) => loginUser(data)
    })
}