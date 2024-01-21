import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

//TODO
//REPLACE NULLABLES WITH SOMETHING (CONDITIONAL NULLABLE IDK)
//Заменить ? на что-нибудь другое
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username?: string;

    @Column()
    password?: string;
}
