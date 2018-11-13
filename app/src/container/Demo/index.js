import React, { Component } from 'react';
import { plus } from '../../utils';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button>+</button>
        <button>-</button>
        { plus(1, 2) }
      </div>
    );
  }
}
