import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'

export class RegisterDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6, {message: "Password must be 6 characters or more"})
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    role: string
}