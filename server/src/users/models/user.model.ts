import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'AUTH' })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  NICKNAME: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  LOWERCASENICKNAME: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  REGDATE: number;
}
