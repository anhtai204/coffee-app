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

    @ManyToOne(() => UserEntity, user => user.rates, { eager: true })
    @JoinColumn({ name: 'id_user' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, product => product.rates, { eager: true })
    @JoinColumn({ name: 'id_product' })
    product: ProductEntity;
    
}
