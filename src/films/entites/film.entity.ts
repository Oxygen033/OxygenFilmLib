import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
    poster?: string;

    @Column("varchar", {array: true, nullable: true})
    screenshots?: string[];

    @Column()
    addDate: Date;

    @Column()
    addedBy: number;
}