import Link from "next/link";
import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = props => {
  const { page, pages, keyword = "" } = props;

  return (
    pages > 1 && (
      <Pagination className="d-flex justify-content-center my-3">
        {[...Array(pages).keys()].map(x => (
          <Link
            key={x + 1}
            href={keyword ? `?p=${x + 1}&k=${keyword}` : `?p=${x + 1}`}
            passHref
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </Link>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
