import React from './react';
import PropTypes from 'prop-types';

const Item = ({ name, url }) => (<a href={url}>{name}</a>);
Item.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

class Story extends React.Component {
  state = {
    like: Math.ceil(Math.random() * 100)
  };

  like = () => {
    this.setState({
      like: this.state.like + 1
    });
  };

  shouldComponentUpdate() {
    console.log('story exec shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('story will update');
  }

  componentDidUpdate() {
    console.log('story did update');
  }

  render() {
    const { name, url } = this.props;
    const { like } = this.state;
    return (
      <li>
        <button onClick={this.like}>{like}<b>❤️</b></button>
        <Item name={name} url={url} />
      </li>
    )
  }
}

class App extends React.Component {
  componentWillMount() {
    console.log('did mount');
  }

  componentDidMount() {
    console.log('did mount');
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  render() {
    return (
      <div>
        <h1>title</h1>
        <ul>
          {
            this.props.stories.map(story =>
              <Story {...story} />
            )
          }
        </ul>
      </div>
    )
  }
}


const stories = [
  {
    name: 'hehe',
    url: 'heihei',
  },
  {
    name: 'zhihu',
    url: 'https://www.zhihu.com'
  }
];
React.render(
  <App
    stories={stories}
  />,
  document.getElementById('app')
);