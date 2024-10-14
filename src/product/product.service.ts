import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
    ){}

    async save(khuyenMai: ProductEntity): Promise<ProductEntity>{
        const saveProduct = await this.productRepository.save(khuyenMai);
        console.log(saveProduct);
        return saveProduct;
    }

    async getProducts(): Promise<ProductEntity[]>{
        const products = await this.productRepository.find()
        return products;
    }
    


    // ca phe
    async getProductCoffee(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "CaPhe"
                }
            }
        });
        return products;
    }

    async getCoffeeFilterGia(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "CaPhe"
                }
            },
            order: {
                giaSanPham: 'ASC' 
            }
        });
        return products;
    }

    async getCoffeeFilterKhuyenMai(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "CaPhe"
                }
            },
            order: {
                khuyenmai_gia: 'DESC' 
            }
        });
        return products;
    }

    async getCoffeeFilterRate(): Promise<ProductEntity[]> {
        const products = await this.productRepository.createQueryBuilder('p')
            .leftJoinAndSelect('p.rates', 'r') // Kết nối với bảng rate
            .leftJoin('p.theLoai', 'tl') // Kết nối với bảng theloai
            .leftJoin('p.khuyenmai', 'km')
            .where('tl.ten_the_loai = :tenTheLoai', { tenTheLoai: 'CaPhe' }) // Lọc theo ten_the_loai
            .select('p.id_product AS id_product')
            .addSelect('p.tenSanPham AS tenSanPham')
            .addSelect('p.giaSanPham AS giaSanPham')
            .addSelect('p.khuyenmai_gia AS khuyenmai_gia')
            .addSelect('p.khuyenmai_gia AS khuyenmai_gia')
            .addSelect('AVG(r.soLuongSao) AS average_rating')
            .addSelect('tl.ten_the_loai AS ten_the_loai') // Thêm trường ten_the_loai
            .groupBy('p.id_product, p.tenSanPham, tl.ten_the_loai') // Cập nhật groupBy
            .orderBy('average_rating', 'DESC')
            .getRawMany();

        return products; 
    }


    // tra sua
    async getProductTraSua(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "TraSua"
                }
            }
        });
        return products;
    }

    async getTraSuaFilterGia(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "TraSua"
                }
            },
            order: {
                giaSanPham: 'ASC' 
            }
        });
        return products;
    }

    async getTraSuaFilterKhuyenMai(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "TraSua"
                }
            },
            order: {
                khuyenmai_gia: 'DESC' 
            }
        });
        return products;
    }

    async getTraSuaFilterRate(): Promise<ProductEntity[]> {
        const products = await this.productRepository.createQueryBuilder('p')
            .leftJoinAndSelect('p.rates', 'r') // Kết nối với bảng rate
            .innerJoin('p.theLoai', 'tl') // Kết nối với bảng theloai
            .where('tl.ten_the_loai = :tenTheLoai', { tenTheLoai: 'TraSua' }) // Lọc theo ten_the_loai
            .select('p.id_product AS p_id_product')
            .addSelect('p.tenSanPham AS p_tenSanPham')
            .addSelect('AVG(r.soLuongSao) AS average_rating')
            .addSelect('tl.ten_the_loai AS p_ten_the_loai') // Thêm trường ten_the_loai
            .groupBy('p.id_product, p.tenSanPham, tl.ten_the_loai') // Cập nhật groupBy
            .orderBy('average_rating', 'DESC')
            .getRawMany();

        return products; 
    }

    
    // sinh to
    async getProductSinhTo(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "SinhTo"
                }
            }
        });
        return products;
    }

    async getSinhToFilterGia(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "SinhTo"
                }
            },
            order: {
                giaSanPham: 'ASC' 
            }
        });
        return products;
    }

    async getSinhToFilterKhuyenMai(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: ["theLoai"],
            where: {
                theLoai: {
                    ten_the_loai: "SinhTo"
                }
            },
            order: {
                khuyenmai_gia: 'DESC' 
            }
        });
        return products;
    }

    async getSinhToFilterRate(): Promise<ProductEntity[]> {
        const products = await this.productRepository.createQueryBuilder('p')
            .leftJoinAndSelect('p.rates', 'r') // Kết nối với bảng rate
            .innerJoin('p.theLoai', 'tl') // Kết nối với bảng theloai
            .where('tl.ten_the_loai = :tenTheLoai', { tenTheLoai: 'SinhTo' }) // Lọc theo ten_the_loai
            .select('p.id_product AS p_id_product')
            .addSelect('p.tenSanPham AS p_tenSanPham')
            .addSelect('AVG(r.soLuongSao) AS average_rating')
            .addSelect('tl.ten_the_loai AS p_ten_the_loai') // Thêm trường ten_the_loai
            .groupBy('p.id_product, p.tenSanPham, tl.ten_the_loai') // Cập nhật groupBy
            .orderBy('average_rating', 'DESC')
            .getRawMany();

        return products; 
    }
}