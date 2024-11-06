import { forwardRef } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { KhuyenMaiEntity } from "src/khuyenmai/khuyenmai.entity";
import { ProductToppingEntity } from "src/product_topping/product_topping.entity";
import { RateEntity } from "src/rate/rate.entity";
import { TheLoaiEntity } from "src/theloai/theloai.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("product")
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_product: number;

    @Column()
    tenSanPham: string;

    @Column()
    giaSanPham: number;

    @Column()
    khuyenmai_gia: number;


    @ManyToOne(() => TheLoaiEntity, theLoai => theLoai.products, { eager: true }) // Chỉnh sửa
    @JoinColumn({ name: 'id_theLoai' }) // Khóa ngoại
    theLoai: TheLoaiEntity;

    @ManyToOne(() => KhuyenMaiEntity, khuyenMai => khuyenMai.product, { eager: true })
    @JoinColumn({ name: 'id_khuyen_mai' }) 
    khuyenMai: KhuyenMaiEntity;


    @OneToMany(() => ProductToppingEntity, (productTopping) => productTopping.product)
    productToppings: ProductToppingEntity[];

    @OneToMany(() => RateEntity, rate => rate.product)
    rates: RateEntity[];
}

