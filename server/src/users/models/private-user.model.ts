import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'AUTH' })
export class PrivateUser extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  NICKNAME: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  LOWERCASENICKNAME: string;

  @Column({ type: DataType.STRING, allowNull: false })
  HASH: string;

  @Column({ type: DataType.STRING, allowNull: false })
  IP: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  REGDATE: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  UUID: string;

  @Column({ type: DataType.STRING, allowNull: false })
  PREMIUMUUID: string;
}
