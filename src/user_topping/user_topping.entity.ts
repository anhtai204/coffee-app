// import { ToppingEntity } from 'src/topping/topping.entity';
// import { UserEntity } from 'src/users/user.entity';
// import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

// @Entity('user_topping')
// export class UserToppingEntity {
//   @PrimaryColumn({ name: 'user_id' })
//   userId: number;

//   @PrimaryColumn({ name: 'topping_id' })
//   toppingId: number;

//   @ManyToOne(() => UserEntity, (user) => user.userToppings)
//   @JoinColumn({ name: 'user_id' })
//   user: UserEntity;

// //   @ManyToOne(() => ToppingEntity, (topping) => topping.userToppings)
// //   @JoinColumn({ name: 'topping_id' })
// //   topping: ToppingEntity;
// }
