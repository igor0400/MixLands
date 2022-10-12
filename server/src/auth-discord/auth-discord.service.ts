import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Response } from 'express';
import { SiteUserData } from 'src/users/models/site-user-data.model';

@Injectable()
export class AuthDiscordService {
  constructor(
    @InjectModel(SiteUserData)
    private siteUserDataRepository: typeof SiteUserData,
  ) {}

  async authRedirect(res: Response, code: string) {
    try {
      const formData = new URLSearchParams({
        client_id: process.env.DSCLIENT_ID,
        client_secret: process.env.DSCLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.SERVER_URL}:${process.env.PORT}/auth/discord/redirect`,
      });

      const response = await axios.post(
        'https://discord.com/api/oauth2/token',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, refresh_token } = response.data;

      const { data: userServerResponse } = await axios.get(
        `https://discord.com/api/users/@me/guilds/${process.env.DS_SERVER_ID}/member`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const authData = new SiteUserData();
      authData.nickname = userServerResponse.nick.toLowerCase();
      authData.discord_refresh_token = refresh_token;
      authData.is_discord_auth = true;
      authData.save();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    } finally {
      res.redirect(`${process.env.CLIENT_URL}/#/profile`);
    }
  }

  async getUser(nickname: string) {
    // сначала получать токен из бд по нику и делать запрос
    //   const { data: userServerResponse } = await axios.get(
    //     `https://discord.com/api/users/@me/guilds/${process.env.DS_SERVER_ID}/member`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     },
    //   );
    // потом сделать получение юзера и обновление токена в бд
  }

  private async getNewTokensByRefresh(refresh_token: string) {
    const formData = new URLSearchParams({
      client_id: process.env.DSCLIENT_ID,
      client_secret: process.env.DSCLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token,
    });

    const { data: response }: any = await axios.post(
      'https://discord.com/api/oauth2/token',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return {
      refresh_token: response.refresh_token,
      access_token: response.access_token,
    };
  }
}
