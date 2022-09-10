import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createItemData: CreateItemDto): Promise<Item> {
    const { name, isForRent, userId } = createItemData;
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        items: {
          create: {
            name,
            isForRent,
          },
        },
      },
      include: {
        items: {
          take: -1,
        },
      },
    });

    return user.items[0];
  }

  async create2(createItemData: CreateItemDto): Promise<Item> {
    const { name, isForRent, userId } = createItemData;
    const item = await this.prismaService.item.create({
      data: {
        name,
        isForRent,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return item;
  }

  async create3(createItemData: CreateItemDto): Promise<Item> {
    const { name, isForRent, userId } = createItemData;
    const item = await this.prismaService.item.create({
      data: {
        name,
        isForRent,
        userId,
      },
    });

    return item;
  }

  async findAllByUserId(userId: number): Promise<Item[]> {
    return await this.prismaService.item.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const { name, isForRent } = updateItemDto;
    return await this.prismaService.item.update({
      where: {
        id,
      },
      data: {
        name,
        isForRent,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
