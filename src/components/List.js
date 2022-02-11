import React, { useState } from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/List.scss';

const List = (props) => {
  const { id, title, changeTitle } = props;
  const [cards, setCards] = useState([]);

  const createCard = () => {
    const newCard = <Card />;
    setCards(cards.concat(newCard));
  };

  let list = '';
  list = (
    <div className="list">
      <input
        type="text"
        value={title}
        onChange={(e) => changeTitle(id, e.target.value)}
      />
      <ul>
        {cards.map(() => (
          <li key={uniqid()}>
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

List.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  changeTitle: PropTypes.func,
};

export default List;
