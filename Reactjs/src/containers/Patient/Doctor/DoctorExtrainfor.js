import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from '../../../services/userService'
import  NumberFormat  from 'react-number-format';

class DoctorExtrainfor extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if(this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.data
            })
        }
        }
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
        let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
        if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.data
            })
        }
       }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let language = this.props.language;
        let {isShowDetailInfor, extraInfor} = this.state;
        return (
            <div className='doctor-extra_infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.text-address"/>:</div>
                    <div className='nameClinic'>{extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                    <div className='content-infor'> <FormattedMessage id="patient.extra-infor-doctor.price"/>:
                        { extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                        && <NumberFormat className='currency' value={extraInfor.priceTypeData.valueVi} 
                        displayType={'text'} thousandSeparator={true} suffix={'đ'}/>} 

                        { extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                        && <NumberFormat className='currency' value={extraInfor.priceTypeData.valueEn} 
                        displayType={'text'} thousandSeparator={true} suffix={'$'}/>} 
                    <span className='detail-span' onClick={() => this.showHideDetailInfor(true)}><FormattedMessage id="patient.extra-infor-doctor.detail-span"/></span></div>
                    }

                    {isShowDetailInfor === true &&
                    <>
                    <div className='title-price'><FormattedMessage id="patient.extra-infor-doctor.title-price"/>:</div>
                        <div className='detail-infor'>
                            <div className='price'>
                                <span className='left'><FormattedMessage id="patient.extra-infor-doctor.price"/>:</span>
                                <span className='right'>
                                { extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                && <NumberFormat className='currency' value={extraInfor.priceTypeData.valueVi} 
                                displayType={'text'} thousandSeparator={true} suffix={'đ'}/>} 

                               { extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                && <NumberFormat className='currency' value={extraInfor.priceTypeData.valueEn} 
                                displayType={'text'} thousandSeparator={true} suffix={'$'}/>} 
                                    </span>
                            </div>
                            <div className='note'>{extraInfor.note ? extraInfor.note : ''}</div>
                        </div>
                        
                        <div className='payment'><FormattedMessage id="patient.extra-infor-doctor.payment"/>
                        : {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ? extraInfor.paymentTypeData.valueVi : ''}
                        {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN ? extraInfor.paymentTypeData.valueEn : ''}</div>
                        <div className='hide-price'><span onClick={() => this.showHideDetailInfor(false)}><FormattedMessage id="patient.extra-infor-doctor.hide-price"/></span></div>
                    </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
