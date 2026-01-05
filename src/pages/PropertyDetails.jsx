import { useParams } from "react-router-dom";
import data from "../data/properties.json";
import ImageGallery from "../components/ImageGallery";
import Tabs from "../components/Tabs";

function PropertyDetails(){
    
    const{id} =useParams();
    const property =data.properties.find(p => p.id === id);

    if (!property)return <p>Property not found.</p>;

    return (
        <div className="property-details">

            <h1>{property.type}</h1>
            <p>{property.location}</p>
            <p>£{property.price.toLocaleString()}</p>
            
            <ImageGallery images={property.picture} />

            <Tabs property={property} />

        </div>
    )

};

export default PropertyDetails;