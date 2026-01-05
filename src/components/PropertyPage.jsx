import { useParams } from "react-router-dom";
import data from "../data/properties.json";
import Tabs from "./Tabs";

function PropertyPage() {
  const { id } = useParams();
  const property = data.properties.find(p => p.id === id);

  if (!property) return <h2>Property not found</h2>;

  return (
    <div className="property-page">

      <h1>{property.type}</h1>
      <p>{property.location}</p>
      <h2>£{property.price.toLocaleString()}</h2>

      <img
        src={property.picture}
        alt={property.type}
        style={{ width: "100%", borderRadius: "20px" }}
      />

      <Tabs property={property} />

    </div>
  );
}

export default PropertyPage;
