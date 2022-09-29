import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'AUTH' })
export class User extends Model {
  @Column
  NICKNAME: string;

  @Column
  LOWERCASENICKNAME: string;

  @Column
  HASH: string;

  @Column
  IP: string;

  @Column
  REGDATE: number;

  @Column
  UUID: string;
}
