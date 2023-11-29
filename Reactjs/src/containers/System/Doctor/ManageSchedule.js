import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { savebulkScheduleSchedule } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state ={
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        // ======= Sự kiện nhấn vào time chọn/ bỏ ========
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false}))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if(inputData && inputData.length >0) {
            inputData.map((item, index) => {
                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object)
            })
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDocTors()
        this.props.fetchAllScheduleTime()
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({selectedDoctor: selectedOption });
        
      };

      handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
      }

      handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
            if (rangeTime && rangeTime.length > 0) {
                rangeTime = rangeTime.map(item => {
                    if (item.id === time.id) item.isSelected = !item.isSelected;
                    return item;
                })
                
                this.setState({
                    rangeTime: rangeTime
                })
            }   
        }

        handleSaveSchedule = async () => {
            let { rangeTime, selectedDoctor, currentDate } = this.state;
            let result = [];
            if(selectedDoctor && _.isEmpty(selectedDoctor)) {
                toast.error(" Invalid selsected doctor! "); return;
            }

            if(!currentDate) {
                toast.error(" Invalid date! "); return;
            }

            let formatedDate = new Date(currentDate).getTime();
            if(rangeTime && rangeTime.length > 0) {
                let selectedTime = rangeTime.filter(item => item.isSelected === true);
                if (selectedTime && rangeTime.length > 0) {
                    selectedTime.map((schedule, index) => {
                        let object = {};
                        object.doctorId = selectedDoctor.value;
                        object.date = formatedDate;
                        object.timeType = schedule.keyMap;
                        result.push(object);
                    })
                } else {
                    toast.error(" Invalid selsected time! "); return;
                }
            }

            let res = await savebulkScheduleSchedule({
                arrSchedule: result,
                doctorId: selectedDoctor.value,
                formatedDate: formatedDate
            })

            if (res && res.errCode === 0) {
                toast.success("Save Infor success"); 
            }else {
                toast.error(" Invalid selsected time! ");
            }
            console.log('check time0: ', res);

        }

    render() {
        let { rangeTime } = this.state;
        let language = this.props.language;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        return (
            <div className='manage-schedule-container'>
                <div className='title text-center'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.dotor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            // className='form-control'
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.date" /></label>
                        <DatePicker onChange={this.handleChangeDatePicker} className='form-control'
                          value={this.state.currentDate[0]} minDate={yesterday}
                        />
                    </div>
                    <div className='col-12 pick-hour-container'>
                        {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) =>{
                            return (
                                <button className= {item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"} key={index}
                                 onClick={()=> this.handleClickBtnTime(item)}
                                >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
                            )
                        })}
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary' onClick={() => this.handleSaveSchedule()} style={{width: 100, marginTop: 20}}>
                            <FormattedMessage id="manage-schedule.save" /></button>
                    </div>
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
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDocTors: () => dispatch(actions.fetchAllDocTors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
