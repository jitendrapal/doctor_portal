import { Test } from "@nestjs/testing";
import { FeedService } from "./feed.service";
import { PrismaService } from "src/prisma/prisma.service";

describe("FeedService", () => {
  let service: FeedService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FeedService,
        {
          provide: PrismaService,
          useValue: {
            post: {
              findMany: jest.fn().mockResolvedValue([]),
            },
          },
        },
      ],
    }).compile();

    service = moduleRef.get(FeedService);
  });

  it("returns feed posts", async () => {
    const result = await service.getFeed(1, 10);
    expect(result).toEqual([]);
  });
});
