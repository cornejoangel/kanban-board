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
    const newCard = { id: uniqid() };
    setCards(cards.concat(newCard));
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
            <Card />
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
