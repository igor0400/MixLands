import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'AUTH' })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  NICKNAME: string;

  @Column({ type: DataType.STRING, allowNull: false })
  LOWERCASENICKNAME: string;

  @Column({ type: DataType.STRING, allowNull: false })
  HASH: string;

  @Column({ type: DataType.STRING, allowNull: false })
  IP: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  REGDATE: number;

  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
  UUID: string;

  @Column({ type: DataType.STRING, allowNull: false })
  PREMIUMUUID: string;
}
