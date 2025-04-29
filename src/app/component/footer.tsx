
import css from "../style.module.css";

export default function Footer() {
  return (
    <div className={css.footer}>
    <div className={css.footer_thongtin}>
        <div className={css.footer_row1}>
            <div className={css.footer_row1_0}>
                <h4>Về TOFRUIT</h4>
            </div>
            <div className={css.footer_row1_1}>
                <p>TOFRUIT là thương hiệu trái cây <br/>
                    tươi chất lượng cao, với đa dạng sản<br/>
                    phẩm phục vụ mọi nhu cầu: đặc sản<br/>
                    vùng miền, trái cây nhập khẩu, quà<br/>
                    tặng trái cây, mâm ngũ quả, nước ép,<br/>
                    và trái cây sấy.</p>
                <div className={css.footer_row1_2}>
                    <span><b>Chi nhánh 1:</b> Quận 12</span>
                    <p><b>Chi nhánh 2:</b> Quận 21</p>
                    <p><b>Điện thoại:</b> 123456789</p>
                    <p><b>Email:</b> nhanttps40174@gmail.com</p>
                </div>
            </div>   
        </div>
        <div className={css.footer_row2}>
            <div className={css.footer_row2_0}>
                <h4>Hỗ trợ khách hàng</h4>
            </div>
            <div className={css.footer_row2_1}>
                <ul>
                    <li><a href="">Chính sách bảo hành</a></li>
                    <li className={css.row2_1_1}><a href="">Chính sách giao hàng</a></li>
                    <li className={css.row2_1_1}><a href="">Chính sách thanh toán</a></li>
                    <li className={css.row2_1_1}><a href="">Chính sách bảo mật</a></li>
                </ul>
            </div>
            
        </div>
        <div className={css.footer_row3}>
            <div className={css.footer_row3_1}>
                <h4> Chăm sóc khách hàng</h4>
            </div>
            <div className={css.footer_row3_2}>
                <div className={css.footer_row3_2_0}>
                    <i className="fa-solid fa-phone"></i> 
                </div>
                <div className={css.footer_row3_2_1}>
                    <span>123456789</span>
                </div>
            </div>
            <div className={css.footer_row3_3}>
                <span><a href="">nhanttps40174@gmail.com</a></span>
            </div>
        </div>
    </div>
    <div className={css.footer_copyright}>
        <p>Copyright © 2024 TOFRUIT - Trái Cây Chất Lượng Cao</p>
    </div>
    </div>
  );
}