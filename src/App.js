import React, { useState } from 'react';
import uniqid from 'uniqid';
import List from './components/List';
import './styles/normalize.css';
import './styles/App.scss';

const App = () => {
  const [lists, setLists] = useState([]);

  const createList = () => {
    const newList = { id: uniqid(), title: '' };
    setLists(lists.concat(newList));
  };

  let board = '';
  board = (
    <main>
      <ul className="board">
        {lists.map((list) => (
          <li key={list.id}>
            <List id={list.id} title={list.title} />
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
