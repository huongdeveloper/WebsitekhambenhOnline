import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import { withRouter } from 'react-router';
import { getAllSpecialty } from '../../../services/userService';

import Slider from "react-slick";
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state ={
            dataSpecialty: []
        }
    }

    async componentDidMount() {
       let res = await getAllSpecialty();
       if(res && res.errCode === 0 ) {
        this.setState({
            dataSpecialty: res.data ? res.data : []
        })
       }
    }

    handleViewDetailDoctor = (item) => {
        if(this.props.history) {
         this.props.history.push(`/detail-specialty/${item.id}`)
        }
     }

    render() {
        let { dataSpecialty, language } = this.state;
        return (
          <div className='section-share section-specialty'> 
              <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'><FormattedMessage id ="homepage.title-section"/></span>
                    <button className='btn-section'><FormattedMessage id ="homepage.btn-section"/></button>
                </div>
                <div className='section-body'>
                <Slider {...this.props.settings}>
                    {dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, index) => {
                        return (
                            <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                            <div className='bg-imgae section-specialty '  style={{backgroundImage: `url(${item.image})`}}/>
                            <div className='specialty-name'>{item.name}</div>
                           </div>
                        )
                    })}
                        
                        
                    </Slider>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
