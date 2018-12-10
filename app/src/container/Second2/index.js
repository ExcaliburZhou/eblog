import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.less';
import * as Actions from './actions';

const mapStateToProps = ({ demo }) => ({ demo });
const mapActionsToProps = dispatch => ({
  demoActions: bindActionCreators(Actions, dispatch)
});

const LazyComponent = lazy(() => import('../lazy'));

export class Demo extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    demo: PropTypes.object.isRequired,
    demoActions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('derived', state);
    return props.demo;
  }

  state = {
    a: 1,
  };

  componentDidMount() {
    console.log('didmount', this.state);
  }

  componentDidUpdate() {
    console.log('didupdate', this.state);
  }

  add = () => {
    this.props.demoActions.add(1);
  };

  importLazy = () => {
    this.setState({
      lazy: true,
    });
  };

  render() {
    const str = '<script>alert(1);</script>';
    return (
      <div>
        <div className="box">{this.props.demo.a}</div>
        <div>
          <button
            onClick={this.add}
          >点击数字增加</button>
          <button
            onClick={this.importLazy}
          >点击加载lazy</button>
          <div>{str}</div>
          {
            this.state.lazy &&
            <Suspense fallback={<div>loading</div>}>
              <LazyComponent />
            </Suspense>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Demo);