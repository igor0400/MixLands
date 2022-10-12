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

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  is_discord_auth?: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  discord_refresh_token?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  bio?: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  liked?: number;
}
