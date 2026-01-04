function SearchBar({ filter,setFilters}) {

    function handleChange(event){
        setFilters({
            ...filter,
            [event.target.name]: event.target.value
        });
    }

    return(
        <section>

            <h1>Property Search</h1>

            <label>Type</label>

            <select name="type" onChange={handleChange}>
                <option value="">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
            </select>

            <label>Min Price</label>
            <input type="number" name="minPrice" onChange={handlechange}/>

            <lable>Max Price</lable>
            <input type="number" name="maxPrice" onChange={handleChange}/>

            <label>Min Bedrooms</label>
            <input type="number" name="minBeds" onChange={handleChange}/>

            <label>Max Bedrooms</label>
            <input type="number" name="maxBeds" onChange={handleChange}/>

        </section>


    );
}

export default SearchBar