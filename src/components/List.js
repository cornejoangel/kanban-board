import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/App.scss';
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
    editing,
    editingList,
    editingEmpty,
    deleteList,
  } = props;

  // const handleListDrag = (result) => {
  //   console.log(result);
  //   const tempLists = JSON.parse(JSON.stringify(lists));
  //   const [temp] = tempLists.splice(result.source.index, 1);
  //   tempLists.splice(result.destination.index, 0, temp);
  //   setLists(tempLists);
  // };

  let list = '';
  list = (
    <li className="list">
      <input
        type="text"
        value={title}
        onChange={(e) => changeListTitle(id, e.target.value)}
      />
      <ul>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            editingTitle={card.editingTitle}
            startEditCardTitle={startEditCardTitle}
            stopEditCardTitle={stopEditCardTitle}
            changeCardTitle={changeCardTitle}
            deleteCard={deleteCard}
          />
        ))}
      </ul>
      <button
        type="button"
        className={`card-creator ${
          !editingEmpty && editingList === id ? 'save-card' : ''
        }`}
        onClick={() => createCard(id)}
        disabled={editing && editingList === id && editingEmpty}
      >
        +Card
      </button>
      <button type="button" onClick={() => deleteList(id)}>
        X
      </button>
    </li>
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
  editing: PropTypes.bool,
  editingList: PropTypes.string,
  editingEmpty: PropTypes.bool,
  deleteList: PropTypes.func,
};
export default List;
