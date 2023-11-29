import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state ={
           arrUsers: [],
           isOpenModalUser: false,
           isOpenModalEditUser: false,
           userEdit: {}
        }
    }
   async componentDidMount() {
        await this.getAllUsersFromreact();
    }

    getAllUsersFromreact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
           this.setState({
               arrUsers: response.users
           })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    tongleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    tongleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewuser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !==0) {
                alert(response.errMessage)
            }else {
                await this.getAllUsersFromreact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch(e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0) {
                await this.getAllUsersFromreact();
            } else {
                alert(res.errMessage)
            }
        }catch(e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })

               await this.getAllUsersFromreact();
            } else {
            alert(res.errCode)
            }
        }catch(e) {
            console.log(e)
    }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                   isOpen={this.state.isOpenModalUser}
                   tonggleFromParent={this.tongleUserModal}
                   createNewuser= {this.createNewuser}
                />
                {this.state.isOpenModalEditUser && 
                <ModalEditUser
                   isOpen={this.state.isOpenModalEditUser}
                   tonggleFromParent={this.tongleUserEditModal}
                   currentUser={this.state.userEdit}
                   editUser= {this.doEditUser}
                /> }
            <div className="title text-center">Manage users with Admin</div>
            <div className='mx-1'>
                <button className='btn btn-primary px-3'
                  onClick={() => this.handleAddNewUser()}
                ><i className="fa-solid fa-plus"></i> Add new users</button>
            </div>
            <div className='users-table mt-3 mx-1'>
            <table id="customers">
            <tbody>
                    <tr>
                         <th>Email</th>
                         <th>Firtname</th>
                         <th>Lastname</th>
                         <th>Address</th>
                         <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.map((item, index) => {
                        return (
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.address}</td>
                            <td>
                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fa-solid fa-pen"></i></button>
                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
                </table>
            </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);