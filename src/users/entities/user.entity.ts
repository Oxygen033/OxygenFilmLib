import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable, Unique } from "typeorm";
import { Role } from "../../auth/roles/role.enum";
import { Exclude } from "class-transformer";
import { Film } from "../../films/entites/film.entity";
import { FilmRating } from "../../films/entites/film-rating.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username?: string;

    @Exclude()
    @Column()
    password?: string;

    @Column({type: "enum", enum: Role, default: Role.User})
    roles: Role[];

    @ManyToMany(() => Film)
    @JoinTable({name: 'likes'})
    likedFilms: Film[];

    @OneToMany('FilmRating', 'user')
    filmsRatings: FilmRating[];
}