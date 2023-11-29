import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';


class UserRedux extends Component {

    // ===== Khai báo biến =======
    constructor(props) {
        super(props);
        this.state ={
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            email: '', password: '', firstName: '', lastName: '', phoneNumber: '',
            address: '', gender: '', position: '', role: '', avatar: '', action: '',
            address: '', gender: '', position: '', role: '', avatar: '', action: '', userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    //     try {
    //         let res = await getAllCodeService('gender');
    //         if(res && res.errCode === 0){
    //             this.setState({
    //                 genderArr: res.data
    //             })
    //         }
    //         console.log('hoi dan it: ', res)
    //     } catch (e) {
    //         console.log(e)
    //     }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions, 
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles, 
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        // =========== Lấy thông tin Từ data lên from nhập để Sửa ==============
        if(prevProps.listUser !== this.props.listUser) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '', password: '', firstName: '', lastName: '', phoneNumber: '',
                address: '', avatar: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE, previewImgURL: ''
               
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('base64 image: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImge = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    onChaneInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrChek = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrChek.length; i++) {
            if (!this.state[arrChek[i]]) {
                isValid = false;
                alert('Missing Parameter: ' + arrChek[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        // ======= Thêm người dùng =====
        if(action === CRUD_ACTIONS.CREATE) {
        this.props.createNewUser({
                email:this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
        })}
        // ======= Sửa người dùng =======
        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({ 
                id: this.state.userEditId,
                email:this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

    }

    handleEditUserFromParent = (user) => {
        let imgebase64 = '';
        if(user.image) {
            imgebase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            userEditId: user.id,
            email: user.email,
            password: 'harcode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imgebase64,
            action: CRUD_ACTIONS.EDIT
         })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;

        let {email, password, firstName, lastName, phoneNumber, 
            address, gender, position, role, avatar} = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                <FormattedMessage id ="manage-user.redex"/>
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        <div className='col-12 my-3'>
                        <FormattedMessage id ="manage-user.add"/>
                              </div>
                              <div className='col-12'>{isGetGender === true ? 'Loading genders' : ''}</div>
                              <div className="col-4">
                                    <label><FormattedMessage id ="manage-user.email"/></label>
                                    <input type="email" value={email} onChange={(event) => {this.onChaneInput(event, 'email')}} disabled= {this.state.action === CRUD_ACTIONS.EDIT ? true : false} className="form-control" placeholder="Email"/>
                              </div>
                              <div className="col-4">
                                    <label><FormattedMessage id ="manage-user.password"/></label>
                                    <input type="password" value={password} onChange={(event) => {this.onChaneInput(event, 'password')}} disabled= {this.state.action === CRUD_ACTIONS.EDIT ? true : false} className="form-control" placeholder="Password"/>
                              </div>
                              
                              <div className="col-4">
                                  <label><FormattedMessage id ="manage-user.firstName"/></label>
                                <input type="text" value={firstName} onChange={(event) => {this.onChaneInput(event, 'firstName')}} className="form-control" placeholder="FirstName"/>
                              </div>
                              <div className="col-4">
                                  <label><FormattedMessage id ="manage-user.lastName"/></label>
                                <input type="text" value={lastName} onChange={(event) => {this.onChaneInput(event, 'lastName')}} className="form-control" placeholder="LastName"/>
                              </div>
                              
                              
                              <div className="col-8">
                                    <label><FormattedMessage id ="manage-user.address"/></label>
                                    <input type="text" value={address} onChange={(event) => {this.onChaneInput(event, 'address')}} className="form-control" placeholder='Address'/>
                              </div>

                              <div className="col-4">
                                    <label><FormattedMessage id ="manage-user.phonenumber"/></label>
                                    <input type="text" value={phoneNumber} onChange={(event) => {this.onChaneInput(event, 'phoneNumber')}} className="form-control" placeholder='Phonenumber'/>
                              </div>
                              
                              <div className="col-4">
                                    <label><FormattedMessage id ="manage-user.gender"/></label>
                                    <select className="form-control" value={gender} onChange={(event) => {this.onChaneInput(event, 'gender')}}>
                                        {genders && genders.length > 0 && genders.map ((item , index) => {
                                            return (
                                                <option key= {index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                              </div>
                              <div className="col-4">
                                    <label><FormattedMessage id ="manage-user.position"/></label>
                                    <select className="form-control" value={position} onChange={(event) => {this.onChaneInput(event, 'position')}}>
                                    {positions && positions.length > 0 && positions.map ((item , index) => {
                                            return (
                                                <option key= {index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                              </div>
                              <div className="col-4">
                                    <label><FormattedMessage id ="manage-user.roleId"/></label>
                                    <select className="form-control" value={role} onChange={(event) => {this.onChaneInput(event, 'role')}}>
                                    {roles && roles.length > 0 && roles.map ((item , index) => {
                                            return (
                                                <option key= {index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                              </div>

                              <div className="col-4">
                                  <label><FormattedMessage id ="manage-user.image"/></label>
                                  <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden 
                                    onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                    <div className='preview-image form-control'
                                    style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                    onClick={() => this.openPreviewImge()}></div>
                                  </div>
                              </div>

                              <div className='col-12 my-3'>
                              <button type="submit" className= {this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} style={{width: 100}} 
                              onClick={() => this.handleSaveUser()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id ="manage-user.edit"/> : <FormattedMessage id ="manage-user.save"/>} </button>
                              </div>

                              <div className='col-12 mb-5'>
                                 <TableManageUser handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                 action={ this.state.action }/> </div>
                        </div>
                    </div>
                </div>
                
                {this.state.isOpen === true && 
                <Lightbox 
                mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false})}/>}
            </div>
           
        )
    }

}

const mapStateToProps = state => {
    return {
         language: state.app.language,
         genderRedux: state.admin.genders,
         positionRedux: state.admin.positions,
         roleRedux: state.admin.roles,
         isLoadingGender: state.admin.isLoadingGender,
         listUser: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
