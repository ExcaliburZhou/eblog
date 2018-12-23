import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  state = {
    error: null
  };

  componentWillUnmount() {
    console.log('3333');
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    }
    return this.props.children;
  }
}