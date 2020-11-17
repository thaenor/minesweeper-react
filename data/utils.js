import { size } from './constants';

export function is_left_edge(pos) {
  return pos % size === 0;
}

export function is_right_edge(pos) {
  return pos % size === size - 1;
}

export function are_all_tiles_revealed(board) {
  let filled_tiles = board.filter(tile => tile.revealed == true || tile.type === 'bomb');

  return (filled_tiles.length === size*size);
}

export function reveal_all_tiles(board) {
  let all_tiles = [...board];
  return all_tiles.map( til => {
    til.revealed = true;
    return til;
  });
}
