

import css from "../style.module.css";  
// import '../globals.css';
export default function lienhe(){
    return (
        <>
        <div className={css.header_banner_map}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4545065405814!2d106.62420897480605!3d10.852993989300455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1730822730655!5m2!1svi!2s" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
        <div className={css.content_lienhe}>
            <div className={css.thongtinlienhe}>
                <h4>Thông tin liên hệ</h4>
                <div className={css.diachi_tt}>
                    <div className={css.thongtinlienhe_diachi}>
                        <div className={css.diachi_tron}>
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                    </div>
                    <div className={css.thongtindiachi_tt}>
                        <p>Địa chỉ</p>
                    </div>
                </div>
                <div className={css.diachi_tt}>
                    <div className={css.thongtinlienhe_diachi}>
                        <div className={css.diachi_tron}>
                            <i className="fa-regular fa-envelope"></i>
                        </div>
                    </div>
                    <div className={css.thongtindiachi_tt}>
                        <p>Email</p>
                        <span>nhanttps40174@gmail.com</span>
                    
                    </div>
                </div>
                <div className={css.diachi_tt}>
                    <div className={css.thongtinlienhe_diachi}>
                        <div className={css.diachi_phone}>
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                    <div className={css.thongtindienthoai_tt}>
                        <p>Điện thoại</p>
                        <span className="css.p1"><b>Hotline 1:</b> 123456789</span>
                        <span className="css.p2"><b>Hotline 2:</b> 987654321</span>
                    </div>
                </div>
                <div className={css.diachi_tt}>
                    <div className={css.thongtinlienhe_diachi}>
                        <div className={css.diachi_time}>
                            <i className="fa-regular fa-envelope"></i>
                        </div>
                    </div>
                    <div className={css.thongtintime_tt}>
                        <p>Thời gian làm việc</p>
                        <span>Thứ 2 đến Chủ nhật 20h đến 24h</span>
                    </div>
                </div>
            </div>
            <div className={css.tuvanquatang}>
                <h4>
                    Tư Vấn Quà Tặng Doanh Nghiệp
                </h4>
                <p>Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với <br/> bạn sớm
                     nhất có thể .
                </p>
                <div className={css.hoten_input}>
                    <input type="text" placeholder="Tên của bạn" required/>
                </div>
                <div className={css.input_col2}>
                    <div className={css.email_input}>
                        <input type="text" placeholder="Email của bạn" required/>
                    </div>
                    <div className={css.sdt_input}>
                        <input type="text" placeholder="Số điện thoại của bạn" required/>
                    </div>
                </div>
                <div className={css.content_input}>
                    <input type="text" placeholder="Nội dung" required/>
                </div>
                <div className={css.guichotoi_input}>
                    <button>GỬI CHO CHÚNG TÔI</button>
                </div>
                </div>
              
        </div>
        </>
    );
}