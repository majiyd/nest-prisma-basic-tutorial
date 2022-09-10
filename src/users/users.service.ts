import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async create(createUserData: CreateUserDto): Promise<User> {
    const { name, email } = createUserData;
    return await this.prismaService.user.create({
      data: {
        name,
        email,
      },
    });
  }
}
