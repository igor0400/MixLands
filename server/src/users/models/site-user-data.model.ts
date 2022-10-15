import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'site_users_data' })
export class SiteUserData extends Model<SiteUserData> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  nickname: string;

  @Column({ type: DataType.STRING, allowNull: true })
  bio?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lor?: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  liked?: number;
}
