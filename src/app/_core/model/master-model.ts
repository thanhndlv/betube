export class UserInfo {
  public taiKhoan: string;
  public matKhau: string;
  public email: string;
  public soDt: string;
  public maNhom: string;
  public maLoaiNguoiDung: string;
  public hoTen: string;
}

export class UserLogin {
  public taiKhoan: string;
  public matKhau: string;
}

export class Film {
  public maPhim: string;
  public tenPhim: string;
  public biDanh: string;
  public trailer: string;
  public hinhAnh: string;
  public moTa: string;
  public maNhom: string;
  public ngayKhoiChieu: string;
  public danhGia: string;
}

export class ShowTime {
  public maPhim: string;
  public ngayChieuGioChieu: string;
  public maRap: string;
  public giaVe: string;
}

export class BookingTicket {
  public maLichChieu: string;
  public danhSachVe: ListTicket[];
  public taiKhoanNguoiDung: string;
}

export class ListTicket {
  public maGhe: string;
  public giaVe: number;
}
