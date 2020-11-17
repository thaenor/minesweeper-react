import { size, total_mines } from '../data/constants';
import create_board from '../data/mapMaker';
import { reveal_adjacent_tiles } from '../data/adjacentChecker';
import { are_all_tiles_revealed, reveal_all_tiles } from '../data/utils';
import { mock_map, mock_tile } from './fixtures/mock_map';

describe('Map making tests', () => {
  test('expect map creation to be of exact size', () => {
    const map = create_board(size, total_mines);
    expect(map.length).toBe(size * size);
  });

  test('expect map to have a specific number of mines', () => {
    const map = create_board(size, total_mines);
    const mines = map.filter(t => t.type === 'bomb');
    expect(mines.length).toBe(total_mines);
  });
});

describe('Map utilities and checkers', () => {
  test('expect all tiles to be revealed', () => {
    const map = create_board(size, total_mines);
    const revealed = reveal_all_tiles(map);

    revealed.forEach(tile => {
      if (!tile.revealed) {
        throw new Error('there is a hidden tile');
      }
    });

    expect(revealed.length).toBe(size * size);
  });

  test('expect function to check wether all tiles are revealed', () => {
    const map = create_board(size, total_mines);
    const map2 = create_board(size, total_mines);
    const revealed = reveal_all_tiles(map);

    expect(are_all_tiles_revealed(revealed)).toBe(true);
    expect(are_all_tiles_revealed(map2)).toBe(false);
  });

  test('expect reveal adjacent', () => {
    const map = mock_map;
    const tile = mock_tile;
    reveal_adjacent_tiles(map, tile);

    const rev = map.filter( t => t.revealed);

    expect(rev.length).toBe(2);
  });
});
