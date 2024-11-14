import { KhuyenMaiEntity } from 'src/khuyenmai/khuyenmai.entity';
import { PhuongThucThanhToanEntity } from 'src/phuongthucthanhtoan/phuongthucthanhtoan.entity';
import { ProductEntity } from 'src/product/product.entity';
// import { TuyChinhEntity } from 'src/tuychinh/tuychinh.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';



@Entity('donhang')
export class DonHangEntity {
    @PrimaryGeneratedColumn()
    id_donHang: number;

    @Column()
    id_user: number;  // Trường id_user để lưu ID người dùng

    @Column()
    id_product: number;

    @Column()
    soLuong: number;

    @Column()
    tuyChinh: String;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'id_user' })  // Tạo khóa ngoại cho trường id_user
    user: UserEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'id_product' })
    product: ProductEntity;

    @ManyToOne(() => KhuyenMaiEntity, { nullable: true })
    @JoinColumn({ name: 'id_khuyenMai' })
    khuyenMai: KhuyenMaiEntity;

    @ManyToOne(() => PhuongThucThanhToanEntity, {nullable: true})
    @JoinColumn({ name: 'id_phuong_thuc_thanh_toan' })
    phuongThucThanhToan: PhuongThucThanhToanEntity;

    @Column()
    id_phuong_thuc_thanh_toan: number;

    @Column()
    status: string;

    @Column({ nullable: true })
    ghiChu: string;

    @Column()
    giaDonHang: number;

    @Column()
    diaChi: string;


    // @OneToOne(() => TuyChinhEntity, (tuyChinh) => tuyChinh.donHang)
    // tuyChinh: TuyChinhEntity;

}

