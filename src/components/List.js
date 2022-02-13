import React, { useState } from 'react';
import uniqid from 'uniqid';
import Card from './Card';
import '../styles/List.scss';

const List = () => {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([]);

  const changeTitle = (value) => {
    setTitle(value);
  };

  const createCard = () => {
    const newCard = { id: uniqid(), title: '', editingTitle: true };
    setCards(cards.concat(newCard));
  };

  const deleteCard = (deleteID) => {
    setCards(cards.filter((card) => card.id !== deleteID));
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

  let list = '';
  list = (
    <div className="list">
      <input
        type="text"
        value={title}
        onChange={(e) => changeTitle(e.target.value)}
      />
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <Card
              id={card.id}
              title={card.title}
              editingTitle={card.editingTitle}
              startEditCardTitle={startEditCardTitle}
              stopEditCardTitle={stopEditCardTitle}
              changeCardTitle={changeCardTitle}
            />
            <button type="button" onClick={() => deleteCard(card.id)}>
              X
            </button>
          </li>
        ))}
        <li>
          <button type="button" className="card-creator" onClick={createCard}>
            +Card
          </button>
        </li>
      </ul>
    </div>
  );
  return list;
};

export default List;
