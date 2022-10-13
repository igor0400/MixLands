import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

      const nickname = userServerResponse.nick.toLowerCase();

      const authData = await this.siteUserDataRepository.findOne({
        where: { nickname },
        include: { all: true },
      });

      const savedAuthData = authData || new SiteUserData();
      savedAuthData.nickname = nickname;
      savedAuthData.discord_refresh_token = refresh_token;
      savedAuthData.is_discord_auth = true;
      savedAuthData.is_discord_repeat_auth = false;
      savedAuthData.save();
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    } finally {
      res.redirect(`${process.env.CLIENT_URL}/#/profile`);
    }
  }

  async getUser(nickname: string) {
    try {
      const userSession = await this.siteUserDataRepository.findOne({
        where: { nickname },
        include: { all: true },
      });

      const { discord_refresh_token } = userSession;

      const { new_refresh_token, new_access_token } =
        await this.getNewTokensByRefresh(discord_refresh_token);

      const { data: userServerResponse } = await axios.get(
        `https://discord.com/api/users/@me/guilds/${process.env.DS_SERVER_ID}/member`,
        {
          headers: {
            Authorization: `Bearer ${new_access_token}`,
          },
        },
      );

      userSession.discord_refresh_token = new_refresh_token;
      userSession.save();

      return userServerResponse;
    } catch (e) {
      const userSession = await this.siteUserDataRepository.findOne({
        where: { nickname },
        include: { all: true },
      });

      if (userSession) {
        userSession.is_discord_repeat_auth = true;
        userSession.save();
      }

      console.log(e);
      throw new BadRequestException();
    }
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
      new_refresh_token: response.refresh_token,
      new_access_token: response.access_token,
    };
  }
}
