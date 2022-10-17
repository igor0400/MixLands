import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PrivateUser } from './models/private-user.model';
import { AuthModule } from '../auth/auth.module';
import { RefreshToken } from 'src/auth/models/refresh-token.model';
import { UserHoursRolePlay } from './models/user-hours-roleplay.model';
import { UserHoursCreative } from './models/user-hours-creative.model';
import { SiteUserData } from './models/site-user-data.model';
import { ServerInfoService } from 'src/server-info/server-info.service';
import { PostsService } from 'src/posts/posts.service';
import { UserPost } from 'src/posts/models/user-post.model';
import { FilesService } from 'src/files/files.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ServerInfoService, PostsService, FilesService],
  imports: [
    SequelizeModule.forFeature([
      User,
      PrivateUser,
      UserHoursCreative,
      UserHoursRolePlay,
      SiteUserData,
      RefreshToken,
      UserPost,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
