import { size } from '../data/constants';
import { is_left_edge, is_right_edge } from '../data/utils';

async function check_tile(tile, board) {
  if (tile.type === 'empty' && tile.warning === 0 && tile.revealed === false) {
    reveal_adjacent_tiles(board, tile);
  }
  tile.revealed = true;
}

export async function reveal_adjacent_tiles(board, tile) {
  const i = tile.pos;
  const b = board;
  const s = size;

  //West
  if (i > 0 && !is_left_edge(i)) {
    await check_tile(b[i - 1], b);
  }

  //NE
  if (i > s - 1 && !is_right_edge(i)) {
    await check_tile(b[i + 1 - s], b);
  }

  //North
  if (i > s) {
    await check_tile(b[i - s], b);
  }

  //NW
  if (i > s + 1 && !is_left_edge(i)) {
    await check_tile(b[i - 1 - s], b);
  }

  //East
  if (i < s * s - 2 && !is_right_edge(i)) {
    await check_tile(b[i + 1], b);
  }

  //SW
  if (i < s * s - s && !is_left_edge(i)) {
    await check_tile(b[i - i + s], b);
  }

  //SE
  if (i < s * s - s - 2 && !is_right_edge(i)) {
    await check_tile(b[i + 1 + s], b);
  }

  //South
  if (i < s * s - s - 1) {
    await check_tile(b[i + s], b);
  }
}
