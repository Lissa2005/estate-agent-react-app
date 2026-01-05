import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import data from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchBar from "./components/SearchBar";
import PropertyPage from "./components/PropertyPage";

function App() {
  const [filters, setFilters] = useState({});
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const property = data.properties.find(p => p.id === propertyId);
    if (property) addFavourite(property);
  };

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
      <Routes>

        {/* HOME / SEARCH PAGE */}
        <Route
          path="/"
          element={
            <>
              <SearchBar filters={filters} setFilters={setFilters} />

              <div className="container">
                <div className="all-items">
                  <h1>Property Listings</h1>

                  <div className="gallery">
                    {filteredProperties.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onFavourite={addFavourite}
                        isFavourite={favourites.some(
                          fav => fav.id === property.id
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="favorites"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <h2>Favourites</h2>

                  <div className="gallery">
                    {favourites.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onRemove={() => removeFromFavourites(property.id)}
                        isFavourite
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          }
        />

        {/* PROPERTY DETAILS PAGE */}
        <Route path="/property/:id" element={<PropertyPage />} />

      </Routes>
    </div>
  );
}

export default App;
