import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    releaseDate: Date;

    @Column()
    poster: string;

    @Column()
    screenshots: string[];

    @Column()
    addDate: Date;

    @Column()
    addedBy: number;
}