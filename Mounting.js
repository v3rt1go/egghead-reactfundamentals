'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

// MOUNTING & UNMOUNTING a component - When a component is added or removed from the DOM
class Mount extends React.Component {
  constructor() {
    super();
    this.state = { val: 0 };
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    // This method is called when our component is fully prepped and ready to be mounted in the
    // browser. While render is called each time a change is made and the screen needs to be 
    // redrawn, the componentWillMount is called only once, before the component is mounted
    console.log("Mounting ...");
    // When the component is in this state we don't have access to the DOM but we have access
    // to the this.state and this.props
    this.setState({ m: 2 });
  }
  update() {
    this.setState({
      val: this.state.val + 1
    });
  }

  render() {
    console.log("Rendering!");
    return <button onClick={this.update}>{this.state.val * this.state.m}</button>
  }

  componentDidMount() {
    // This is called when our component has mounted and after the initial render.
    // While render() is called each time a change is made and the screen needs to be updated,
    // this method is only called once, after the initial render.
    console.log("Mounted ...");
    // In this stat we have access to the DOM, this.state and this.props
    console.log(ReactDOM.findDOMNode(this));
    // We can use this to trigger automated processes that should happen after a component has mounted
    // and rendered
    this.inc = setInterval(this.update, 500);
  }

  componentWillUnmount() {
    // This is called before a component will be removed from the DOM
    console.log("Unmounting ...");
    // This is usually used to clean-up any processes that we have running and are related
    // to the component
    // This component has a recurring function setInterval that runs every 500ms. If we don't clear it
    // on unmount then the method will still run and setState won't be able to set the state on an unmonted
    // component
    // This component has a recurring function setInterval that runs every 500ms. If we don't clear it
    // on unmount then the method will still run and setState won't be able to set the state on an unmonted
    // component. This will cause errors and will also cause issues when mounting back the component.
    // That is why we have to stop any execution that is happening on a component before it is unmounted
    clearInterval(this.inc);
  }
}

class Wrapper extends React.Component {
  // If we want to create the this context for this component we have
  // to add the constructor method - it is = to getInitialState() on classic
  // ES5 React.createClass component.
  constructor() {
    super();
  }

  mount() {
    ReactDOM.render(<Mount />, document.getElementById('a'));  
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'));
  }

  render() {
    return (
      <div>
        <button onClick={this.mount.bind(this)}>Mount</button>
        <button onClick={this.unmount.bind(this)}>Unmount</button>
        <div id="a"></div>
      </div>
    );
  }
}

export default Wrapper;
