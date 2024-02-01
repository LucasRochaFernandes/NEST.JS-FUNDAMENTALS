import { Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { NotificationsController } from './app.controller'

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [PrismaService],
})
export class AppModule {}
