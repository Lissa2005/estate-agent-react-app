function SearchBar({ filters,setFilters}) {

    function handleChange(event){
        setFilters({
            ...filter,
            [event.target.name]: event.target.value
        });
    }

    return(
        <div className="filter">

            <h1>Property Search</h1>

            <label>Type</label>

            <select name="type" onChange={handleChange}>
                <option value="">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
            </select>

            <div>
            <label>Min Price</label>
            <input type="number" name="minPrice" onChange={handleChange}/>
            </div>

            <div>
            <label>Max Price</label>
            <input type="number" name="maxPrice" onChange={handleChange}/>
            </div>

            <div>
            <label>Min Bedrooms</label>
            <input type="number" name="minBeds" onChange={handleChange}/>
            </div>

            <div>
            <label>Max Bedrooms</label>
            <input type="number" name="maxBeds" onChange={handleChange}/>
            </div>

            <div>
            <label>Postcode Area</label>
            <input type="text" name="posrcode" onChange={handleChange} />
            </div>

            <div>
            <label>Added After</label>
            <input type="date" name="afterDate" onChange={handleChange} />
            </div>
        </div>


    );
}

export default SearchBar