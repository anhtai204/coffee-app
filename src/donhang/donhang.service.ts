import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { DonHangEntity } from "./donhang.entity";

@Injectable()
export class DonHangService {
    constructor(
        @InjectRepository(DonHangEntity) private readonly donHangRepository: Repository<DonHangEntity>
    ){}

    async save(donHang: DonHangEntity): Promise<DonHangEntity>{
        const saveDonHang = await this.donHangRepository.save(donHang);
        return saveDonHang;
    }


    // Phương thức lấy id_donHang mới nhất
    // async getLatestDonHangId(): Promise<number> {
    //     const latestDonHang = await this.donHangRepository
    //         .createQueryBuilder('donhang')
    //         .select('donhang.id_donHang')
    //         .orderBy('donhang.id_donHang', 'DESC')
    //         .getOne();

    //     return latestDonHang ? latestDonHang.id_donHang : null;
    // }


    async getDonHang(): Promise<DonHangEntity[]>{
        const donHang = await this.donHangRepository.find();
        return donHang;
    }

    async getDonHangById(id_donHang: number): Promise<DonHangEntity>{
        const donHang = await this.donHangRepository.findOne({
            where: {
                id_donHang: id_donHang
            }
        });
        return donHang;
    } 

    async updateDonHang(id_donHang: number, update_donHang: DonHangEntity): Promise<DonHangEntity> {
        try {
            const donHang = await this.donHangRepository.findOne({
                where: {
                    id_donHang: id_donHang,
                },
            });

            donHang.soLuong = update_donHang.soLuong;
            donHang.id_phuong_thuc_thanh_toan = update_donHang.id_phuong_thuc_thanh_toan;
            donHang.status = update_donHang.status;
            donHang.giaDonHang = update_donHang.giaDonHang;
            donHang.diaChi = update_donHang.diaChi;

            await this.donHangRepository.save(donHang);
            return donHang;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi sửa đơn hàng:', error);
            return null;
        }
    }

    async getDonHangByUserId(id_user: number): Promise<DonHangEntity[]>{
        const donHangs = await this.donHangRepository.find({
            where: {
                id_user: id_user
            }
        });
        return donHangs;
    }


}