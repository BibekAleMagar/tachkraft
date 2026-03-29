import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Favourite, Property } from '../generated/prisma';

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: number, propertyId: number): Promise<Favourite> {
    try {
      return await this.prisma.favourite.create({
        data: { userId, propertyId },
      });
    } catch {
      throw new BadRequestException('Already favourited');
    }
  }

  async remove(userId: number, propertyId: number): Promise<Favourite> {
    const fav = await this.prisma.favourite.findUnique({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });

    if (!fav) {
      throw new NotFoundException('Favourite not found');
    }

    return this.prisma.favourite.delete({
      where: { id: fav.id },
    });
  }

  async getMyFavourites(
    userId: number,
  ): Promise<(Favourite & { property: Property })[]> {
    return this.prisma.favourite.findMany({
      where: { userId },
      include: { property: true },
    });
  }
}