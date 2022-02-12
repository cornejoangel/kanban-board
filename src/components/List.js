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
    const newCard = { id: uniqid(), name: '' };
    setCards(cards.concat(newCard));
  };

  const changeName = (cardID, value) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardID) {
          card.name = value;
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
            <Card id={card.id} name={card.name} changeName={changeName} />
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
