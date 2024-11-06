import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository  } from "typeorm";
import { plainToInstance } from "class-transformer";
import { ProductEntity } from "./product.entity";
import { RateEntity } from "src/rate/rate.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(RateEntity)
        private readonly rateRepository: Repository<RateEntity>,
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

    async getProductCoffee(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.theLoai', 'theLoai')
            .leftJoinAndSelect('product.khuyenMai', 'khuyenMai')
            .leftJoin('product.rates', 'rate') // Sử dụng leftJoin vì chúng ta sẽ tính toán AVG
            .select([
                'product.id_product AS id_product',
                'product.tenSanPham AS tenSanPham',
                'product.giaSanPham AS giaSanPham',
                'product.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoai_id_theLoai',
                'theLoai.ten_the_loai AS theLoai_ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'CaPhe' })
            .groupBy('product.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('theLoai.ten_the_loai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .addGroupBy('khuyenMai.phanTramKhuyenMai')
            .addGroupBy('khuyenMai.donHangToiThieu')
            .getRawMany();

        // Ánh xạ kết quả thành cấu trúc mong muốn
        const productsWithAverageStar = products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoai_id_theLoai,
                ten_the_loai: product.theLoai_ten_the_loai,
            },
            khuyenMai: {
                id_khuyen_mai: product.khuyenMai_id_khuyen_mai,
                phanTramKhuyenMai: product.khuyenMai_phanTramKhuyenMai,
                donHangToiThieu: product.khuyenMai_donHangToiThieu,
            },
            average_star: parseFloat(product.average_star)
        }));

        return productsWithAverageStar;
    }

    async getCoffeeFilterGia(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'CaPhe' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star' // Calculate average star
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.giaSanPham', 'ASC')
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null, // Ensure khuyenMai is null if there's no associated promotion
            average_star: parseFloat(product.average_star) || 0 // Ensure average_star is a float
        }));
    }
    
    async getCoffeeFilterKhuyenMai(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'CaPhe' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star' // Calculate average star
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.khuyenmai_gia', 'DESC') // Ensure products are ordered by promotion price
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null, // Ensure khuyenMai is null if there's no associated promotion
            average_star: parseFloat(product.average_star) || 0 // Ensure average_star is a float
        }));
    }
    

    // async getCoffeeFilterRate(): Promise<any[]> { // Sử dụng any[] hoặc định nghĩa DTO
    //     console.log("Fetching coffee products with average ratings...");
    //     const products = await this.productRepository.createQueryBuilder('p')
    //         .leftJoinAndSelect('p.rates', 'r') // Kết nối với bảng rate
    //         .leftJoin('p.theLoai', 'tl') // Kết nối với bảng theloai
    //         .leftJoin('p.khuyenMai', 'km') // Sử dụng tên đúng 'khuyenMai'
    //         .where('tl.ten_the_loai = :tenTheLoai', { tenTheLoai: 'CaPhe' }) // Lọc theo ten_the_loai
    //         .select([
    //             'p.id_product AS id_product',
    //             'tl.ten_the_loai AS ten_the_loai',
    //             'p.tenSanPham AS tenSanPham',
    //             'p.giaSanPham AS giaSanPham',
    //             'p.khuyenmai_gia AS khuyenmai_gia',
    //             'AVG(r.soLuongSao) AS average_rating',
    //         ])
    //         .groupBy('p.id_product')
    //         .addGroupBy('tl.ten_the_loai')
    //         .addGroupBy('p.tenSanPham')
    //         .addGroupBy('p.giaSanPham')
    //         .addGroupBy('p.khuyenmai_gia')
    //         .orderBy('average_rating', 'DESC')
    //         .getRawMany();

    //     // Chuyển đổi average_rating từ string thành number
    //     const formattedProducts = products.map(product => ({
    //         ...product,
    //         average_rating: parseFloat(product.average_rating)
    //     }));

    //     return formattedProducts;
    // }

    async getCoffeeFilterRate(): Promise<any[]> {
        console.log("Fetching coffee products with average ratings...");
    
        // Truy vấn để lấy thông tin sản phẩm và tính trung bình số sao
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.theLoai', 'theLoai')
            .leftJoinAndSelect('product.khuyenMai', 'khuyenMai')
            .leftJoin('product.rates', 'rate')
            .select([
                'product.id_product AS id_product',
                'product.tenSanPham AS tenSanPham',
                'product.giaSanPham AS giaSanPham',
                'product.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoai_id_theLoai',
                'theLoai.ten_the_loai AS theLoai_ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'CaPhe' })
            .groupBy('product.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('theLoai.ten_the_loai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .addGroupBy('khuyenMai.phanTramKhuyenMai')
            .addGroupBy('khuyenMai.donHangToiThieu')
            .orderBy('average_star', 'DESC') // Sắp xếp theo trung bình số sao (nếu cần)
            .getRawMany();
    
        // Ánh xạ kết quả thành cấu trúc mong muốn
        const formattedProducts = products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoai_id_theLoai,
                ten_the_loai: product.theLoai_ten_the_loai,
            },
            khuyenMai: {
                id_khuyen_mai: product.khuyenMai_id_khuyen_mai,
                phanTramKhuyenMai: product.khuyenMai_phanTramKhuyenMai,
                donHangToiThieu: product.khuyenMai_donHangToiThieu,
            },
            average_star: parseFloat(product.average_star)
        }));
    
        return formattedProducts;
    }
    


    // tra sua
    // async getProductTraSua(): Promise<ProductEntity[]> {
    //     const products = await this.productRepository.find({
    //         relations: ["theLoai"],
    //         where: {
    //             theLoai: {
    //                 ten_the_loai: "TraSua"
    //             }
    //         }
    //     });
    //     return products;
    // }

    async getProductTraSua(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.theLoai', 'theLoai')
            .leftJoinAndSelect('product.khuyenMai', 'khuyenMai')
            .leftJoin('product.rates', 'rate') // Sử dụng leftJoin vì chúng ta sẽ tính toán AVG
            .select([
                'product.id_product AS id_product',
                'product.tenSanPham AS tenSanPham',
                'product.giaSanPham AS giaSanPham',
                'product.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoai_id_theLoai',
                'theLoai.ten_the_loai AS theLoai_ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'TraSua' })
            .groupBy('product.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('theLoai.ten_the_loai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .addGroupBy('khuyenMai.phanTramKhuyenMai')
            .addGroupBy('khuyenMai.donHangToiThieu')
            .getRawMany();

        // Ánh xạ kết quả thành cấu trúc mong muốn
        const productsWithAverageStar = products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoai_id_theLoai,
                ten_the_loai: product.theLoai_ten_the_loai,
            },
            khuyenMai: {
                id_khuyen_mai: product.khuyenMai_id_khuyen_mai,
                phanTramKhuyenMai: product.khuyenMai_phanTramKhuyenMai,
                donHangToiThieu: product.khuyenMai_donHangToiThieu,
            },
            average_star: parseFloat(product.average_star)
        }));

        return productsWithAverageStar;
    }


    // async getTraSuaFilterGia(): Promise<ProductEntity[]> {
    //     const products = await this.productRepository.find({
    //         relations: ["theLoai"],
    //         where: {
    //             theLoai: {
    //                 ten_the_loai: "TraSua"
    //             }
    //         },
    //         order: {
    //             giaSanPham: 'ASC' 
    //         }
    //     });
    //     return products;
    // }

    async getTraSuaFilterGia(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'TraSua' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star' // Calculate average star
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.giaSanPham', 'ASC')
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null, // Ensure khuyenMai is null if there's no associated promotion
            average_star: parseFloat(product.average_star) || 0 // Ensure average_star is a float
        }));
    }




    // async getTraSuaFilterKhuyenMai(): Promise<ProductEntity[]> {
    //     const products = await this.productRepository.find({
    //         relations: ["theLoai"],
    //         where: {
    //             theLoai: {
    //                 ten_the_loai: "TraSua"
    //             }
    //         },
    //         order: {
    //             khuyenmai_gia: 'DESC' 
    //         }
    //     });
    //     return products;
    // }

    async getTraSuaFilterKhuyenMai(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'TraSua' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star' // Calculate average star
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.khuyenmai_gia', 'DESC') // Ensure products are ordered by promotion price
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null, // Ensure khuyenMai is null if there's no associated promotion
            average_star: parseFloat(product.average_star) || 0 // Ensure average_star is a float
        }));
    }


    // async getTraSuaFilterRate(): Promise<any[]> { // Sử dụng any[] hoặc định nghĩa DTO
    //     console.log("Fetching coffee products with average ratings...");
    //     const products = await this.productRepository.createQueryBuilder('p')
    //         .leftJoinAndSelect('p.rates', 'r') // Kết nối với bảng rate
    //         .leftJoin('p.theLoai', 'tl') // Kết nối với bảng theloai
    //         .leftJoin('p.khuyenMai', 'km') // Sử dụng tên đúng 'khuyenMai'
    //         .where('tl.ten_the_loai = :tenTheLoai', { tenTheLoai: 'TraSua' }) // Lọc theo ten_the_loai
    //         .select([
    //             'p.id_product AS id_product',
    //             'tl.ten_the_loai AS ten_the_loai',
    //             'p.tenSanPham AS tenSanPham',
    //             'p.giaSanPham AS giaSanPham',
    //             'p.khuyenmai_gia AS khuyenmai_gia',
    //             'AVG(r.soLuongSao) AS average_rating',
    //         ])
    //         .groupBy('p.id_product')
    //         .addGroupBy('tl.ten_the_loai')
    //         .addGroupBy('p.tenSanPham')
    //         .addGroupBy('p.giaSanPham')
    //         .addGroupBy('p.khuyenmai_gia')
    //         .orderBy('average_rating', 'DESC')
    //         .getRawMany();

    //     // Chuyển đổi average_rating từ string thành number
    //     const formattedProducts = products.map(product => ({
    //         ...product,
    //         average_rating: parseFloat(product.average_rating)
    //     }));

    //     return formattedProducts;
    // }

    async getTraSuaFilterRate(): Promise<any[]> {
        console.log("Fetching coffee products with average ratings...");
    
        // Truy vấn để lấy thông tin sản phẩm và tính trung bình số sao
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.theLoai', 'theLoai')
            .leftJoinAndSelect('product.khuyenMai', 'khuyenMai')
            .leftJoin('product.rates', 'rate')
            .select([
                'product.id_product AS id_product',
                'product.tenSanPham AS tenSanPham',
                'product.giaSanPham AS giaSanPham',
                'product.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoai_id_theLoai',
                'theLoai.ten_the_loai AS theLoai_ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'TraSua' })
            .groupBy('product.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('theLoai.ten_the_loai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .addGroupBy('khuyenMai.phanTramKhuyenMai')
            .addGroupBy('khuyenMai.donHangToiThieu')
            .orderBy('average_star', 'DESC') // Sắp xếp theo trung bình số sao (nếu cần)
            .getRawMany();
    
        // Ánh xạ kết quả thành cấu trúc mong muốn
        const formattedProducts = products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoai_id_theLoai,
                ten_the_loai: product.theLoai_ten_the_loai,
            },
            khuyenMai: {
                id_khuyen_mai: product.khuyenMai_id_khuyen_mai,
                phanTramKhuyenMai: product.khuyenMai_phanTramKhuyenMai,
                donHangToiThieu: product.khuyenMai_donHangToiThieu,
            },
            average_star: parseFloat(product.average_star)
        }));
    
        return formattedProducts;
    }

    
    // sinh to

    // async getProductSinhTo(): Promise<ProductEntity[]> {
    //     const products = await this.productRepository.find({
    //         relations: ["theLoai"],
    //         where: {
    //             theLoai: {
    //                 ten_the_loai: "SinhTo"
    //             }
    //         }
    //     });
    //     return products;
    // }


    async getProductSinhTo(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.theLoai', 'theLoai')
            .leftJoinAndSelect('product.khuyenMai', 'khuyenMai')
            .leftJoin('product.rates', 'rate') // Sử dụng leftJoin vì chúng ta sẽ tính toán AVG
            .select([
                'product.id_product AS id_product',
                'product.tenSanPham AS tenSanPham',
                'product.giaSanPham AS giaSanPham',
                'product.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoai_id_theLoai',
                'theLoai.ten_the_loai AS theLoai_ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'SinhTo' })
            .groupBy('product.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('theLoai.ten_the_loai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .addGroupBy('khuyenMai.phanTramKhuyenMai')
            .addGroupBy('khuyenMai.donHangToiThieu')
            .getRawMany();

        // Ánh xạ kết quả thành cấu trúc mong muốn
        const productsWithAverageStar = products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoai_id_theLoai,
                ten_the_loai: product.theLoai_ten_the_loai,
            },
            khuyenMai: {
                id_khuyen_mai: product.khuyenMai_id_khuyen_mai,
                phanTramKhuyenMai: product.khuyenMai_phanTramKhuyenMai,
                donHangToiThieu: product.khuyenMai_donHangToiThieu,
            },
            average_star: parseFloat(product.average_star)
        }));

        return productsWithAverageStar;
    }


    // async getSinhToFilterGia(): Promise<ProductEntity[]> {
    //     const products = await this.productRepository.find({
    //         relations: ["theLoai"],
    //         where: {
    //             theLoai: {
    //                 ten_the_loai: "SinhTo"
    //             }
    //         },
    //         order: {
    //             giaSanPham: 'ASC' 
    //         }
    //     });
    //     return products;
    // }


    async getSinhToFilterGia(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'SinhTo' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star' // Calculate average star
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.giaSanPham', 'ASC')
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null, // Ensure khuyenMai is null if there's no associated promotion
            average_star: parseFloat(product.average_star) || 0 // Ensure average_star is a float
        }));
    }



    // async getSinhToFilterKhuyenMai(): Promise<ProductEntity[]> {
    //     const products = await this.productRepository.find({
    //         relations: ["theLoai"],
    //         where: {
    //             theLoai: {
    //                 ten_the_loai: "SinhTo"
    //             }
    //         },
    //         order: {
    //             khuyenmai_gia: 'DESC' 
    //         }
    //     });
    //     return products;
    // }


    async getSinhToFilterKhuyenMai(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'SinhTo' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star' // Calculate average star
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.khuyenmai_gia', 'DESC') // Ensure products are ordered by promotion price
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null, // Ensure khuyenMai is null if there's no associated promotion
            average_star: parseFloat(product.average_star) || 0 // Ensure average_star is a float
        }));
    }


    // async getSinhToFilterRate(): Promise<any[]> { // Sử dụng any[] hoặc định nghĩa DTO
    //     console.log("Fetching coffee products with average ratings...");
    //     const products = await this.productRepository.createQueryBuilder('p')
    //         .leftJoinAndSelect('p.rates', 'r') // Kết nối với bảng rate
    //         .leftJoin('p.theLoai', 'tl') // Kết nối với bảng theloai
    //         .leftJoin('p.khuyenMai', 'km') // Sử dụng tên đúng 'khuyenMai'
    //         .where('tl.ten_the_loai = :tenTheLoai', { tenTheLoai: 'SinhTo' }) // Lọc theo ten_the_loai
    //         .select([
    //             'p.id_product AS id_product',
    //             'tl.ten_the_loai AS ten_the_loai',
    //             'p.tenSanPham AS tenSanPham',
    //             'p.giaSanPham AS giaSanPham',
    //             'p.khuyenmai_gia AS khuyenmai_gia',
    //             'AVG(r.soLuongSao) AS average_rating',
    //         ])
    //         .groupBy('p.id_product')
    //         .addGroupBy('tl.ten_the_loai')
    //         .addGroupBy('p.tenSanPham')
    //         .addGroupBy('p.giaSanPham')
    //         .addGroupBy('p.khuyenmai_gia')
    //         .orderBy('average_rating', 'DESC')
    //         .getRawMany();

    //     // Chuyển đổi average_rating từ string thành number
    //     const formattedProducts = products.map(product => ({
    //         ...product,
    //         average_rating: parseFloat(product.average_rating)
    //     }));

    //     return formattedProducts;
    // }

    async getSinhToFilterRate(): Promise<any[]> {
        console.log("Fetching coffee products with average ratings...");
    
        // Truy vấn để lấy thông tin sản phẩm và tính trung bình số sao
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.theLoai', 'theLoai')
            .leftJoinAndSelect('product.khuyenMai', 'khuyenMai')
            .leftJoin('product.rates', 'rate')
            .select([
                'product.id_product AS id_product',
                'product.tenSanPham AS tenSanPham',
                'product.giaSanPham AS giaSanPham',
                'product.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoai_id_theLoai',
                'theLoai.ten_the_loai AS theLoai_ten_the_loai',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'SinhTo' })
            .groupBy('product.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('theLoai.ten_the_loai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .addGroupBy('khuyenMai.phanTramKhuyenMai')
            .addGroupBy('khuyenMai.donHangToiThieu')
            .orderBy('average_star', 'DESC') // Sắp xếp theo trung bình số sao (nếu cần)
            .getRawMany();
    
        // Ánh xạ kết quả thành cấu trúc mong muốn
        const formattedProducts = products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            theLoai: {
                id_theLoai: product.theLoai_id_theLoai,
                ten_the_loai: product.theLoai_ten_the_loai,
            },
            khuyenMai: {
                id_khuyen_mai: product.khuyenMai_id_khuyen_mai,
                phanTramKhuyenMai: product.khuyenMai_phanTramKhuyenMai,
                donHangToiThieu: product.khuyenMai_donHangToiThieu,
            },
            average_star: parseFloat(product.average_star)
        }));
    
        return formattedProducts;
    }

}