import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { ProductEntity } from "src/product/product.entity";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("theloai")
export class TheLoaiEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_theLoai: number;

    @Column()
    ten_the_loai: string;


    @OneToMany(() => ProductEntity, product => product.theLoai) // Chỉnh sửa thành OneToMany
    products: ProductEntity[]; // 1 thể loại có thể có nhiều sản phẩm
}

