import { Controller, Get, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import type { JwtPayload } from 'src/types/jwtPayload.type';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
getAll(@GetUser() user: JwtPayload) {
    
    return this.propertiesService.findAll(Number(user?.sub));
}
}