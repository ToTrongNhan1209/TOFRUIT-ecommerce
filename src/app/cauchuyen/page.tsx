'use client';
import style from '../style.module.css';
import css from '../style.module.css';  
// import '../globals.css';
export default function Cauchuyen(){
    return (
        <div className={css.content_thuonghieu}>
        <div className={css.thuonghieu}>
            <div className={css.content_th}>
                <h3>Câu chuyện thương hiệu</h3>
                <p>TOFRUIT là đơn vị bán lẻ và phân phối các sản phẩm trái cây tươi chất lượng cao, từ các nhà vườn trong nước và nhập
                     khẩu. Sứ mệnh của chúng tôi, là đem nông sản – từ  những vườn chất lượng nhất – đến bàn ăn của mỗi gia đình Việt. Trái cây
                      mẫu mã phải đẹp, ăn phải ngon, sạch, phải giàu dinh dưỡng nhờ canh tác theo chuẩn an toàn.</p> 
                      <div className={css.content_img}>
                        <img src="../image/anhcauchuyen.jpg" alt=""/> 
                        <span>Từ nông trại đến bàn ăn</span>
                      </div>
                      <div className={css.content_tt_s1}>
                        <span className={css.s1}>Hành trình đó có mồ hôi của người gieo trồng, có bánh xe gập ghềnh từ vườn quê lên thị thành,
                            có những đơn hàng giao đi bất kể mưa nắng …</span>   
                      </div>
                      <div className={css.content_tt_s2}>
                            <span className={css.s2}>Tất cả vì nụ cười của khách hàng. Vì niềm tin yêu vào nông sản quê hương….</span>
                      </div>
            </div>
            <div className={css.content_camket}>
                <h4>CAM KẾT CỦA CHÚNG TÔI</h4>
                <div className={css.danhsach_camket}>
                    <ul>
                        <li>
                            <p>
                                Chất lượng hảo hạng: Tuyển chọn từ các nhà vườn có kỹ thuật canh tác tốt nhất 
                            (đạt tiêu chuẩn VietGAP, GlobalGAP, Hữu cơ). Mẫu mã đẹp, hương vị ngon - trái 
                            cây tại TOFRUIT luôn đáp ứng khẩu vị của những khách hàng sành ăn nhất.
                            </p>
                            <div className={css.image_camket}>
                                <img src="../image/cauchuyenthuonghieu/ádaas.png" alt=""/>
                                <p>Trái cây ngon miệng và bổ dưỡng cho cả gia đình</p>
                            </div>  
                        </li>
                        <li>
                            <p>
                                Đảm bảo nguồn gốc: Trái cây nội địa được tuyển chọn từ các nông trại từ Bắc chí Nam.
                                 Trái cây nhập khẩu chính ngạch, có giấy phép thông quan. Nói không với các sản phẩm không rõ xuất xứ.
                            </p>
                        </li>
                        <li>
                            <p>
                                Đa dạng chủng loại: Mùa nào trái nấy - trái cây từ khắp các vùng miền tại Việt Nam & trên thế giới, tụ họp tại gian hàng Morning Fruit
                            </p>
                            <div className={css.image_camket_1}>
                                <img src="../image/cauchuyenthuonghieu/bbbb.png" alt=""/>
                            </div>  
                        </li>
                        <li>
                            <p>
                                Giá cả cạnh tranh (so với phân khúc chất lượng): Nhờ rút bớt các khâu trung gian, 
                                làm việc trực tiếp với các nhà vườn, hợp tác xã tại các địa phương.     
                            </p>
                            <div className={css.image_camket_2}>
                                <img src="../image/cauchuyenthuonghieu/ccccc.png" alt=""/>
                                <p>Tốt cho sức khoẻ. Tốt cho túi tiền</p>
                            </div> 
                        </li>
                        <li>
                            <p>
                                Dịch vụ chuyên nghiệp: Trái cây là sản phẩm nông nghiệp đầy rủi ro, vòng đời ngắn, chất
                                lượng dễ bị ảnh hưởng bởi thời tiết, vận chuyển... Tại Morning Fruit, chúng tôi luôn có chính
                                 sách bảo hành linh động (tặng voucher giảm giá, bù hàng, hoàn tiền), cho các sản phẩm chưa đáp ứng kỳ vọng khách hàng.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
         </div>
        <div className={css.danhmuc_page}>
            <h4>Danh mục page</h4>
            <a href=""><p>Chính sách bào hành</p></a>
            <a href=""><p>Chính sách giao hàng</p></a>
            <a href=""><p>Chính sách thanh toán</p></a>
            <a href=""><p>Chính sách bảo mật</p></a>
        </div>
    </div>
    );
}