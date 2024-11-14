import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { ProductEntity } from "src/product/product.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("khuyenmai")
export class KhuyenMaiEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_khuyen_mai: number;

    @Column({ type: 'float' })
    phanTramKhuyenMai: number;

    @Column()
    donHangToiThieu: number;

    @OneToOne(() => ProductEntity, product => product.khuyenMai)
    product: ProductEntity;
}

