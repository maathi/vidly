import React from "react";
import propTypes from "prop-types";

const Pager = (props) => {
  const { pageCount, page, onPageClick } = props;

  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {[...Array(pageCount).keys()].map((i) => {
          return (
            <li
              key={i}
              className={page == i + 1 ? "page-item active" : "page-item"}
            >
              <a
                className="page-link"
                onClick={() => {
                  onPageClick(i + 1);
                }}
              >
                {i + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pager.propTypes = {
  numberOfMovies: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  page: propTypes.number.isRequired,
  onPageClick: propTypes.func.isRequired,
};
export default Pager;
