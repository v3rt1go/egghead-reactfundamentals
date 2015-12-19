'use strict';
import React from 'react';

class Transpiler extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '/* add your jsx here */',
      output: '',
      error: ''
    };
    this.update = this.update.bind(this);
  }

  update(e) {
    const code = e.target.value;
    // We are grabbing babel from the html script that we've added in the 
    // head of the html file
    try {
      this.setState({
        // This is the babel api we are using
        output: babel.transform(code, {
          stage: 0,
          loose: 'all'
        }).code,
        // We need to set the error back to nothing when we don't have an error
        // else the last error message will persist in the view
        error: ''
      });
    } catch (err) {
      this.setState({
        error: err.message
      });
    }
  }

  render() {
    return (
      <div>
        <header>{this.state.error}</header>
        <div className="container">
          <textarea onChange={this.update} defaultValue={this.state.input}></textarea>
          <pre>
            {this.state.output}
          </pre>
        </div>
      </div>
    ); 
  }
}

export default Transpiler;
