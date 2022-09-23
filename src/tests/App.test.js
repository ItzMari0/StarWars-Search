import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('testa as o componente App', () => {
beforeEach(() => {
  cleanup();
  jest.spyOn(global, 'fetch')
  .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }));
});

  it('a API é chamada', async () => {
    render(<App />);
    
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
  });

  it('os inputs, selects e buttons estão presentes na tela', () => {
    render(<App />);
    
    const textInput = screen.getByTestId('name-filter');
    expect(textInput).toBeInTheDocument();

    const columnSelect = screen.getByTestId('column-filter');
    expect(columnSelect).toBeInTheDocument();

    const comparisonSelect = screen.getByTestId('comparison-filter');
    expect(comparisonSelect).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();

    const filterBtn = screen.getByTestId('button-filter');
    expect(filterBtn).toBeInTheDocument();
  });

  it('a Tabela é renderizada', async () => {
    render(<App />);
    
    const table = await screen.findAllByRole('cell');
    expect(table).toHaveLength(130);
    
  })

  it('o Filtro por texto é aplicado', async () => {
    render(<App />);
    
    const textInput = screen.getByTestId('name-filter');
    userEvent.type(textInput, 'hoth');
    expect(textInput).toHaveProperty('value', 'hoth');

    const table = await screen.findAllByRole('cell');
    expect(table).toHaveLength(13);
  })

  it('o Filtro por "maior que" é aplicado', async () => {
    render(<App />);
    
    const columnSelect = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnSelect, 'diameter');
    expect(columnSelect).toHaveProperty('value', 'diameter' );

    const comparisonSelect = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonSelect, 'maior que');
    expect(comparisonSelect).toHaveProperty('value', 'maior que');

    const valueInput = screen.getByTestId('value-filter');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '12500');
    expect(valueInput).toHaveProperty('value', '12500');

    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);

  });

  it('o Filtro por "menor que" é aplicado', async () => {
    render(<App />);
    
    const columnSelect = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnSelect, 'orbital_period');
    expect(columnSelect).toHaveProperty('value', 'orbital_period' );

    const comparisonSelect = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    expect(comparisonSelect).toHaveProperty('value', 'menor que');

    const valueInput = screen.getByTestId('value-filter');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '312');
    expect(valueInput).toHaveProperty('value', '312');

    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);
  });

  it('o Filtro por "igual a" é aplicado', async () => {
    render(<App />);
    
    const columnSelect = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnSelect, 'population');
    expect(columnSelect).toHaveProperty('value', 'population' );

    const comparisonSelect = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonSelect, 'igual a');
    expect(comparisonSelect).toHaveProperty('value', 'igual a');

    const valueInput = screen.getByTestId('value-filter');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '1000');
    expect(valueInput).toHaveProperty('value', '1000');

    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);

   // const filteredPlanet = await screen.findByRole('cell');
  })
});
