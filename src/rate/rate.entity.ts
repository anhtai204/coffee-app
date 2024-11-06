import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/users/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("rate")
export class RateEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_rate: number;

    @Column()
    soLuongSao: number;

    @Column()
    comment: string;

    // @ManyToOne(() => UserEntity, user => user.rates, { eager: true })
    // @JoinColumn({ name: 'id_user' })
    // user: UserEntity;

    // @ManyToOne(() => ProductEntity, product => product.rates, { eager: true })
    // @JoinColumn({ name: 'id_product' })
    // product: ProductEntity;

     // Lưu trực tiếp id_user
     @Column()
     id_user: number;
 
     // Lưu trực tiếp id_product
     @Column()
     id_product: number;
 
     // Liên kết với UserEntity, không eager nữa, chỉ dùng khi cần
     @ManyToOne(() => UserEntity, user => user.rates)
     @JoinColumn({ name: 'id_user' })
     user: UserEntity;
 
     // Liên kết với ProductEntity, không eager nữa, chỉ dùng khi cần
     @ManyToOne(() => ProductEntity, product => product.rates)
     @JoinColumn({ name: 'id_product' })
     product: ProductEntity;
    
}
