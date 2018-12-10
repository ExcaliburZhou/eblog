import React, { Component } from 'react';
import Second1 from '../Second1';
import Second2 from '../Second2';

class First extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    return {
      a: 2,
    };
  }

  state = {
    a: 1,
  };

  componentDidUpdate() {
    console.log('s did update');
    console.log(this.state);
  }

  render() {
    console.log('s will render');
    console.log(this.state);
    return (
      <div>
        <Second1 />
        <Second2 />
      </div>
    );
  }
}

export default First;