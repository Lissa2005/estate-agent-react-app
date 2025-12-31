function PropertyCard({ property }){
    return(
        <div style = {{
            border: "px soild #cc",
            padding: "10px",
            marginBottom: "10px"
        }}>
            <h3>{property.type}</h3>
            <p>£{property.price}</p>
            <p>{property.bedrooms}</p>
            <p>{property.location}</p>
        </div>
    );
}

export default PropertyCard;