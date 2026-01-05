import React from 'react';

// Sample data: you can replace this with actual data or pass it via props
const properties = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    description: "Attractive three bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes and National Trust woodland. The property comprises; two receptions, fitted 18'9 x 10'1 kitchen/breakfast room and conservatory. The property also benefits from having a utility room and cloakroom. To the first floor there are three bedrooms and a family bathroom with separate WC. Additional features include double glazing, gas central heating and a well presented interior.",
    location: "Petts Wood Road, Petts Wood, Orpington BR5",
    picture: ["images/prop1pic1small.jpg"],
    url: "properties/prop1.html",
  },
  // Add other properties as needed...
];

const FavouriteList = () => {
  // You could manage the list of favorite properties with state if needed
  const favoriteProperties = properties; // For now, static list

  return (
    <div>
      <h2>My Favourite Properties</h2>
      {favoriteProperties.length === 0 ? (
        <p>You have no favourite properties.</p>
      ) : (
        <ul>
          {favoriteProperties.map((property) => (
            <li key={property.id} style={{ marginBottom: '20px', listStyle: 'none' }}>
              <a href={property.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black' }}>
                <h3>{property.type} - {property.bedrooms} Bedrooms</h3>
                <img src={property.picture[0]} alt={property.type} style={{ width: '200px', height: 'auto' }} />
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
                <p>{property.description.substring(0, 100)}...</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouriteList;