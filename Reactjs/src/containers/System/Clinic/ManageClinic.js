import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CommonUtils } from '../../../utils';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { postCreateNewClinic } from '../../../services/userService';
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {
       
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
      }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('base64 image: ', base64)
           
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await postCreateNewClinic(this.state);

        if (res && res.errCode === 0) {
            toast.success("Add new Clinic success");
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }else {
            toast.error(" Invalid Clinic error! ");
            console.log('check >>>>: ', res);
        }
        
    }
    render() {
        let language = this.props.language;
        return (
            <div className='manage-specialty-container'>
                <div className='title'>Quản lý phòng khám</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám:</label>
                        <input className='form-control' type='text' onChange={(event) => this.handleOnChangeText(event, 'name')} value={this.state.name}/>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám:</label>
                        <input className='form-control-file' type='file' onChange={(event) => this.handleOnchangeImage(event)}/>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám:</label>
                        <input className='form-control' type='text' onChange={(event) => this.handleOnChangeText(event, 'address')} value={this.state.address}/>
                    </div>
                    <div className='col-12'>
                        <label>Chi tiết phòng khám:</label>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} value={this.state.descriptionMarkdown}/>
                    </div>
                    <div className='col-12'>
                    <button className='btn btn-primary' style={{width: 100, marginTop: 20}} 
                    onClick={() => this.handleSaveNewClinic()}> Lưu thông tin </button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
