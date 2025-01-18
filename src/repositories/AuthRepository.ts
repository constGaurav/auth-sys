import prismaClient from "../config/prisma";

export class AuthRepository {
  async findUserByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async createUser(name: string, email: string, password: string) {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}
