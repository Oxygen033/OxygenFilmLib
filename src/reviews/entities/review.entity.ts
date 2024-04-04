import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Film } from "../../films/entites/film.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne('Film', 'reviews')
    film: Film;

    @ManyToOne(() => User, (user) => user.filmsReviews)
    user: User;

    @Column()
    header: string;

    @Column()
    text: string;
}
