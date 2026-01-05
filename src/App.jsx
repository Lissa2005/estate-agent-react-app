import {useState} from "react";
import "./App.css";
import data from"./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchBar from "./components/SearchBar";

function App(){

  //search filter state
  const [filters, setFilters] = useState({});

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
    }

    return true;
  });


  return(
    <div className="app">

      <SearchBar filters={filters} setFilters={setFilters} />
      <div className="container">
        
        <div className="all-items">
          <h1>Property Listings</h1>

          <div className="gallery">
            {data.properties.map(property => (
              <PropertyCard 
              key={property.id}
              property={property}/>
              ))}
          </div>
        </div>
        
        <div className="favorites">
          <h2>Favourites</h2>
          <div className="gallery">
            {/*Favourites will go here later*/}
          </div>
        </div>
      </div>
    </div>      
  );
}

export default App
