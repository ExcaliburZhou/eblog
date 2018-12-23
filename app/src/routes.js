import First from './containers/First';
import Second2 from './containers/Second2';

export default [
  {
    path: '/',
    exact: true,
    component: First,
  },
  {
    path: '/second',
    exact: true,
    component: Second2,
  },
];