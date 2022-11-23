import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ data, setData }: Props) {

  const [itemOffset, setItemOffset] = React.useState(0);

  const pageCount = Math.ceil(data.length / 3);

  const handlePageClick = React.useCallback((event: any) => {
    const newOffset = (event.selected * 3) % data.length;
    setItemOffset(newOffset);
    const endOffset = newOffset + 3;
    const currentItems = data.slice(newOffset, endOffset);
    setData(currentItems)
  }, [itemOffset]);

  React.useEffect(() => {
    const currentItems = data.slice(0, 3);
    setData(currentItems)
  }, [data])

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      activeClassName={'page-item  item active '}
      breakClassName={'page-link '}
      containerClassName={'pagination justify-content-end '}
      disabledClassName={'disabled-page'}
      marginPagesDisplayed={2}
      nextClassName={"page-item "}
      pageClassName={'page-item '}
      previousClassName={"page-item"}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
      activeLinkClassName={'page-link'}
      disabledLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
    />
  )
}

interface Props {
  data: Object[];
  setData: any;
}