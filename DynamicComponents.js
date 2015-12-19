'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

// We want to generate components dynamically from a dataset
class Dynamic extends React.Component {
  constructor() {
    super();
    this.state = {data: [
      {id: 1, name: "Alex Griciuc"},
      {id: 2, name: "Nicoleta Griciuc"},
      {id: 3, name: "Emma Griciuc"},
      {id: 4, name: "Ciprian Nuta"},
      {id: 5, name: "Raluca Nuta"},
      {id: 6, name: "Alex Burlac"},
      {id: 7, name: "Anca Stroescu"},
      {id: 8, name: "Irina Aldoescu"},
      {id: 9, name: "Oana Birzu"},
      {id: 10, name: "Andrei Ioana"},
      {id: 11, name: "Sanziana Matei"},
      {id: 12, name: "Gabi Patr"},
      {id: 13, name: "Dan Silviu"},
      {id: 14, name: "Ioana Dan"},
      {id: 15, name: "Diana Dan"},
      {id: 16, name: "Oprica Mitica"},
      {id: 17, name: "Jean-Luc Picard"},
      {id: 18, name: "Jim Raynor"},
      {id: 19, name: "Sarah Kerrigan"},
    ]};
  }

  render() {
    const rows = this.state.data.map((person) => {
      // When iterating and building components from an iteration a unique key is required
      // for each dynamic component amongst the siblings of an iteration. Considering that we
      // only need the key on the siblings, it's enough to only set it on PersonRow and not on
      // tr, since that has no siblings
      return <PersonRow key={person.id} data={person} />;
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );   
  }
}

const PersonRow = (props) => {
  return (
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.name}</td>
    </tr>
  );
}

export default Dynamic;
