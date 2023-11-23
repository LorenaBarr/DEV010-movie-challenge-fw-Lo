
import PropTypes from 'prop-types';  
import './buttonPage.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 10;  
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  // Math.floor se usa para redondear hacia abajo al número entero más cercano

  const startPage = Math.max(1, currentPage - halfVisiblePages);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  // Math.max - Math.min establecen el maximo y minimo de paginas al rededor de la pagina actual

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div id="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        First
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button key={number} onClick={() => onPageChange(number)} disabled={number === currentPage}>
          {number}
        </button>
      ))}
{/* //disabled se usa para deshabilitar los botones si el usuario está en la primera página */}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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