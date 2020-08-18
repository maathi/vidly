import React, { Component } from "react";
class Pager extends Component {
  state = {};
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                this.props.onPageClick(1);
              }}
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                this.props.onPageClick(2);
              }}
            >
              2
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                this.props.onPageClick(3);
              }}
            >
              3
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pager;
