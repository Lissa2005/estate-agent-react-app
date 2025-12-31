import data from"./data/properties.json";
import PropertyCard from "./components/PropertyCard";

function App(){
  return(
    <div style={{maxWidth: "800px", margin: "0 auto"}}>
      <h1>Property Listings</h1>

      {data.properties.map(property => (
        <PropertyCard key={property.id} property={property}/>
      ))}
    </div>
  );
}

export default App
