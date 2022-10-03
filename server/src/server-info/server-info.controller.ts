import { Controller, Get, Query } from '@nestjs/common';
import { ServerInfoService } from './server-info.service';

@Controller('server-info')
export class ServerInfoController {
  constructor(private serverInfoService: ServerInfoService) {}

  @Get('/online-users')
  getOnlineUsers() {
    return this.serverInfoService.getOnlineUsers();
  }

  @Get('/online-count')
  getOnlineCount(@Query() { server }) {
    return this.serverInfoService.getOnlineCount(server);
  }
}
