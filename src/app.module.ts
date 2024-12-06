import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { DataSource } from 'typeorm';
import { HttpModule } from '@nestjs/axios';
import { TheLoaiEntity } from './theloai/theloai.entity';
import { TheLoaiModule } from './theloai/theloai.module';
import { ToppingModule } from './topping/topping.module';
import { ToppingEntity } from './topping/topping.entity';
import { ProductEntity } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { ProductToppingEntity } from './product_topping/product_topping.entity';
import { RateEntity } from './rate/rate.entity';
import { RateModule } from './rate/rate.module';
import { ProductToppingModule } from './product_topping/product_topping.module';
import { KhuyenMaiModule } from './khuyenmai/khuyenmai.module';
import { KhuyenMaiEntity } from './khuyenmai/khuyenmai.entity';
import { PhuongThucThanhToanEntity } from './phuongthucthanhtoan/phuongthucthanhtoan.entity';
import { DonHangEntity } from './donhang/donhang.entity';
import { PhuongThucThanhToanModule } from './phuongthucthanhtoan/phuongthucthanhtoan.module';
import { DonHangModule } from './donhang/donhang.module';
import { DiaChiEntity } from './diachi/diachi.entity';
import { DiaChiModule } from './diachi/diachi.module';
// import { TuyChinhEntity } from './tuychinh/tuychinh.entity';
// import { TuyChinhModule } from './tuychinh/tuychinh.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: '0.0.0.0',
        port: 3306,
        username: 'root',
        password: '22042004',
        database: 'coffee_app',
        entities: [UserEntity, TheLoaiEntity, ToppingEntity, KhuyenMaiEntity, ProductEntity, ProductToppingEntity, 
          RateEntity, PhuongThucThanhToanEntity, DonHangEntity, DiaChiEntity],
        synchronize: false,
      }), 
      HttpModule,
      UsersModule,
      TheLoaiModule,
      ToppingModule,
      KhuyenMaiModule,
      ProductModule,
      ProductToppingModule,
      RateModule,
      PhuongThucThanhToanModule,
      DonHangModule,
      DiaChiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}