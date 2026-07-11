import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  listForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}
