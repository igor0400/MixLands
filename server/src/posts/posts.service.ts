import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './models/user-post.model';
import { FilesService } from '../files/files.service';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';

function getDate() {
  const now = new Date().toLocaleString('ru', {
    second: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return now.replace(',', '');
}

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(UserPost)
    private userPostRepository: typeof UserPost,
    private fileService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: any, nickname: string) {
    const fileName = await this.fileService.createFile(image);
    const post = new UserPost();

    post.content = dto.content;
    post.date = getDate();
    post.author = nickname;
    post.image = fileName;
    post.id = uuid();
    post.save();

    return post;
  }

  async getUserPosts(nickname: string) {
    const posts = await this.userPostRepository.findAll({
      where: { author: nickname },
      include: { all: true },
    });

    return posts;
  }

  async getAllPosts() {
    const posts = await this.userPostRepository.findAll({
      include: { all: true },
    });

    return posts;
  }
}
