import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './index.less';
import * as Actions from './actions';
import Second from '../Second';

const mapStateToProps = ({ demo }) => ({ demo });
const mapActionsToProps = dispatch => ({
  demoActions: bindActionCreators(Actions, dispatch)
});

export class Demo extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    demo: PropTypes.object.isRequired,
    demoActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    console.log(this.context.store.getState().demo.a);
  }

  importUtils = () => {
    const { demoActions } = this.props;
    demoActions.add();
  };

  render() {
    console.log(this.context.store.getState().demo.a);
    return (
      <div>
        <div className="box">{this.props.demo.a}</div>
        <button
          onClick={this.importUtils}
        >点击加载</button>
        <Link to="/second">跳转</Link>
        <Second />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Demo);