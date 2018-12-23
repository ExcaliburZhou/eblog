import React, { Component } from 'react';

class Second extends Component {
  componentWillUpdate() {
    console.log('second1 will update');
  }

  componentDidUpdate() {
    console.log('second1 did update');
  }

  render() {
    console.log('second1 will render');
    return (
      <div>
        second1first1
      </div>
    );
  }
}

export default Second;