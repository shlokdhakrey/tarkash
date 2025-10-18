import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  async check() {
    const dbStatus = await this.checkDatabase();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'InnovateX 2025 API',
      version: '1.0.0',
      database: dbStatus,
      uptime: process.uptime(),
    };
  }

  private async checkDatabase(): Promise<string> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return 'connected';
    } catch (error) {
      return 'disconnected';
    }
  }
}
