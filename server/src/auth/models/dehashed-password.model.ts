import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'dehashed_passwords' })
export class DehashedPassword extends Model<DehashedPassword> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  nickname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
