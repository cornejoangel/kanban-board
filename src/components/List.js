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
    index,
    changeDescription,
  } = props;

  let list = '';
  list = (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => changeListTitle(id, e.target.value)}
          />
          <Droppable droppableId={id} direction="vertical" type="row">
            {(listProvided) => (
              <ul
                className="card-list"
                {...listProvided.droppableProps}
                ref={listProvided.innerRef}
              >
                {cards.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    editingTitle={card.editingTitle}
                    startEditCardTitle={startEditCardTitle}
                    stopEditCardTitle={stopEditCardTitle}
                    changeCardTitle={changeCardTitle}
                    deleteCard={deleteCard}
                    index={cardIndex}
                    listID={id}
                    description={card.description}
                    changeDescription={changeDescription}
                  />
                ))}
                {listProvided.placeholder}
              </ul>
            )}
          </Droppable>
          {!editingEmpty && editingList === id && (
            <button type="button" className="card-creator save-card">
              +Card
            </button>
          )}
          {(editingEmpty || editingList !== id) && (
            <button
              type="button"
              className="card-creator"
              onClick={() => createCard(id)}
              disabled={editing && editingList === id && editingEmpty}
            >
              +Card
            </button>
          )}
          <button type="button" onClick={() => deleteList(id)}>
            X
          </button>
        </li>
      )}
    </Draggable>
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
  index: PropTypes.number,
  changeDescription: PropTypes.func,
};
export default List;
