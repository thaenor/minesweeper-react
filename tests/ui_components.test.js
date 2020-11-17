import React from 'react';
import renderer from 'react-test-renderer';

import { size, total_mines } from '../data/constants';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';

describe('Map rendering', () => {
  test('Expect map to render with correct elements', () => {
    const component = renderer.create(
      <Layout title={`Minesweeper (active)`}>
        <Desk boardSize={size}>
          {[...Array(100).keys()].map(i => (
            <Square
              key={i}
              disabled={i === 55 || i === 10}
              onClick={e => select_square(e)}
            >
              {i === 10 && <Mine />}
              {i === 25 && <Flag />}
              {i === 77 ? '4' : ''}
            </Square>
          ))}
        </Desk>
      </Layout>
    );
    let tree = component.toJSON();
    const testInstance = component.root;

    expect(testInstance.findByType(Layout).props.title).toBe('Minesweeper (active)');
    expect(testInstance.findByType(Desk).props.boardSize).toBe(size);
    expect(tree).toMatchSnapshot();
  });
});
