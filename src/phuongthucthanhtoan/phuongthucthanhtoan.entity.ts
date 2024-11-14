import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { ProductEntity } from "src/product/product.entity";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("phuongthucthanhtoan")
export class PhuongThucThanhToanEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_phuongThucThanhToan: number;

    @Column()
    hinhThucThanhToan: string;

}

