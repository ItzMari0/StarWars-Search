import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarwarsContext from './StarwarsContext';

const StarwarsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState('');

  useEffect(() => {
    const fetchStarwarsAPI = async () => {
      const request = await fetch('https://swapi.dev/api/planets');
      const { results } = await request.json();
      const updatedResults = await results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(updatedResults);
    };
    fetchStarwarsAPI();
  }, []);

  const planetsDescription = { planets,
    setFilterPlanets,
    filterByName: { name: filterPlanets },
  };

  return (
    <StarwarsContext.Provider value={ planetsDescription }>
      { children }
    </StarwarsContext.Provider>
  );
};

StarwarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarwarsProvider;
