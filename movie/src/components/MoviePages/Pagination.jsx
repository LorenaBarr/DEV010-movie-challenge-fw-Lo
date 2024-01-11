import PropTypes from "prop-types";
import "./buttonPage.css";

//tres propiedades: currentPage(página actual),
//totalPages(úmero total de páginas)
//onPageChange(función que se ejecuta cuando se cambia de página).

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 10;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  const startPage = Math.max(1, currentPage - halfVisiblePages);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
  // pageNumbers es un array que contiene los números de página que se mostrarán. Se utiliza Array.from para crear un array del tamaño correcto y luego se llena con números desde startPage hasta endPage.
  return (
    <div id="pagination">
      <button
        className="page"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          className="page"
          key={number}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))}

      <button
        className="page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
