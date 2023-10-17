import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StorageImg {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nameUser: string;

  @Column()
  uuidImg: string;

  @Column()
  fieldname: string;
}
