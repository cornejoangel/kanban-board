import React, { useState } from 'react';
import uniqid from 'uniqid';
import List from './components/List';
import './styles/normalize.css';
import './styles/App.scss';

const App = () => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingList, setEditingList] = useState('');

  const createList = () => {
    const newList = { id: uniqid(), title: '' };
    setLists(lists.concat(newList));
  };

  const deleteList = (deleteID) => {
    setLists(lists.filter((list) => list.id !== deleteID));
  };

  const changeListTitle = (id, value) => {
    setLists(
      lists.map((list) => {
        if (list.id === id) {
          list.title = value;
        }
        return list;
      })
    );
  };

  const createCard = (listID) => {
    const newCard = { listID, id: uniqid(), title: '', editingTitle: true };
    setCards(cards.concat(newCard));
    setEditing(true);
    setEditingList(listID);
  };

  const deleteCard = (cardID) => {
    setCards(cards.filter((card) => card.id !== cardID));
  };

  const startEditCardTitle = (id) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          card.editingTitle = true;
        }
        return card;
      })
    );
  };

  const stopEditCardTitle = (id) => {
    setEditing(false);
    setEditingList('');
    const c = { ...cards.find((card) => card.id === id) };
    if (c.title === '') {
      deleteCard(id);
      return;
    }

    setCards(
      cards.map((card) => {
        if (card.id === id) {
          card.editingTitle = false;
        }
        return card;
      })
    );
  };

  const changeCardTitle = (id, value) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          card.title = value;
        }
        return card;
      })
    );
  };

  let board = '';
  board = (
    <main>
      <ul className="board">
        {lists.map((list) => (
          <li key={list.id}>
            <List
              id={list.id}
              title={list.title}
              changeListTitle={changeListTitle}
              cards={cards.filter((card) => card.listID === list.id)}
              createCard={createCard}
              deleteCard={deleteCard}
              startEditCardTitle={startEditCardTitle}
              stopEditCardTitle={stopEditCardTitle}
              changeCardTitle={changeCardTitle}
              editing={editing}
              editingList={editingList}
            />
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
