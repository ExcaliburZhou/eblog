import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.less';
import * as Actions from './actions';

const mapStateToProps = ({ minus }) => ({ minus });
const mapActionsToProps = dispatch => ({
  demoActions: bindActionCreators(Actions, dispatch)
});

export class Demo extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    minus: PropTypes.object.isRequired,
    demoActions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props) {
    console.log('second3 derived');
    return props.minus;
  }

  state = {
    a: 1,
  };

  componentDidMount() {
    console.log('didmount3', this.state);
  }

  componentDidUpdate() {
    console.log('didupdate3', this.state);
  }

  minus = () => {
    this.props.demoActions.minus(1);
  };

  render() {
    return (
      <div>
        <div className="box">{this.props.minus.a}</div>
        <div>
          <button
            onClick={this.minus}
          >点击数字减少</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Demo);