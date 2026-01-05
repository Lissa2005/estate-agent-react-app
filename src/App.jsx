import {useState} from "react";
import "./App.css";
import data from"./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchBar from "./components/SearchBar";

function App(){

  //search filter state
  const [filters, setFilters] = useState([]);

  //Favourites state Array
  const[favourites, setFavourites] = useState([]);

  //add to favourites (no duplicates)
  const addFavourites = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const handleDrop = (e) => {
    e.preventDafault();

    const propertyId = e.dataTransfer.getData("propertyId");
    const property = data.properties.find(p => p.id === propertyId);

    if (property && !favourites.find(f => f.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };


  // filtering logic
  const filteredProperties = data.properties.filter(property => {

    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.minBeds && property.bedrooms < filters.minBeds) return false;
    if (filters.maxBeds && property.bedrooms > filters.maxBeds) return false;

    if (filters.postcode && !property.location.toLowerCase().includes(filters.postcode.toLowercase)) return false;
    
    if (filters.afterDate) {
      const addedDate = new Date(
       '${property.added.month} ${property.added.day}, ${property.added.year}' 
      );
      if (addedDate < new Date(filters.afterDate)) return false;
    }

    return true;  
  });


  return(
    <div className="app">

      <SearchBar filters={filters} setFilters={setFilters} />

      <div className="container">

        {/* Property List */}
        <div className="all-items">
          <h1>Property Listings</h1>

          <div className="gallery">
            {data.properties.map(property => (
              <PropertyCard 
              key={property.id}
              property={property}
              onFavourite={addToFavourites}
              isFavourite={favourites.some(fav => fav.id === property.id)}
              />
              ))}
          </div>
        </div>

        {/* Favourite Drop Zone */}       
        <div className="favorites" onDragOver={(e) => e.preventDefault} onDrop={handleDrop}>
          <h2>Favourites</h2>

          {favourites.lenght === 0 && <p>No Favourites Yet</p>}

            <div className="gallery">
              {favourites.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onRemove={removeFromFavourites}
                  isFavourite={true}
                />
              ))}
            </div>
        </div>

      </div>
    </div>      
  );
}

export default App
