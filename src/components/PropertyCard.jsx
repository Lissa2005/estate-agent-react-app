
import  { Link } from "react-router-dom";

function PropertyCard({ property, onFavourite, onRemove, isFavourite }){
    return(
        <div className="card"
            draggable
            onDragStart={ (e) =>
                e.dataTransfer.setData("propertyId", property.id)
            }
        >
            
            <Link to={'/property/${property.id}'}>
            <div className="image">
                <img 
                    src={property.picture[0]}
                    alt={property.type}
                />
            </div>
            </Link>

            <div className="description">
                <h3>{property.type}</h3>
                <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Tenure:</strong> {property.tenure}</p>
                <p>{property.location}</p>
                <small>
                    Added: {property.added.day} {property.added.month} {property.added.year}
                </small>

                <div className="actions">
                    {!isFavourite && onFavourite &&(
                        <button onClick={() => onFavourite(property)}>
                        ❤️ Add to Favourites
                        </button>
                    )}

                    {isFavourite && onRemove &&(
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