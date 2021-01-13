export const configs = {
  domain: "https://movie0706.cybersoft.edu.vn",
  groupID: "GP10",
  userType: {
    customer: "KhachHang",
    admin: "QuanTri"
  },
  apiRoutes: {
    home: {
      getListFilms: "/api/QuanLyPhim/LayDanhSachPhim?MaNhom=",
      getListSystemTheaters: "/api/QuanLyRap/LayThongTinHeThongRap",
      getListTheaters:
        "/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=",
      getListTheatersShowtimes:
        "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=",
      getListShowtimes: "/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=",
      getListTicketRoom: "/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=",
      postSignUp: "/api/QuanLyNguoiDung/DangKy",
      postSignIn: "/api/QuanLyNguoiDung/DangNhap",
      postCustomerInfo: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      putUpdateCustomerInfo: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      getInfoFilm: "/api/QuanLyPhim/LayThongTinPhim?MaPhim=",
      postBookingTicket : "/api/QuanLyDatVe/DatVe"
    },
    admin: {
      user: {
        postAddUser: "/api/QuanLyNguoiDung/ThemNguoiDung",
        deleteUser: "/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=",
        putUpdateUser: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        getSearchUser: "/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=",
        getListUser: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=",
        getListUserPaginate: "/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom="
      },
      film: {
        postAddFilm: "/api/QuanLyPhim/ThemPhim",
        deleteFilm: "/api/QuanLyPhim/XoaPhim?MaPhim=",
        postUpdateFilm: "/api/QuanLyPhim/CapNhatPhim",
        postUploadImgFilm: "/api/QuanLyPhim/UploadHinhAnhPhim",
        getListFilmPaginate: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang?MaNhom=",
        getSearchFilm: "/api/QuanLyPhim/LayThongTinPhim?MaPhim=",
        postAddShowTime: "/api/QuanLyDatVe/TaoLichChieu"
      },
      showTimes: {
        postAddShowTime: "/api/QuanLyDatVe/TaoLichChieu"
      }
    }
  },
  params: {
    filmID: "&MaPhim=",
    filmName: "&tenPhim=",
    systemTheaterID: "&maHeThongRap=",
    groupID: "&MaNhom=",
    pageSetUp: "&soPhanTuTrenTrang=10&soTrang=",
  }
};
