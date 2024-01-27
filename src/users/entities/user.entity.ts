import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Unique } from "typeorm";
import { Role } from "../../auth/roles/role.enum";
import { Exclude } from "class-transformer";
import { Film } from "../../films/entites/film.entity";

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
    @JoinTable()
    likedFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedHalfOneFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedOneFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedOneAndHalfFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedTwoFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedTwoAndHalfFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedThreeFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedThreeAndHalfFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedFourFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedFourAndHalfFilms: Film[];

    @ManyToMany(() => Film)
    @JoinTable()
    ratedFiveFilms: Film[];
}