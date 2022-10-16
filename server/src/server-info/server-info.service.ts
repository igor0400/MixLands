import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface OnlineDataType {
  nickname: string;
  server: string;
}

@Injectable()
export class ServerInfoService {
  ports = {
    RolePlay: process.env.ROLEPLAY_PORT,
    Creative: process.env.CREATIVE_PORT,
    Adventure: process.env.ADVENTURE_PORT,
    Lobby: process.env.LOBBY_PORT,
    Builders: process.env.BUILDERS_PORT,
  };

  serverIp = process.env.SERVER_IP;
  apiLink = process.env.GET_STATS_LINK;

  async getOnlineCount(server: string) {
    let count = {
      online: 0,
      max: 0,
    };

    await axios
      .get(`${this.apiLink}${this.serverIp}:${this.ports[server]}`)
      .then((res) => {
        const players = res.data?.players;

        if (players) {
          count = { online: players.online, max: players.max };
        }
      });

    return count;
  }

  async getOnlineUsers() {
    let users = [];

    for (let key in this.ports) {
      await axios
        .get(`${this.apiLink}${this.serverIp}:${this.ports[key]}`)
        .then((res) => {
          const players = res.data?.players?.list;

          if (players) {
            const proPlayers = players.map(
              (item: string): OnlineDataType => ({
                nickname: item,
                server: key,
              }),
            );

            users = [...users, ...proPlayers];
          }
        });
    }

    return users;
  }

  async checkPlayerOnline(nickname: string): Promise<boolean | string> {
    const users = await this.getOnlineUsers();
    let isOnline: boolean | string = false;

    users.forEach((item: OnlineDataType) => {
      if (item.nickname === nickname) {
        isOnline = item.server;
      }
    });

    return isOnline;
  }
}
