import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  createPost(userId: string, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        authorId: userId,
        content: dto.content,
        visibility: dto.visibility ?? "PUBLIC",
      },
    });
  }

  getFeed(page = 1, limit = 20) {
    return this.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { id: true, firstName: true, lastName: true } },
        reactions: true,
        comments: { take: 3, orderBy: { createdAt: "desc" } },
      },
    });
  }
}
