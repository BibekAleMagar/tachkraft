import {z} from "zod";
import { loginSchema } from "../schema/login";

export type LoginDto = z.infer<typeof loginSchema>;