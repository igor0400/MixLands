import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'playtime' })
export class UserHoursRolePlay extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  time: number;
}
