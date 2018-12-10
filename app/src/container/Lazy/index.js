import React, { Component } from 'react';

class Lazy extends Component {
  componentWillUpdate() {
    console.log('top2 will update');
  }

  componentDidUpdate() {
    console.log('top2 did update');
  }

  render() {
    console.log('top2 will render');
    return (
      <div>
        13444
      </div>
    );
  }
}

export default Lazy;