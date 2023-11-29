import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
// import './responsive.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from 'react-router';
class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state ={
            query: '',
             results: [],
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
           }
    }

    render() {
        
        let language = this.props.language;
        return (
            <React.Fragment>
           <div className='home-header-container'>
            <div className='home-header-content'>
                <div className='left-content'>
                    <i className="fa-solid fa-bars"></i>
                    <img className='header-logo' src={require('../../assets/logoBV.svg').default}
                    onClick={() => this.returnToHome()} />
                </div>
                <div className='center-content'>
                    <div className='child-content'>
                        <div><b> <FormattedMessage id ="homeheader.speciality"/></b></div>
                        <div className='subs-title'><FormattedMessage id ="homeheader.searchdoctor" /></div>
                    </div>
                    <div className='child-content'>
                        <div><b> <FormattedMessage id ="homeheader.health-facility" /></b></div>
                        <div className='subs-title'><FormattedMessage id ="homeheader.select-room" /></div>
                    </div>
                    <div className='child-content'>
                        <div><b> <FormattedMessage id ="homeheader.doctor" /></b></div>
                        <div className='subs-title'><FormattedMessage id ="homeheader.select-doctor" /></div>
                    </div>
                    <div className='child-content'>
                        <div><b> <FormattedMessage id ="homeheader.fee" /></b></div>
                        <div className='subs-title'><FormattedMessage id ="homeheader.check-health" /></div>
                    </div>
                </div>
                <div className='ringht-content'>
                    <div className='support'><i className="fa-solid fa-circle-question"></i>
                    <FormattedMessage id ="homeheader.support" /></div>
                    <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                    <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                </div>
            </div>

           </div>
           {this.props.isShowBanner === true && 
           <div className='home-header-banner'>
            <div className='content-up'>
                <div className='titleOne'><FormattedMessage id ="banner.titleOne" /> </div>
                <div className='titleTwo'><FormattedMessage id ="banner.titleTwo" /></div>


                <div className='search'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type='text' placeholder='Tìm kiếm chuyên khoa'/>
                    
                </div>



            </div>
            <div className='content-down'>
                <div className='options'>
                    <div className='options-child'>
                        <div className='icon-child'><img className='img-child' src={require('../../assets/icon01.png').default} /></div>
                        <div className='text-child'><FormattedMessage id ="banner.speciality" /></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><img className='img-child' src={require('../../assets/icon03.png').default} /></div>
                        <div className='text-child'><FormattedMessage id ="banner.examination" /></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><img className='img-child' src={require('../../assets/icon04.png').default} /></div>
                        <div className='text-child'><FormattedMessage id ="banner.Medical" /></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><img className='img-child' src={require('../../assets/icon05.png').default} /></div>
                        <div className='text-child'><FormattedMessage id ="banner.Mental" /></div>
                    </div><div className='options-child'>
                        <div className='icon-child'><img className='img-child' src={require('../../assets/icon02.png').default} /></div>
                        <div className='text-child'><FormattedMessage id ="banner.Remote" /></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><img className='img-child' src={require('../../assets/icon10.png').default} /></div>
                        <div className='text-child'><FormattedMessage id ="banner.Healthcare" /></div>
                    </div>
                    
                    
                </div>
            </div>
           </div>
           }
           </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
