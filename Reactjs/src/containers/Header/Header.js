import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
     constructor(props) {
        super(props);
        this.state ={
            menuApp: []
        }
    }

    changeChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo} = this.props;

        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'> 
                    <span className='welcome'><FormattedMessage id ="homeheader.welcome"/>
                    {userInfo && userInfo.firstName ? userInfo.firstName : ''} {userInfo && userInfo.lastName ? userInfo.lastName : ''} !</span>
                      <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.changeChangeLanguage(LANGUAGES.VI)}>VN</span>
                      <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.changeChangeLanguage(LANGUAGES.EN)}>EN</span>

                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                    <i className="fas fa-sign-out-alt"></i>
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
         userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        // ========= Đổi ngôn ngữ =============
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
