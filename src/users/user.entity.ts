import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { RateEntity } from "src/rate/rate.entity";
// import { RateEntity } from "src/rate/rate.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    // @IsInt()
    id_role: number;

    @OneToMany(() => RateEntity, rate => rate.user)
    rates: RateEntity[];
    
}

