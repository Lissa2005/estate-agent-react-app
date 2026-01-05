function PropertyCard({ property, onFavourite, onRemove, isFavourite }){
    return(
        <div className="card"
            draggable
            onDragStart={ (e) =>
                e.dataTransfer.setData("propertyId", property.id)
            }
        >
            <div className="image">
                <img 
                    src={property.picture}
                    alt={property.type}
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

                <div className="actions">
                    {!isFavourite && (
                        <button onClick={() => onFavourite(property)}>
                        ❤️ Add to Favourites
                        </button>
                    )}

                    {isFavourite && (
                        <button onClick={() => onRemove(property.id)}>
                            ❌ Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;