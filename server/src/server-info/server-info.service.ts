import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ServerInfoService {
  ports = {
    roleplay: process.env.ROLEPLAY_PORT,
    creative: process.env.CREATIVE_PORT,
    adventure: process.env.ADVENTURE_PORT,
    lobby: process.env.LOBBY_PORT,
    builders: process.env.BUILDERS_PORT,
  };

  serverIp = process.env.SERVER_IP;
  apiLink = 'https://api.mcsrvstat.us/2/';

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
            const proPlayers = players.map((item) => ({
              nickname: item,
              server: key,
            }));

            users = [...users, ...proPlayers];
          }
        });
    }

    return users;
  }
}
