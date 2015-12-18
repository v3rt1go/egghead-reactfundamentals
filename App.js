'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

// A class component can have STATE
class App extends React.Component {
    // STATE is defined inside the constructor method of an ES6 class react component
    constructor() {
        // We call super() to invoke the constructor of our extender class
        super();
        this.state = {
            txt: "This is the state txt",
            red: 0,
            green: 0,
            blue: 0
        };
        // Explicitly binding this inside a components constructor is very helpful
        // when we want to pass this method to another component, but we want to
        // make sure that it will reference the correct this
        this.update = this.update.bind(this);
    }
    
    // In order to update the state of a component we MUST use the this.setState
    // method, and never update state properties directly. Updating state properties
    // directly causes React to not update all the state related items with the change
    update(e) {
        this.setState({
            txt: e.target.value,
            // We'll be using ReactDOM to findDOMNode with the desired ref value to
            // update the corect state prop
            
            // Using js firstChild is one way of getting the input nested in the div tag
            // red: ReactDOM.findDOMNode(this.refs.red).firstChild.value,
            // green: ReactDOM.findDOMNode(this.refs.green).firstChild.value,
            // blue: ReactDOM.findDOMNode(this.refs.blue).firstChild.value
            // But we could also add a ref value to the input itself, and reference it
            // by continuing the refs chain inside findDOMNode
            red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
            green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
            blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
        });
    }
    
    // Class components are always expected to have the render() method
    // The render method of a react component is only allowed to return a single
    // node, so if we have to return more than one html node we must wrap them
    // inside a div
    render() {
        // const txt = this.props.txt;
        // When working with custom methods that we defined inside our components
        // like this.update from onChange - only for ES6 classes - we have to explicitly
        // bind this to the component, else it will be undefined, because the method is called
        // from the onChange event. If explicitly binding the method like so:
        // onChange={this.update.bind(this)} is too much, then we can explicitly bind it and assign
        // it to this inside the component's constructor method
        // return (
        //     <div>
        //         <h1>{txt}</h1>
        //         <h2>{this.state.txt}</h2>
        //         <input type="text" onChange={this.update.bind(this)} 
        //             placeholder="fill in some state txt" />
        //     </div>
        // );
        // The above JSX code is equivalent to:
        // return React.createElement('h1', null, 'Hello from JS');
        // The second parameter is for props - here we can define the props obj
        // The last param is the value that will go inside the created element
        
        // On update={this.update} we use the bound update that we've declare in our
        // constructor
        return (
            <div>
                <Widget txt={this.state.txt} propsTxt={this.props.txt} update={this.update} />
                <Widget txt={this.state.txt} propsTxt={this.props.txt} update={this.update} />
                <Widget txt={this.state.txt} propsTxt={this.props.txt} update={this.update} />
                <hr />
                {this.state.txt}
                {
                    /* we want each Slider component to update the value of either red, green
                    or blue - for this we will need to edit the update() method and add the
                    ref="state prop name" attribute on the widget */
                }
                <Slider ref="red" update={this.update} /> 
                {this.state.red}
                <br />
                <Slider ref="green" update={this.update} />
                {this.state.green}
                <br />
                <Slider ref="blue" update={this.update} />
                {this.state.blue}
                <br />
            </div>    
        );
    }
}

// PROPS are ment to be passed into our components as static values or methods, 
// and are primarily used for transfering data between components or getting 
// data into a component from an outside source

// We can also define the property types and key that we are expecting our 
// component to have, using React.PropTypes. This is simillar to a mongoose schema
// It can also be used to set up some amount of validation on props
App.propTypes = {
    txt: React.PropTypes.string, // txt is not mandatory, and accepts strings
    cat: React.PropTypes.number.isRequired, // cat is mandatory and accepts only numbers
    red: React.PropTypes.number,
    green: React.PropTypes.number,
    blue: React.PropTypes.number
};

// We can setup default props for our component:
// If a prop is not passed to the component it will use the default value 
App.defaultProps = {
    txt: "Foo Bar Baz default"
}

// STATE, unlike props is primarily used to manage data that is meant to be managed
// by the component itself

// A stateless function will not have STATE
// Creating a stateless function component
// This is another way of creating components with react
// const App = () => <h1>Hello Eggheads</h1>;
// The above is the same as writing
// const App = () => {
//     return <h1>Hello Eggheads2</h1>;
// };

// NESTED COMPONENTS
// When one component updates another component - this is what react refers to 
// as owner - ownee relation. The parent component is also called a composite
// component
// With stateless components we need to pass in the props object as an argument
// and it will reference the props object of the owner (parent component)
const Widget = (props) => {
    // This widget will actually update the state value of our parent component 
    return (
        <div>
            <h1>{props.propsTxt}</h1>
            <h2>{props.txt}</h2>
            <input type="text" onChange={props.update} placeholder="fill in some state txt" />
        </div>
    );
}

// Using refs to access components - resf are a way to reference an instance of a
// component from within our application
// We are going to take the example above, and recreate it - but we'll change it
// so that the widget will update it's own state. Refs do not work with stateless
// components, so we'll need to create a new one, with state
// With normal - with state - components we don't need to explicitly pass the props
// object. Any props attribute passed to the component as a html attribute will be
// automatically assigned to the this.props object of the ownee (child component) 
class Slider extends React.Component {
    render() {
        return (
            <div>
                <input ref="inp" type="range" min="0" max="255" 
                    onChange={this.props.update} />    
            </div>
        );
    }
}

export default App;