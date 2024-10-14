import { ProductEntity } from 'src/product/product.entity';
import { ToppingEntity } from 'src/topping/topping.entity';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity('product_topping')
export class ProductToppingEntity {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @PrimaryColumn({ name: 'topping_id' })
  toppingId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productToppings)
  product: ProductEntity;

  @ManyToOne(() => ToppingEntity, (topping) => topping.productToppings)
  topping: ToppingEntity;
}
