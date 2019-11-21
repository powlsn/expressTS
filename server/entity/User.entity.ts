import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Photo } from './Photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToMany(type => Photo, photo => photo.user, { eager: true, cascade: true })
  photos: Photo[]
}
