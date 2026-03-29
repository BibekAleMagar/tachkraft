import {z} from "zod";
import type { registerSchema } from "../schema/register";



export type RegisterDto = z.infer<typeof registerSchema>