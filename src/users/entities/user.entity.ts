import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../auth/roles/role.enum";
import { Exclude } from "class-transformer";

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
}
