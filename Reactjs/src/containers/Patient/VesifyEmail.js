import React, { Component } from 'react';
import { connect } from "react-redux";
import './VesifyEmail.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookAppointmet } from '../../services/userService';


class VesifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state ={
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if(this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointmet({
                token: token,
                doctorId: doctorId
            })

            if(res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    render() {
        let language = this.props.language;
        let { statusVerify, errCode } = this.state;
        return (
            <>
            <HomeHeader isShowBanner ={false}/>
            <div className='verify-email-container'>
            {statusVerify === false ?
                  <div className=''>Loading data....</div>
                :
                <div className=''>
                    {+errCode === 0 ?
                    <div className='text-booking'>Xác nhận lịch hẹn thành công</div> : 
                    <div className='infor-booking'> Lịch hẹn không tồn tại hoặc đã được xác nhận !</div>
                }
                </div>
            }
            </div> 
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VesifyEmail);
