import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../auth/roles/role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username?: string;

    @Column()
    password?: string;

    @Column({type: "enum", enum: Role, default: Role.User})
    roles: Role[];
}
