import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const Filter = () => {
  const { planets, setPlanets, setFilterPlanets, setColumnFilter,
    setComparisonFilter, setValueFilter, columnOptions, setColumnOptions,
    filterByNumericValues: [{ column, comparison, value }],
  } = useContext(StarwarsContext);

  const handleClick = () => {
    setColumnOptions((prevState) => {
      const optionsFilter = prevState.filter((option) => option !== column);
      return optionsFilter;
    });

    setColumnFilter(columnOptions[1]);

    if (comparison === 'maior que') {
      setPlanets(planets
        .filter((filtered) => Number(filtered[column]) > Number(value)));
    } else if (comparison === 'menor que') {
      setPlanets(planets
        .filter((filtered) => Number(filtered[column]) < Number(value)));
    } else {
      setPlanets(planets
        .filter((filtered) => Number(filtered[column]) === Number(value)));
    }
  };

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
          data-testid="column-filter"
          name="column"
          value={ column }
          onChange={ (event) => setColumnFilter(event.target.value) }
        >
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="select-input-two">
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ comparison }
          onChange={ (event) => setComparisonFilter(event.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number-search-input">
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ value }
          onChange={ (event) => setValueFilter(event.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
};

export default Filter;
