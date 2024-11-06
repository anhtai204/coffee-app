import { Expose } from 'class-transformer';

export class PhuongThucThanhToanDto {
    @Expose()
    id_khuyen_mai?: number;

    @Expose()
    phanTramKhuyenMai?: number;

    @Expose()
    donHangToiThieu?: number;
}