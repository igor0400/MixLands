import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users_posts' })
export class UserPost extends Model<UserPost> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  author: string;

  @Column({ type: DataType.STRING })
  date: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;
}
