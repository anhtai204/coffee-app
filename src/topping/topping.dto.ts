import { Expose } from 'class-transformer';

export class ToppipngDto {
    @Expose()
    id_topping?: number;

    @Expose()
    topping_name?: string;

    @Expose()
    gia_topping?: number;
}