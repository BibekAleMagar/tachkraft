import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth/register";
import type { RegisterDto } from "../../components/types/register";



export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterDto) => registerUser(data)
    })
}