import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Second1 from '../Second1';
import Second2 from '../Second2';
import Second3 from '../Second3';

class First extends Component {
  componentDidUpdate() {
    console.log('s did update');
  }

  render() {
    console.log('s will render');
    return (
      <div>
        <Link to="second">second</Link>
        <Second1 />
        <Second2 />
        <Second3 />
      </div>
    );
  }
}

export default First;