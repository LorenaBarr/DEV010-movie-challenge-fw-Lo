
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/MoviePages/Pagination';

describe('Pagination', () => {
  it('renders pagination buttons correctly', () => {
    // Mock propiedades necesarias para el componente
    const currentPage = 3;
    const totalPages = 10;
    const onPageChange = jest.fn();

    // Renderiza el componente con las props
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);

    // Verifica que los botones se renderizan correctamente
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    // Verifica que los botones de páginas se renderizan correctamente
    for (let i = 1; i <= totalPages; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('calls onPageChange correctly when a button is clicked', () => {
    // Mock propiedades necesarias para el componente
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

  // Agrega más pruebas según sea necesario
});