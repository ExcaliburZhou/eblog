import React, { Component } from 'react';

class Lazy extends Component {
  componentWillUpdate() {
    console.log('lazy will update');
  }

  componentDidUpdate() {
    console.log('lazy2 did update');
  }

  render() {
    console.log('lazy render');
    return (
      <div>
        lazy
      </div>
    );
  }
}

export default Lazy;