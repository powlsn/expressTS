import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(
    type => User,
    user => user.photos,
    { nullable: false, onDelete: 'CASCADE' },
  )
  user: User;
}
