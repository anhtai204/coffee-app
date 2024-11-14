import { DonHangEntity } from 'src/donhang/donhang.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ToppingEntity } from 'src/topping/topping.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('product_topping')
export class ProductToppingEntity {
  // @PrimaryColumn({ name: 'product_id' })
  // productId: number;

  @PrimaryColumn()
  id_product_topping: number;

  @PrimaryColumn()
  id_don_hang: number;

  @PrimaryColumn()
  topping_id: number;



  // @PrimaryColumn({ name: 'user_id' })
  // userId: number;

  // @ManyToOne(() => ProductEntity, (product) => product.productToppings)
  // @JoinColumn({ name: 'product_id' }) // Ánh xạ khóa ngoại với cột product_id
  // product: ProductEntity;

  @ManyToOne(() => ToppingEntity, (topping) => topping.productToppings)
  @JoinColumn({ name: 'topping_id' }) // Ánh xạ khóa ngoại với cột topping_id
  topping: ToppingEntity;

   // Quan hệ với UserEntity
  //  @ManyToOne(() => UserEntity, (user) => user.productToppings)
  //  @JoinColumn({ name: 'user_id' }) // Ánh xạ user_id tới id_user trong UserEntity
  //  user: UserEntity;

  @ManyToOne(() => DonHangEntity, (donHang) => donHang.id_donHang)
  @JoinColumn({ name: 'id_don_hang' })  // Khóa ngoại ánh xạ tới DonHangEntity
  donHang: DonHangEntity;
}
