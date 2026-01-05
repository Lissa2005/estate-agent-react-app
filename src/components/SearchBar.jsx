function SearchBar({ filters, setFilters }) {

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  }

  return (
    <section className="search-container">
      <h1>Property Search</h1>

      {/* GRID WRAPPER */}
      <div className="filter">

        <div>
          <label>Type</label>
          <select name="type" onChange={handleChange} value={filters.type || ""}>
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Maisonette">Maisonette</option>
          </select>
        </div>

        <div>
          <label>Min Price</label>
          <input type="number" name="minPrice" onChange={handleChange} />
        </div>

        <div>
          <label>Max Price</label>
          <input type="number" name="maxPrice" onChange={handleChange} />
        </div>

        <div>
          <label>Min Bedrooms</label>
          <input type="number" name="minBedrooms" onChange={handleChange} />
        </div>

        <div>
          <label>Max Bedrooms</label>
          <input type="number" name="maxBedrooms" onChange={handleChange} />
        </div>

        <div>
          <label>Postcode Area</label>
          <input type="text" name="postcode" onChange={handleChange} />
        </div>

        <div>
          <label>Added After</label>
          <input type="date" name="afterDate" onChange={handleChange} />
        </div>

      </div>
    </section>
  );
}

export default SearchBar;
