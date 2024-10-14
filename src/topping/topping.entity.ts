import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { ProductEntity } from "src/product/product.entity";
import { ProductToppingEntity } from "src/product_topping/product_topping.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

    @Entity("topping")
    export class ToppingEntity extends BaseEntity {
        @PrimaryGeneratedColumn()
        id_topping: number;

        @Column()
        topping_name: string;

        @Column()
        giaTopping: number;

        // @OneToMany(() => ProductEntity, product => product.topping)
        // products: ProductEntity[]; 


        @OneToMany(() => ProductToppingEntity, (productTopping) => productTopping.topping)
        productToppings: ProductToppingEntity[];
    }
    


