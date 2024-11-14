import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/users/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("diachi")
export class DiaChiEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_dia_chi: number;

    @Column()
    dia_chi: string;

    @Column()
    id_user: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'id_user' })  // Tạo khóa ngoại cho trường id_user
    user: UserEntity;

}

