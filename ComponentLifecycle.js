'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class Lifecycle extends React.Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.state = { increasing: false };
  }

  update() {
    // We can use this method to render our entire component with new props.
    // This is simulating the use of state keys, but with props. Props are read-only
    // from inside the component, like here, so setting it's value directly like we do
    // with state it's not possible. We will have to rerender the component and pass its
    // new props value inside the attr node like below
    ReactDOM.render(
      <Lifecycle val={this.props.val + 1} />,
      document.getElementById('lifecycle')
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This takes in the nextProps obj and the nextState obj.
    // Based on the incoming values we can decide if we want to let the component update or not
    // This expects to return a true/false value if the component is allowed to update or not
    return nextProps.val % 5 === 0; // We only update is the val si divisible by 5
  }

  // This method is a hook when passing props to our component. It will take as an argument the
  // next props that will be sent to our component
  componentWillReceiveProps(nextProps) {
   // nextProps is just like the this.props obj, but it contains the keys and values of how
   // the props obj will look after the update
   this.setState({
     // here we are checking if the next props.val value is greater than the current this.props.val value
     // and setting if the state.increasing is true or not
     increasing: nextProps.val > this.props.val
   });
  }

  render() {
    console.log("Increasing:", this.state.increasing);
    return (
      <button onClick={this.update}>{this.props.val}</button>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // Takes in our previous props and previous state values
    console.log("Previous props value:", prevProps.val);
  }
}

Lifecycle.defaultProps = { val: 0 };

export default Lifecycle;
