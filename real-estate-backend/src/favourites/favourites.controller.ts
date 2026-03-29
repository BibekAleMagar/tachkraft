import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import type { JwtPayload } from 'src/types/jwtPayload.type';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly service: FavouritesService) {}

  @Post(':propertyId')
  add(
    @Param('propertyId', ParseIntPipe) propertyId: number,
    @GetUser() user: JwtPayload,
  ) {
    return this.service.add(user.sub, propertyId);
  }

  @Delete(':propertyId')
  remove(
    @Param('propertyId', ParseIntPipe) propertyId: number,
    @GetUser() user: JwtPayload,
  ) {
    return this.service.remove(user.sub, propertyId);
  }

  @Get()
  getMy(@GetUser() user: JwtPayload) {
    return this.service.getMyFavourites(user.sub);
  }
}