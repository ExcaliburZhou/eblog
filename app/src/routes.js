import React from 'react';
import Loadable from 'react-loadable';
import Demo from './container/Demo';

export default [
  {
    path: '/',
    exact: true,
    component: Demo,
  },
  {
    path: '/second',
    component: Loadable({
      loader: () => import('./container/Second'),
      loading: () => <div>loading</div>,
    })
  }
];