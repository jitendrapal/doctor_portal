import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { FeedModule } from "./modules/feed/feed.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { AiModule } from "./modules/ai/ai.module";
import { SearchModule } from "./modules/search/search.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    FeedModule,
    NotificationsModule,
    AiModule,
    SearchModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
