import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postsendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state ={
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowloading: false
        }
    }

    async componentDidMount() {
       let { user } = this.props;
       let { currentDate } = this.state;
       let formatedDate = new Date(currentDate).getTime();
       this.getDataPatient(user, formatedDate);
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
           })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
      }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
      }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowloading: true
        })
        let res = await postsendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowloading: false
            })
            toast.success("Send Remedy success");
            this.closeRemedyModal();
            await this.getDataPatient();
        }else {
            this.setState({
                isShowloading: false
            })
            toast.error(" Something Wrongs...! ");
        }
    }

    render() {
        let language = this.props.language;
        let { dataPatient, isOpenRemedyModal, dataModal, } = this.state;
        return (
            <>
            <LoadingOverlay
            active={this.state.isShowloading}
            spinner
            text='Loading...'
            >
            <div className='manage-Patient-container'>
                <div className='title text-center'> Quản lý bệnh nhân khám bệnh</div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                          <label>Chọn ngày khám</label>
                          <DatePicker onChange={this.handleChangeDatePicker} className='form-control'
                          value={this.state.currentDate} 
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        
                        <table style={{width: '100%'}}>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Họ & tên</th>
                                <th>Giới tính</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th colSpan="2">Actions</th>

                            </tr>
                            
                                {dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                                    let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                    return (
                                        <tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{time}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{gender}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{item.patientData.phonenumber}</td>
                                            <td>
                                                <button className='btn btn-Confirm' 
                                                onClick={() => this.handleBtnConfirm(item)}>Gửi hóa đơn</button>
                                            </td>
                                            
                                        </tr>
                                    )
                                })
                                :
                                <tr> 
                                    <td colSpan="7" style={{ textAlign: "center" }}>No data</td>
                                </tr>
                                }
                                
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
            <RemedyModal
            isOpenModal={isOpenRemedyModal} 
            dataModal={dataModal}
            closeRemedyModal = {this.closeRemedyModal}
            sendRemedy= {this.sendRemedy} />
            </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
