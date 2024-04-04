import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable, Unique } from "typeorm";
import { Role } from "../../auth/roles/role.enum";
import { Exclude, classToPlain } from "class-transformer";
import { Film } from "../../films/entites/film.entity";
import { FilmRating } from "../../films/entites/film-rating.entity";
import { Review } from "src/reviews/entities/review.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username?: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password?: string;

    @Column({type: "enum", enum: Role, default: Role.User})
    @Exclude({ toPlainOnly: true })
    roles: Role[];

    @ManyToMany(() => Film)
    @JoinTable({name: 'likes'})
    likedFilms: Film[];

    @OneToMany('FilmRating', 'user')
    filmsRatings: FilmRating[];

    @OneToMany('Review', 'user')
    filmsReviews: Review[];

    toJSON() {
        return classToPlain(this);
    }
}