import React, { Component } from "react";

class Comtable extends Component {
  render() {
    return (
      <div className="container mt-3">
        <h2>Striped Rows</h2>
        <p>The .table-striped adds zebra-stripes to a table:</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{this.props.first[0].title}</th>
              <th>{this.props.last}</th>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.onChangeEmail();
                }}
              >
                <th>Email</th>
              </a>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.first[1].title}</td>
              <td>Doe</td>
              <td>{this.props.email}</td>
            </tr>
            <tr>
              <td>{this.props.first[2].title}</td>
              <td>Moe</td>
              <td>mary@example.com</td>
            </tr>
            <tr>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Comtable;
