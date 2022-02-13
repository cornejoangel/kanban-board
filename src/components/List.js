import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/List.scss';

const List = (props) => {
  const {
    id,
    title,
    changeListTitle,
    cards,
    createCard,
    deleteCard,
    startEditCardTitle,
    stopEditCardTitle,
    changeCardTitle,
  } = props;

  let list = '';
  list = (
    <div className="list">
      <input
        type="text"
        value={title}
        onChange={(e) => changeListTitle(id, e.target.value)}
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
          <button
            type="button"
            className="card-creator"
            onClick={() => createCard(id)}
          >
            +Card
          </button>
        </li>
      </ul>
    </div>
  );
  return list;
};

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  changeListTitle: PropTypes.func,
  cards: PropTypes.array,
  createCard: PropTypes.func,
  deleteCard: PropTypes.func,
  startEditCardTitle: PropTypes.func,
  stopEditCardTitle: PropTypes.func,
  changeCardTitle: PropTypes.func,
};
export default List;
