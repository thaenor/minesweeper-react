import { size, total_mines } from './constants';
import { is_left_edge, is_right_edge } from './utils';

export default function create_board() {
  let bomb_slots = Array(total_mines).fill({ type: 'bomb' });
  let empty_slots = Array(size * size - total_mines).fill({
    type: 'empty',
    warning: 0
  });
  let combined = empty_slots.concat(bomb_slots);
  let map = combined.sort(() => Math.random() - 0.5);
  const s = size;

  return map.map((tile, i, m) => {
    if (tile.type === 'empty') {
      let new_tile = { type: 'empty', warning: 0 };
      if (i > 0 && !is_left_edge(i) && m[i - 1].type === 'bomb')
        new_tile.warning++;
      if (i > s - 1 && !is_right_edge(i) && m[i + 1 - s].type === 'bomb')
        new_tile.warning++;
      if (i > s && m[i - s].type === 'bomb') new_tile.warning++;
      if (i > s + 1 && !is_left_edge(i) && m[i - 1 - s].type === 'bomb')
        new_tile.warning++;
      if (i < s * s - 2 && !is_right_edge(i) && m[i + 1].type === 'bomb')
        new_tile.warning++;
      if (i < s * s - s && !is_left_edge(i) && m[i - 1 + s].type === 'bomb')
        new_tile.warning++;
      if (
        i < s * s - s - 2 &&
        !is_right_edge(i) &&
        m[i + 1 + s].type === 'bomb'
      )
        new_tile.warning++;
      if (i < s * s - s - 1 && m[i + s].type === 'bomb') new_tile.warning++;

      new_tile.warning = new_tile.warning >= 4 ? 4 : new_tile.warning;
      return { ...new_tile, flag: false, revealed: false, pos: i };
    } else {
      return { ...tile, flag: false, revealed: false, pos: i };
    }
  });
}
