function PropertyCard({ property }){
    return(
        <div className="card">

            <div className="image">
                <img
                    src={property.images?.[0]}
                    alt={property.type}
                />
            </div>
            
            <div className="description">
                <h3>{property.type}</h3>
                <p>£{property.price}</p>
                <p>{property.bedrooms}</p>
                <p>{property.location}</p>
            </div>
            
        </div>
    );
}

export default PropertyCard;