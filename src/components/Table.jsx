import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';
import Filter from './Filter';

const Table = () => {
  const { planets, filterByName: { name },
    filterByNumericValues: [{ column, comparison, value }],
  } = useContext(StarwarsContext);

  const filterPlanetsByText = planets.filter((filtered) => filtered.name.toLowerCase()
    .includes(name, column, comparison, value))
    .map((planet) => (
      <tr key={ planet.name }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    ));

  return (
    <div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>{filterPlanetsByText}</tbody>
      </table>
    </div>
  );
};

export default Table;
