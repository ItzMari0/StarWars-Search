import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const Filter = () => {
  const { setFilterPlanets } = useContext(StarwarsContext);

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (event) => setFilterPlanets(event.target.value) }
        />
      </label>
      <label htmlFor="select-input-one">
        <select
          datatestid="column-filter"
        //  onChange={}
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="select-input-two">
        <select
          datatestid="comparison-filter"
        //  onChange={}
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="number-search-input">
        <input
          type="number"
          data-testid="value-filter"
        //  onChange={}
        />
      </label>
    </div>
  );
};

export default Filter;
