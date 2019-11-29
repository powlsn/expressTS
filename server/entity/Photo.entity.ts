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

  constructor(data?: Photo) {
    if (data) {
      this.id = data.id;
      this.imageUrl = data.imageUrl;
      this.user = data.user;
    }
  }
}
