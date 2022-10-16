import { Module } from '@nestjs/common';
import { ServerInfoController } from './server-info.controller';
import { ServerInfoService } from './server-info.service';

@Module({
  controllers: [ServerInfoController],
  providers: [ServerInfoService],
  exports: [ServerInfoService]
})
export class ServerInfoModule {}
