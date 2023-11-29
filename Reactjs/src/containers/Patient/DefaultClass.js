import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';


class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state ={
            
        }
    }

    componentDidMount() {
       
    }

     componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    render() {
        let language = this.props.language;
        return (
            <div className='doctor-extra_infor-container'>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
