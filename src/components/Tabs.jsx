import { useState } from "react";

function Tabs({ property }) {
  const [activeTab, setActiveTab] = useState("desc");

  return (
    <div className="tabs">

      <div className="tab-buttons">
        <button onClick={() => setActiveTab("desc")}>Description</button>
        <button onClick={() => setActiveTab("floor")}>Floor Plan</button>
        <button onClick={() => setActiveTab("map")}>Map</button>
      </div>

      <div className="tab-content">
        {activeTab === "desc" && <p>{property.description}</p>}
        {activeTab === "floor" && <img src="/floorplan.png" alt="Floor Plan" />}
        {activeTab === "map" && (
          <iframe
            title="map"
            src={`https://maps.google.com/maps?q=${property.location}&output=embed`}
          />
        )}
      </div>

    </div>
  );
}

export default Tabs;
