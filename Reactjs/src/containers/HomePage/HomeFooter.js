import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

    render() {
        return (
          <div className='home-footer'> 
              <p>&copy; Website 2023 huong.fullstack@gmail.com - More information, please visit my faceboook. <a target='_blank' href='https://www.facebook.com/profile.php?id=100013025299135'> Click here</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
