import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './DetailClinic.scss';
import _ from 'lodash';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtrainfor from '../Doctor/DoctorExtrainfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById, getAllCodeService } from '../../../services/userService';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state ={
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    // // ====== Viết Api Xem Chi Tiết Chuyên Khoa =======
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({
                id: id,
               
            });
            
            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    render() {
        let language = this.props.language;
        let { arrDoctorId, dataDetailClinic } = this.state;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isShowBanner ={false}/>
                <div className='detail-specialty-body'>
                <div className='description-spcialty'>
                {dataDetailClinic && !_.isEmpty(dataDetailClinic)&&
                    <>
                       {/* <div>{dataDetailClinic.name}</div> */}
                       <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}></div>
                    </>                
                }
               </div>
              
               {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                return (
                    <div className='each-doctor'  key={index}>
                        <div className='dt-content-left'>
                        <div className='profile-doctor'>
                          <ProfileDoctor doctorId = {item} 
                            isShowDescriptionDoctor={true}
                            isShowLinkDetail={true}
                            isShowPrice={false}
                            // dataTime = {dataTime}
                            />
                    </div>
                        </div>
                        <div className='dt-content-right'>
                            <div className='doctor-schdule'><DoctorSchedule doctorIdFromParent = {item}/></div>
                            <div className='doctor-extra-infor'><DoctorExtrainfor doctorIdFromParent = {item}/></div>
                        

                        
                        </div>
                    </div>
                    
                )
               })}
        
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
