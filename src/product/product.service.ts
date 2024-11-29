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


    // uploads
    async updateProductLogo(id_product: number, filename: string): Promise<ProductEntity> {
        const product = await this.productRepository.findOneBy({ id_product: id_product });
        if (!product) {
          throw new Error('Product not found');
        }
        
        product.logo_product = `/uploads/${filename}`; // Đường dẫn ảnh
        return await this.productRepository.save(product);
    }

    async save(product: ProductEntity): Promise<ProductEntity>{
        const saveProduct = await this.productRepository.save(product);
        console.log(saveProduct);
        return saveProduct;
    }

    async getProducts(): Promise<ProductEntity[]>{
        const products = await this.productRepository.find()
        return products;
    }


    async getProductById(id_product: number): Promise<ProductEntity>{
        const product = await this.productRepository.findOne({
            where: {
                id_product: id_product
            }
        });
        return product;
    }


    async deleteProduct(id_product: number): Promise<Boolean>{
        try {
            const product = await this.productRepository.findOne({
                where: {
                    id_product: id_product,
                },
            });

            await this.productRepository.remove(product);
            return true;
        } catch(error){
            console.error("Lỗi khi xóa product", error);
            return false;
        }
    }

    async updateProduct(id_product: number, new_product: ProductEntity): Promise<ProductEntity> {
        try {
            const product = await this.productRepository.findOne({
                where: {
                    id_product: id_product,
                },
            });

            product.tenSanPham = new_product.tenSanPham;
            product.giaSanPham = new_product.giaSanPham;
            product.khuyenmai_gia = new_product.khuyenmai_gia;
            product.logo_product = new_product.logo_product;
            product.mo_ta = new_product.mo_ta;
            product.theLoai = new_product.theLoai;
            product.khuyenMai = new_product.khuyenMai;
            await this.productRepository.save(product);
            return product;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi sửa product:', error);
            return;
        }
    }

    
    // other products
    async getProductOthers(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.theLoai', 'theLoai')
            .leftJoinAndSelect('product.khuyenMai', 'khuyenMai')
            .leftJoin('product.rates', 'rate') // Sử dụng leftJoin để tính toán AVG
            .select([
                'product.id_product AS id_product',
                'product.tenSanPham AS tenSanPham',
                'product.giaSanPham AS giaSanPham',
                'product.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoai_id_theLoai',
                'theLoai.ten_the_loai AS theLoai_ten_the_loai',
                'product.logo_product AS logo_product',
                'product.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai NOT IN (:...tenTheLoai)', { tenTheLoai: ['Cà Phê', 'Trà Sữa', 'Sinh Tố'] })
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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


    async getOthersFilterGia(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai NOT IN (:...excludedCategories)', {
                excludedCategories: ['Cà Phê', 'Sinh Tố', 'Trà Sữa']
            }) // Exclude specific categories
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star' // Calculate average star
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.giaSanPham', 'ASC') // Sort by giaSanPham in ascending order
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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

    async getOthersFilterKhuyenMai(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai NOT IN (:...excludedCategories)', {
                excludedCategories: ['Cà Phê', 'Sinh Tố', 'Trà Sữa']
            }) // Exclude specific categories
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star'
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.khuyenmai_gia', 'DESC')
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null,
            average_star: parseFloat(product.average_star) || 0
        }));
    }

    async getOthersFilterRate(): Promise<any[]> {
        console.log("Fetching products with average ratings excluding specific categories...");
        
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
                'product.logo_product AS logo_product',
                'product.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai NOT IN (:...excludedCategories)', {
                excludedCategories: ['Cà Phê', 'Sinh Tố', 'Trà Sữa']
            }) // Loại trừ các thể loại nhất định
            .groupBy('product.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('theLoai.ten_the_loai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .addGroupBy('khuyenMai.phanTramKhuyenMai')
            .addGroupBy('khuyenMai.donHangToiThieu')
            .orderBy('average_star', 'DESC') // Sắp xếp theo trung bình số sao
            .getRawMany();
    
        // Ánh xạ kết quả thành cấu trúc mong muốn
        const formattedProducts = products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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
                'product.logo_product AS logo_product',
                'product.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Cà Phê' })
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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
            .leftJoinAndSelect('p.theLoai', 'theLoai')
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai')
            .leftJoin('p.rates', 'rate')
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Cà Phê' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star'
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null,
            average_star: parseFloat(product.average_star) || 0
        }));
    }
    
    async getCoffeeFilterKhuyenMai(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai')
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai')
            .leftJoin('p.rates', 'rate')
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Cà Phê' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMaiId',
                'khuyenMai.phanTramKhuyenMai AS phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS donHangToiThieu',
                'AVG(rate.soLuongSao) AS average_star'
            ])
            .groupBy('p.id_product')
            .addGroupBy('theLoai.id_theLoai')
            .addGroupBy('khuyenMai.id_khuyen_mai')
            .orderBy('p.khuyenmai_gia', 'DESC')
            .getRawMany();
    
        return products.map(product => ({
            id_product: product.id_product,
            tenSanPham: product.tenSanPham,
            giaSanPham: product.giaSanPham,
            khuyenmai_gia: product.khuyenmai_gia,
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
            theLoai: {
                id_theLoai: product.theLoaiId,
                ten_the_loai: product.ten_the_loai
            },
            khuyenMai: product.khuyenMaiId ? {
                id_khuyen_mai: product.khuyenMaiId,
                phanTramKhuyenMai: product.phanTramKhuyenMai,
                donHangToiThieu: product.donHangToiThieu
            } : null,
            average_star: parseFloat(product.average_star) || 0
        }));
    }
    

    async getCoffeeFilterRate(): Promise<any[]> {
        console.log("Fetching tra sua products with average ratings...");
    
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
                'product.mo_ta AS mo_ta',
                'product.logo_product AS logo_product',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Cà Phê' })
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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
                'product.logo_product AS logo_product',
                'product.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Trà Sữa' })
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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


    async getTraSuaFilterGia(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Trà Sữa' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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



    async getTraSuaFilterKhuyenMai(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Trà Sữa' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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
                'product.logo_product AS logo_product',
                'product.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Trà Sữa' })
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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
                'product.logo_product AS logo_product',
                'product.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Sinh Tố' })
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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


    async getSinhToFilterGia(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Sinh Tố' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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


    async getSinhToFilterKhuyenMai(): Promise<any[]> {
        const products = await this.productRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.theLoai', 'theLoai') // Join with the theLoai relation
            .leftJoinAndSelect('p.khuyenMai', 'khuyenMai') // Join with the khuyenMai relation
            .leftJoin('p.rates', 'rate') // Join with the rates
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Sinh Tố' })
            .select([
                'p.id_product AS id_product',
                'p.tenSanPham AS tenSanPham',
                'p.giaSanPham AS giaSanPham',
                'p.khuyenmai_gia AS khuyenmai_gia',
                'theLoai.id_theLoai AS theLoaiId',
                'theLoai.ten_the_loai AS ten_the_loai',
                'p.logo_product AS logo_product',
                'p.mo_ta AS mo_ta',
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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
                'product.logo_product AS logo_product',
                'product.mo_ta AS mo_ta',
                'khuyenMai.id_khuyen_mai AS khuyenMai_id_khuyen_mai',
                'khuyenMai.phanTramKhuyenMai AS khuyenMai_phanTramKhuyenMai',
                'khuyenMai.donHangToiThieu AS khuyenMai_donHangToiThieu',
                'COALESCE(AVG(rate.soLuongSao), 0) AS average_star' // Tính trung bình số sao
            ])
            .where('theLoai.ten_the_loai = :tenTheLoai', { tenTheLoai: 'Sinh Tố' })
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
            logo_product: product.logo_product,
            mo_ta: product.mo_ta,
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