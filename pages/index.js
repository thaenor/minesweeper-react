import Layout from '../components/layout';
import React, { useState, useEffect } from 'react';

// game components
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';
// game mechanics
import { size, total_mines } from '../data/constants';
import create_board from '../data/mapMaker';
import { reveal_adjacent_tiles } from '../data/adjacentChecker';
import { are_all_tiles_revealed, reveal_all_tiles } from '../data/utils';

const Index = () => {
  const [state, set_state] = useState({
    board: [],
    score: 0,
    is_game_over: false
  });

  useEffect(() => {
    set_state({ ...state, board: create_board(size, total_mines) });
  }, []);

  async function select_square(tile, curr_board) {
    if (tile.flag) {
      alert('you have flagged this tile, remove flag before clicking');
      return; //you can't left click a flagged tile
    }
    if (tile.revealed) {
      return;
    }

    switch (tile.type) {
      case 'empty':
        tile.revealed = true;
        if (tile.warning === 0) {
          await reveal_adjacent_tiles(curr_board, tile);
        }
        break;
      case 'bomb':
        set_state({ ...state, is_game_over: true });
        alert('BOOM! Game Over!');
        reveal_all_tiles(state.board);
        break;
      default:
        console.warn('this should never happen');
        console.log(tile);
        break;
    }

    const new_board = [...curr_board];
    set_state({ ...state, board: new_board });
    
    if (are_all_tiles_revealed(state.board)) {
      alert('congratulations, you win!');
    }
  }

  function plant_flag(e, tile) {
    e.preventDefault();
    let new_tile = { ...tile, flag: !tile.flag };
    let new_board = [...state.board];
    new_board[new_tile.pos] = new_tile;
    set_state({ ...state, board: new_board });
  }

  function renderTile(tile) {
    if (tile.flag) return <Flag />;
    if (tile.type === 'bomb') return <Mine />;
    if (tile.revealed) return tile.warning;
  }

  return (
    <Layout title={state.is_game_over ? 'Game Over' : `Minesweeper (active)`}>
      <Desk boardSize={size}>
        {state.board.map((tile, i) => (
          <Square
            key={i}
            onClick={e => select_square(tile, state.board)}
            onContextMenu={e => plant_flag(e, tile)}
          >
            {renderTile(tile)}
          </Square>
        ))}
      </Desk>
    </Layout>
  );
};

export default Index;
