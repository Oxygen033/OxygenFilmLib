import { User } from "../../users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";

export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    creationDate: Date;

    @OneToOne(() => User)
    @JoinColumn()
    creator: User;
}