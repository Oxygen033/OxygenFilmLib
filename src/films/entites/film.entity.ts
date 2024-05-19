import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Relation,
  OneToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { FilmRating } from './film-rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { IsDate } from 'class-validator';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @IsDate()
  releaseDate?: Date;

  @Column({ nullable: true })
  country?: string;

  @Column()
  director: string;

  @Column('simple-array', { nullable: true })
  assistDirector?: string[];

  @Column('simple-array', { nullable: true })
  cast?: string[];

  @Column('simple-array', { nullable: true })
  producers?: string[];

  @Column('simple-array', { nullable: true })
  execProducers?: string[];

  @Column('simple-array', { nullable: true })
  writers?: string[];

  @Column('simple-array', { nullable: true })
  artDirection?: string[];

  @Column('simple-array', { nullable: true })
  composers?: string[];

  @Column('simple-array', { nullable: true })
  songs?: string[];

  @Column('simple-array', { nullable: true })
  sound?: string[];

  @Column('simple-array', { nullable: true })
  genres?: string[];

  @Column({ nullable: true })
  poster?: string;

  @Column('simple-array', { nullable: true })
  screenshots?: string[];

  @Column()
  addDate: Date;

  @Column()
  addedBy: number;

  @OneToMany('FilmRating', 'film')
  ratings: FilmRating[];

  @Column({ type: 'float', nullable: true })
  overallRating?: number;

  @OneToMany('Review', 'film')
  reviews: Review[];

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  watchesCount: number;
}
