import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

// Common modules
import { PrismaModule } from './common/prisma/prisma.module';
import { LoggerModule } from './common/logger/logger.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TeamsModule } from './modules/teams/teams.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { JudgesModule } from './modules/judges/judges.module';
import { AdminModule } from './modules/admin/admin.module';
import { SponsorsModule } from './modules/sponsors/sponsors.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { FaqModule } from './modules/faq/faq.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { HealthModule } from './modules/health/health.module';
import { StorageModule } from './common/storage/storage.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 100, // 100 requests per minute
      },
    ]),

    // Scheduling
    ScheduleModule.forRoot(),

    // Common modules
    PrismaModule,
    LoggerModule,
    StorageModule,

    // Feature modules
    HealthModule,
    AuthModule,
    UsersModule,
    TeamsModule,
    SubmissionsModule,
    JudgesModule,
    AdminModule,
    SponsorsModule,
    TimelineModule,
    FaqModule,
    AnnouncementsModule,
  ],
})
export class AppModule {}
