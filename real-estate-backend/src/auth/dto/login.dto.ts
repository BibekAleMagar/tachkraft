import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6, {message: "Password must be 6 characters or more"})
    password: string
}