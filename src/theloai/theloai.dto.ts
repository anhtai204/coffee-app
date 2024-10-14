import { Expose } from 'class-transformer';

export class TheLoaiDto {
    @Expose()
    id_theLoai?: number;

    @Expose()
    ten_the_loai?: string;
}