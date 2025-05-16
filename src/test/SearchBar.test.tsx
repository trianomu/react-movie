import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/movies/Searchbar';

test('calls onSearch with query when submit is clicked', () => {
  const mockOnSearch = jest.fn();
  render(<SearchBar onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText('Find your movies...');
  fireEvent.change(input, { target: { value: 'Inception' } });

  const button = screen.getByText('Search');
  fireEvent.click(button);

  expect(mockOnSearch).toHaveBeenCalledWith('Inception');
});
