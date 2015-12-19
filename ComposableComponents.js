'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class Composable extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0,
      green: 0,
      blue: 0
    };
    this.update = this.update.bind(this);
  }
  
  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    });
  }
  
  render() {
    return (
      <div>
        <NumComponent ref="red" min={0} max={255} step={1} val={+this.state.red} label="Red"
          update={this.update} /> 
        <NumComponent ref="green" min={0} max={125} step={5} val={+this.state.green} label="Green"
          update={this.update} /> 
        <NumComponent ref="blue" min={0} max={255} step={2} val={+this.state.blue} type="number" label="Blue"
          update={this.update} /> 
      </div>    
    );
  }
}

class NumComponent extends React.Component {
  render() {
    const label = this.props.label !== '' ? 
      <label>{this.props.label} - {this.props.val}</label> : '';
    return (
      <div>
        <input ref="inp" 
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defultValue={this.props.val}
          onChange={this.props.update} />    
        {label}
      </div>
    );
  }
}
NumComponent.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  val: React.PropTypes.number,
  label: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
  type: React.PropTypes.oneOf(['number', 'range'])
};
NumComponent.defaultProps = {
  min: 0,
  max: 125,
  step: 1,
  val: 0,
  label: '',
  type: 'range'
}

export default Composable;
 
