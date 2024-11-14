// import { DonHangEntity } from "src/donhang/donhang.entity";
// import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity('tuychinh')
// export class TuyChinhEntity {
//   @PrimaryGeneratedColumn()
//   id_tuyChinh: number;

//   @Column()
//   yeuCauTuyChinh: string;

//   @Column() // Thêm cột id_don_hang để ánh xạ khóa ngoại
//   id_don_hang: number;

//   @OneToOne(() => DonHangEntity, (donHang) => donHang.tuyChinh)
//   @JoinColumn({ name: 'id_don_hang' }) // Khóa ngoại ánh xạ tới DonHangEntity
//   donHang: DonHangEntity;
// }