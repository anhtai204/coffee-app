import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { ProductToppingEntity } from "src/product_topping/product_topping.entity";
import { RateEntity } from "src/rate/rate.entity";
// import { UserToppingEntity } from "src/user_topping/user_topping.entity";
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


    // @OneToMany(() => UserToppingEntity, (userTopping) => userTopping.user)
    // userToppings: UserToppingEntity[];

    // Quan hệ với ProductToppingEntity
    // @OneToMany(() => ProductToppingEntity, (productTopping) => productTopping.user)
    // productToppings: ProductToppingEntity[];
    
}

