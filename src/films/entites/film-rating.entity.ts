import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Film } from './film.entity';

@Entity()
@Unique(['user', 'film'])
export class FilmRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  rating: number;

  @ManyToOne(() => User, (user) => user.filmsRatings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne('Film', 'ratings', { onDelete: 'CASCADE' })
  film: Film;
}