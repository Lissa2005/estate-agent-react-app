import { useParams } from "react-router-dom";
import data from "../data/properties.json";
import Tabs from "./Tabs";

function PropertyPage() {
  const { id } = useParams();
  const property = data.properties.find(p => p.id === id);

  if (!property) return <p>Property not found</p>;

  return (
    <div className="property-page">
      <h1>{property.type}</h1>
      <img src={property.picture} alt={property.type} />
      <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
      <p>{property.location}</p>

      {/* TABS USED HERE */}
      <Tabs property={property} />
    </div>
  );
}

export default PropertyPage;
