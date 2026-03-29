import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PropertiesService {
    constructor(private prisma: PrismaService) {}

    async findAll(userId: number) {
        const properties = await this.prisma.property.findMany({
            include: {
                favourites: {
                    where: {userId}
                }
            }
        });

        return properties?.map(({favourites, ...property}) => ({
            ...property,
            isFavourite: userId ? favourites.length > 0 : false,
        }))
    }

}
