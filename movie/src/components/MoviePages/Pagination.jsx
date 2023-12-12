import PropTypes from 'prop-types';
import './buttonPage.css';
// Definimos el componente Pagination que muestra una paginación de las películas
// Recibimos como props los valores currentPage, totalPages y la función onPageChange 
//que se encargan de manejar el cambio de página, pero entonces aca no conincide con movieSearch y app
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 10;
  // Definimos una constante maxVisiblePages que indica el número máximo de páginas visibles en la paginación
    // Definimos una constante halfVisiblePages que indica la mitad del número máximo de páginas visibles
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

   // Definimos una constante startPage que indica la primera página visible en la paginación
  // Usamos la función Math.max para asegurarnos de que el valor sea al menos 1
  // Restamos al valor de currentPage la mitad de las páginas visibles para centrar la paginación en torno a la página actual
  const startPage = Math.max(1, currentPage - halfVisiblePages);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  // Definimos una constante endPage que indica la última página visible en la paginación
  // Usamos la función Math.min para asegurarnos de que el valor no sea mayor que el total de páginas
  // Sumamos al valor de startPage el número máximo de páginas visibles menos 1 para obtener el rango de páginas visibles
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
 // Definimos una constante pageNumbers que es un array que contiene los números de las páginas visibles
  // Usamos la función Array.from para crear un array a partir de un objeto con la propiedad length igual al número de páginas visibles
  // Usamos una función de mapeo para asignar a cada elemento del array el valor del número de página correspondiente, sumando el índice al valor de startPage
   
  // Retornamos el JSX que representa la interfaz del componente Pagination
  return (
    // Creamos un botón para ir a la primera página
      // Usamos la prop onClick para asignar la función onPageChange que viene del componente 
      //padre App y le pasamos como argumento el valor 1
      // Usamos la prop disabled para deshabilitar el botón si la página actual es igual a 1
        // Creamos un botón para ir a la página anterior
      // Usamos la prop onClick para asignar la función onPageChange que viene del componente padre App y le pasamos como argumento el valor de currentPage menos 1
      // Usamos la prop disabled para deshabilitar el botón si la página actual es igual a 1
       // Recorremos el array pageNumbers con el método map para crear un botón por cada número de página
       // Creamos un botón para ir a la página correspondiente al número
        // Usamos la prop key para asignar un identificador único al botón, usando el valor del número
        // Usamos la prop onClick para asignar la función onPageChange que viene del componente padre App y le pasamos como argumento el valor del número
        // Usamos la prop disabled para deshabilitar el botón si el número es igual a la página actual
         // Creamos un botón para ir a la página siguiente
      // Usamos la prop onClick para asignar la función onPageChange que viene del componente padre App y le pasamos como argumento el valor de currentPage más 1
      // Usamos la prop disabled para deshabilitar el botón si la página actual es igual al total de páginas
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

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

// Definimos las propiedades que recibe el 
//componente Pagination y sus tipos con la librería PropTypes
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
   // currentPage es un número que indica la página actual de la paginación
  totalPages: PropTypes.number.isRequired,
   // totalPages es un número que indica el total de páginas de la paginación
  onPageChange: PropTypes.func.isRequired,
   // onPageChange es una función que se encarga de actualizar el estado y los datos del componente padre App según la página seleccionada
};

export default Pagination;