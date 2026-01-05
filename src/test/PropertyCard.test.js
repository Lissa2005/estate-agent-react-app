import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';

describe('PropertyCard', () => {
  const property = {
    id: '123',
    picture: ['img1.jpg'],
    type: 'Apartment',
    price: 250000,
    bedrooms: 3,
    tenure: 'Leasehold',
    location: 'London',
    added: { day: 12, month: 'Oct', year: 2023 },
  };

  test('renders property details correctly', () => {
    render(
      <MemoryRouter>
        <PropertyCard property={property} />
      </MemoryRouter>
    );

    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('Price: £250,000')).toBeInTheDocument();
    expect(screen.getByText('Bedrooms: 3')).toBeInTheDocument();
    expect(screen.getByText('Leasehold')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Added: 12 Oct 2023')).toBeInTheDocument();
  });

  test('renders add to favourites button when not favourite', () => {
    render(
      <MemoryRouter>
        <PropertyCard property={property} isFavourite={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('❤️ Add to Favourites')).toBeInTheDocument();
  });

  test('renders remove button when favourite', () => {
    const mockRemove = jest.fn();
    render(
      <MemoryRouter>
        <PropertyCard property={property} isFavourite={true} onRemove={mockRemove} />
      </MemoryRouter>
    );

    const removeButton = screen.getByText('❌ Remove');
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(mockRemove).toHaveBeenCalledWith('123');
  });

  test('calls onFavourite when add button clicked', () => {
    const mockFavourite = jest.fn();
    render(
      <MemoryRouter>
        <PropertyCard property={property} isFavourite={false} onFavourite={mockFavourite} />
      </MemoryRouter>
    );

    const favButton = screen.getByText('❤️ Add to Favourites');
    fireEvent.click(favButton);
    expect(mockFavourite).toHaveBeenCalledWith(property);
  });

  test('sets dataTransfer data on drag start', () => {
    render(
      <MemoryRouter>
        <PropertyCard property={property} />
      </MemoryRouter>
    );

    const card = screen.getByRole('region') || screen.getByText('Apartment').closest('.card');
    // Since the 'div' has no role, select it directly:
    const draggableDiv = document.querySelector('.card');

    const dataTransfer = {
      setData: jest.fn(),
    };

    fireEvent.dragStart(draggableDiv, { dataTransfer });

    expect(dataTransfer.setData).toHaveBeenCalledWith('propertyId', '123');
  });
});