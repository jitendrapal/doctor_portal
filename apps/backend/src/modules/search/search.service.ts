import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async globalSearch(query: string) {
    const q = query.trim();
    if (!q) {
      return { users: [], hospitals: [], papers: [] };
    }

    const [users, hospitals, papers] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
      this.prisma.hospital.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        take: 10,
      }),
      this.prisma.researchPaper.findMany({
        where: { title: { contains: q, mode: "insensitive" } },
        take: 10,
      }),
    ]);

    return { users, hospitals, papers };
  }
}
