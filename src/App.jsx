import { useState } from "react";
import "./App.css";
import data from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchBar from "./components/SearchBar";

function App() {

  // Search filters (object, not array)
  const [filters, setFilters] = useState({});

  // Favourites
  const [favourites, setFavourites] = useState([]);

  // Add to favourites
  const addFavourite = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  // Remove from favourites
  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const property = data.properties.find(p => p.id === propertyId);
    if (property) addFavourite(property);
  };

  // Filtering logic
  const filteredProperties = data.properties.filter(property => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.minBeds && property.bedrooms < filters.minBeds) return false;
    if (filters.maxBeds && property.bedrooms > filters.maxBeds) return false;

    if (
      filters.postcode &&
      !property.location.toLowerCase().includes(filters.postcode.toLowerCase())
    ) return false;

    if (filters.afterDate) {
      const addedDate = new Date(
        `${property.added.month} ${property.added.day}, ${property.added.year}`
      );
      if (addedDate < new Date(filters.afterDate)) return false;
    }

    return true;
  });

  return (
    <div className="app">
      <SearchBar filters={filters} setFilters={setFilters} />

      <div className="container">

        {/* Property List */}
        <div className="all-items">
          <h1>Property Listings</h1>

          <div className="gallery">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavourite={addFavourite}
                isFavourite={favourites.some(fav => fav.id === property.id)}
              />
            ))}
          </div>
        </div>

        {/* Favourites */}
        <div
          className="favorites"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <h2>Favourites</h2>

          {favourites.length === 0 && <p>No favourites yet</p>}

          <div className="gallery">
            {favourites.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onRemove={() => removeFromFavourites(property.id)}
                isFavourite={true}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
