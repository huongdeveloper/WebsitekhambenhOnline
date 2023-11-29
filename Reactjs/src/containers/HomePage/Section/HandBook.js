import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class HandBook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,

        };
        return (
          <div className='section-share section-handbook'> 
              <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id ="homepage.slider-handbook-title"/></span>
                    <button className='btn-section'><FormattedMessage id ="homepage.slider-handbook-btn"/></button>
                </div>
                <div className='section-body'>
                <Slider {...settings}>
                        <div className='section-customize handbook-body-slider'>
                        <div className='bg-imgae section-handbook '><img className='handbook-img-file' src={require('../../../assets/HandBook/Wre1.png').default}/></div>
                        <div className='name-handbook'><FormattedMessage id ="homepage.slider-handbook-name"/></div>
                        </div>
                        <div className='section-customize handbook-body-slider'>
                        <div className='bg-imgae section-handbook '><img className='handbook-img-file' src={require('../../../assets/HandBook/Wrs1.png').default}/></div>
                        <div className='name-handbook'><FormattedMessage id ="homepage.slider-handbook-one"/></div>
                        </div>
                        <div className='section-customize handbook-body-slider'>
                        <div className='bg-imgae section-handbook '><img className='handbook-img-file' src={require('../../../assets/HandBook/WrA3.png').default}/></div>
                        <div className='name-handbook'><FormattedMessage id ="homepage.slider-handbook-two"/></div>
                        </div>
                        <div className='section-customize handbook-body-slider'>
                        <div className='bg-imgae section-handbook '><img className='handbook-img-file' src={require('../../../assets/HandBook/WrA2.png').default}/></div>
                        <div className='name-handbook'><FormattedMessage id ="homepage.slider-handbook-for"/></div>
                        </div>
                        <div className='section-customize handbook-body-slider'>
                        <div className='bg-imgae section-handbook '><img className='handbook-img-file' src={require('../../../assets/HandBook/WrA4.png').default}/></div>
                        <div className='name-handbook'><FormattedMessage id ="homepage.slider-handbook-file"/></div>
                        </div>
                        <div className='section-customize handbook-body-slider'>
                        <div className='bg-imgae section-handbook '><img className='handbook-img-file' src={require('../../../assets/HandBook/WrA1.png').default}/></div>
                        <div className='name-handbook'><FormattedMessage id ="homepage.slider-handbook-sex"/></div>
                        </div>
                    </Slider>
                </div>
                  
              </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // ========= khai báo ngôn ngữ =============
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
