import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import data from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchBar from "./components/SearchBar";
import PropertyPage from "./components/PropertyPage";

// FavouriteList component
const FavouriteList = ({ favourites, onRemove }) => {
  return (
    <div>
      <h2>My Favourite Properties</h2>
      {favourites.length === 0 ? (
        <p>You have no favourite properties.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {favourites.map((property) => (
            <li key={property.id} style={{ marginBottom: '20px' }}>
              <a
                href={property.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <h3>
                  {property.type} - {property.bedrooms} Bedrooms
                </h3>
                <img
                  src={property.picture[0]}
                  alt={property.type}
                  style={{ width: '200px', height: 'auto' }}
                />
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <strong>Price:</strong> £{property.price.toLocaleString()}
                </p>
                <button onClick={() => onRemove(property.id)}>Remove</button>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function App() {
  const [filters, setFilters] = useState({});
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (property) => {
    if (!favourites.find((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const property = data.properties.find((p) => p.id === propertyId);
    if (property) addFavourite(property);
  };

  const filteredProperties = data.properties.filter((property) => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.minBeds && property.bedrooms < filters.minBeds) return false;
    if (filters.maxBeds && property.bedrooms > filters.maxBeds) return false;

    if (
      filters.postcode &&
      !property.location.toLowerCase().includes(filters.postcode.toLowerCase())
    )
      return false;

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
      {/* Navigation links */}
      <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/favourites">My Favourites</Link>
      </nav>

      <Routes>
        {/* HOME / SEARCH PAGE */}
        <Route
          path="/"
          element={
            <>
              <SearchBar filters={filters} setFilters={setFilters} />

              <div className="container" style={{ display: 'flex', gap: '20px' }}>
                <div className="all-items" style={{ flex: 3 }}>
                  <h1>Property Listings</h1>

                  <div className="gallery" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onFavourite={addFavourite}
                        isFavourite={favourites.some((fav) => fav.id === property.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Favourites Sidebar */}
                <div
                  className="favorites"
                  style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <h2>Favourites</h2>
                  <div className="gallery" style={{ display: 'flex', flexDirection: 'column' }}>
                    {favourites.map((property) => (
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

        {/* Favourites Page */}
        <Route
          path="/favourites"
          element={
            <FavouriteList favourites={favourites} onRemove={removeFromFavourites} />
          }
        />

        {/* PROPERTY DETAILS PAGE */}
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </div>
  );
}

export default App;