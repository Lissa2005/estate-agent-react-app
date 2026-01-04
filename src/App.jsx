import "./App.css";
import data from"./data/properties.json";
import PropertyCard from "./components/PropertyCard";

function App(){
  return(
    <div className="app">
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
