import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor ( 
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async register (dto: RegisterDto) {

        const userExist = await this.prisma.user.findUnique({where: {email: dto.email}})
        if(userExist) {
            throw new ConflictException('Email already exists')
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {...dto, password: hashedPassword}
        })

        return { message: "User Created Successfully"}
    }

    async login (credentials: LoginDto) {
        const user = await this.prisma.user.findUnique({where: {email: credentials.email}})
        if(!user || !(await bcrypt.compare(credentials.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = {sub: user.id, email: user.email, role: user.role}

        return {
            access_token: this.jwtService.sign(payload),
            user: {fullName: `${user.firstName} ${user.lastName}`, role: user.role}
        }
    }


}
