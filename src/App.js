import React, { useState } from 'react';
import uniqid from 'uniqid';
import List from './components/List';
import './styles/normalize.css';
import './styles/App.scss';

const App = () => {
  const [lists, setLists] = useState([]);

  const createList = () => {
    const newList = { id: uniqid() };
    setLists(lists.concat(newList));
  };

  const deleteList = (deleteID) => {
    setLists(lists.filter((list) => list.id !== deleteID));
  };

  let board = '';
  board = (
    <main>
      <ul className="board">
        {lists.map((list) => (
          <li key={list.id}>
            <List />
            <button type="button" onClick={() => deleteList(list.id)}>
              X
            </button>
          </li>
        ))}
        <li>
          <button type="button" className="list-creator" onClick={createList}>
            +List
          </button>
        </li>
      </ul>
    </main>
  );
  return board;
};

export default App;
