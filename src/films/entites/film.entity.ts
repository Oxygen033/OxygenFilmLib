import { User } from "../../users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Film
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title?: string;

    @Column({nullable: true})
    description?: string;

    @Column({nullable: true})
    releaseDate?: Date;

    @Column({nullable: true})
    country?: string;

    @Column()
    director: string;

    @Column("varchar", {array: true, nullable: true})
    assistDirector?: string[];

    @Column("varchar", {array: true, nullable: true})
    cast?: string[];

    @Column("varchar", {array: true, nullable: true})
    producers?: string[];

    @Column("varchar", {array: true, nullable: true})
    execProducers?: string[];

    @Column("varchar", {array: true, nullable: true})
    writers?: string[];

    @Column("varchar", {array: true, nullable: true})
    artDirection?: string[];

    @Column("varchar", {array: true, nullable: true})
    composers?: string[];

    @Column("varchar", {array: true, nullable: true})
    songs?: string[];

    @Column("varchar", {array: true, nullable: true})
    sound?: string[];

    @Column("varchar", {array: true, nullable: true})
    genres?: string[];

    @Column({nullable: true})
    poster?: string;

    @Column("varchar", {array: true, nullable: true})
    screenshots?: string[];

    @Column()
    addDate: Date;

    @Column()
    addedBy: number;
}