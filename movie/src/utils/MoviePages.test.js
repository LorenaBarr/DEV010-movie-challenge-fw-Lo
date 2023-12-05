
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/MoviePages/Pagination';

describe('Pagination', () => {
  it('renders pagination buttons correctly', () => {
    // el componente Pagination se renderiza con los botones de paginación correctamente.
    const currentPage = 3;
    //declara una constante que contiene el número de la página 
    //actual que se va a pasar al componente como prop.
    const totalPages = 10;
    const onPageChange = jest.fn();
    //constante que contiene una función vacía de jest que se va 
    //a pasar al componente como prop. Esta función se usa para 
    //manejar el cambio de página cuando se hace clic en un botón.

    // Renderiza el componente con las props
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    // Verifica que los botones se renderizan correctamente
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    // a función expect de jest para hacer una afirmación 
    //sobre el comportamiento esperado del código

    // Verifica que los botones de páginas se renderizan correctamente
    for (let i = 1; i <= totalPages; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
    // inicia un bucle for que recorre los números desde 
    //1 hasta el número de páginas totales.
    //se espera que el elemento que tiene el texto del número de 
    //la iteración esté en el documento, lo que se comprueba 
    //con el método toBeInTheDocument
  });

  it('calls onPageChange correctly when a button is clicked', () => {
    // onPageChange se llama correctamente cuando se hace clic en un botón. 
    const currentPage = 3;
    const totalPages = 10;
    const onPageChange = jest.fn();

    // Renderiza el componente con las props
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    // Simula un clic en el botón "Next"
    fireEvent.click(screen.getByText('Next'));

    // Verifica que onPageChange se llama correctamente
    expect(onPageChange).toHaveBeenCalledWith(currentPage + 1);
  });

 
});