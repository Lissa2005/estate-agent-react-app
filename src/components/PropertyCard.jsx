function PropertyCard({ property }){
    return(
        <div className="card">
            <div className="image">
                <img 
                    src={property.picture}
                    alt={'${property.type} in ${property.location}'}
                />
            </div>

            <div className="description">
                <h3>{property.type}</h3>
                <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Tenture:</strong> {property.tenture}</p>
                <p>{property.location}</p>
                <small>
                    Added: {property.added.day} {property.added.month} {property.added.year}
                </small>
            </div>
        </div>
    );
}

export default PropertyCard;