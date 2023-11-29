import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state ={
            id: '',
           email: '',
           password: '',
           firstName: '',
           lastName: '',
           address: ''
        }
       
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
             })
        }
    }
    toggle = () => {
        this.props.tonggleFromParent();
    }
    handleOnChageInput = (event, id) => {
        let copyState = { ...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i <arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing Parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
        
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className='modal-user-container'
                size='lg'
                >
            <ModalHeader toggle={() => {this.toggle()}}>Edit a new user</ModalHeader>
            <ModalBody>
            <div className="modal-user-body">
                    <div className="input-container">
                        <label>Email</label>
                        <input type="email" disabled onChange={(event) => {this.handleOnChageInput(event, "email")}} value={this.state.email} className="form-control" placeholder="Email"/>
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="password" disabled onChange={(event) => {this.handleOnChageInput(event, "password")}} value={this.state.password} className="form-control" placeholder="Password"/>
                    </div>
                    <div className="input-container">
                        <label>First name</label>
                        <input type="text" onChange={(event) => {this.handleOnChageInput(event, "firstName")}} value={this.state.firstName} className="form-control" placeholder="First name"/>
                    </div>
                    <div className="input-container">
                        <label>Last name</label>
                        <input type="text" onChange={(event) => {this.handleOnChageInput(event, "lastName")}} value={this.state.lastName} className="form-control" placeholder="Last name"/>
                    </div>
                    <div className="input-container max-width-input ">
                        <label>Address</label>
                        <input type="text" onChange={(event) => {this.handleOnChageInput(event, "address")}} value={this.state.address} className="form-control" placeholder="Address"/>
                    </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <Button className='px-3' color="primary" onClick={() => {this.handleSaveUser()}}>
                Save changes
              </Button>{' '}
              <Button className='px-3' color="secondary" onClick={() => {this.toggle()}}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
