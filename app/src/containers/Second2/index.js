import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loadable from 'react-loadable';
import ErrorBoundary from '../../components/ErrorBoundary';
import './index.less';
import * as Actions from './actions';

const mapStateToProps = ({ demo }) => ({ demo });
const mapActionsToProps = dispatch => ({
  demoActions: bindActionCreators(Actions, dispatch)
});

const LazyComponent = Loadable({
  loader: () => import('../lazy'),
  loading: () => <div>loading</div>,
});

export class Demo extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    // demo: PropTypes.object.isRequired,
    demoActions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('second2 derived', state);
    console.log(props.demo);
    return null;
  }

  state = {
    a: 1,
  };

  componentDidMount() {
    console.log('second2 didMount', this.state);
    setTimeout(() => {
      this.setState(state => ({ a: state.a + 5 }));
    }, 5000);
  }

  componentDidUpdate() {
    console.log('second2 didUpdate', this.state);
  }

  add = () => {
    this.props.demoActions.add(1);
  };

  importLazy = () => {
    this.setState({
      lazy: true,
    });
  };

  createError = () => {
    this.setState({
      error: true
    });
  };

  render() {
    return (
      <div>
        <div className="box">{this.state.a}</div>
        <div>
          <button
            onClick={this.add}
          >点击数字增加</button>
          <button
            onClick={this.importLazy}
          >点击加载lazy</button>
          <button
            onClick={this.createError}
          >点击触发Error错误</button>
          {
            this.state.lazy &&
            <LazyComponent />
          }
          <ErrorBoundary>
            <div>
              {this.state.error ? this.state : this.state.a}
            </div>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Demo);