'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

const Mixin = (InnerComponent) => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = { val: 0 };
      this.update = this.update.bind(this);
    }

    componentWillMount() {
      console.log("Mounting ...");
    }
    update() {
      this.setState({
        val: this.state.val + 1
      });
    }

    render() {
      // Using ES6 destructuring we can set all attributes from state and props to our
      // passed in InnerComponent
      return <InnerComponent update={this.update} {...this.state} {...this.props} />;
    }
  
    componentDidMount() {
      console.log("Mounted ...");
    }

  }
}

const Button = (props) => {
  return <button onClick={props.update}>{props.txt} - {props.val}</button>;
}
const Label = (props) => {
  return <label onMouseMove={props.update}>{props.txt} - {props.val}</label>;
}

// Finally to mixin the two above components:
const ButtonMixed = Mixin(Button);
const LabelMixed = Mixin(Label);

class HigherOrder extends React.Component {
  render() {
    return (
      <div>
        <ButtonMixed txt="Teh Buttonz" />
        <LabelMixed txt="Label magic" />
      </div>
    );
  }
}

export default HigherOrder;
