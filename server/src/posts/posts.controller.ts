import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:nickname')
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() data: CreatePostDto,
    @UploadedFile() image,
    @Param('nickname') nickname: string,
  ) {
    return this.postService.create(data, image, nickname);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
