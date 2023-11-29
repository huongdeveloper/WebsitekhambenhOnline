import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
          <div className='section-share section-about'> 
                <div className='section-about-header'>
                <FormattedMessage id ="homepage.about-header"/>
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe className='iframe-youtobe' width="100%" height="440" 
                    src="https://www.youtube.com/embed/gY_pMzJcrag" 
                    title="Bệnh viện Đa khoa Hà Nội: Khám với chuyên gia - Tận tâm như người nhà" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
                    </div>

                    <div className='content-right'>
                    
                        <p>Nằm giữa trung tâm Thủ đô Hà Nội, (số 29 Hàn Thuyên, quận Hai Bà Trưng), Bệnh viện Đa khoa Hà Nội 
                            chính thức đi vào hoạt động từ tháng 11/2010 với tổng diện tích sử dụng gần 2000m2. Bệnh viện là 
                            một trong những địa chỉ khám, chữa bệnh uy tín, được đông đảo người dân trên cả nước tin tưởng và sử dụng dịch vụ.
                            Bệnh viện Đa khoa Hà Nội là nơi quy tụ đội ngũ y bác sĩ là các giáo sư, chuyên gia đầu ngành, luôn hết lòng vì 
                            người bệnh. Với khẩu hiệu “Bệnh nhân là trung tâm, chất lượng là hạt nhân, hài lòng là tiêu chí”, chúng tôi 
                            luôn nỗ lực nhằm mang đến những dịch vụ chăm sóc sức khỏe toàn diện nhất tới khách hàng.
                            Chất lượng dịch vụ. <br/>
                            Điểm nổi bật làm nên thương hiệu của Bệnh viện Đa khoa Hà Nội là dịch vụ y tế và chăm sóc sức khỏe chất lượng hoàn hảo, với: <br/>
                            – Đội ngũ tư vấn viên nhiệt tình. Bạn sẽ được đón tiếp, chăm sóc một cách tận tình, chu đáo, tạo cảm giác an tâm, thoải mái. <br/>
                            – Thủ tục đơn giản, rút ngắn thời gian chờ đợi. Quý khách hàng có thể đăng kí khám qua hotline 1900 2345 29 hoặc trên hệ thống website của Bệnh viện. <br/>
                            – Chi phí hợp lý: mức phí khám chữa bệnh tại bệnh viện rất hợp lý, phù hợp với mọi đối tượng. Các biểu phí đều được bệnh viện niêm yết công khai theo quy định của Bộ y tế. <br/>
                        </p>
                    </div>
                </div>
                
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
