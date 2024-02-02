import { Module } from '@nestjs/common'

import { PrismaService } from './infra/prisma.service'
import { NotificationsController } from './infra/app.controller'

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [PrismaService],
})
export class AppModule {}
