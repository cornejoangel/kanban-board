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
    dark,
  } = props;

  let list = '';
  list = (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={`list ${dark ? 'dark-list' : 'light-list'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            type="text"
            value={title}
            className={`list-title ${dark ? 'dark-list' : 'light-list'}`}
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
                    dark={dark}
                  />
                ))}
                {listProvided.placeholder}
              </ul>
            )}
          </Droppable>
          {/* this is an add card button that does nothing, but has an additional class */}
          {!editingEmpty && editingList === id && (
            <button
              type="button"
              className={`card-creator save-card ${
                dark ? 'dark-list' : 'light-list'
              }`}
            >
              +Card
            </button>
          )}
          {(editingEmpty || editingList !== id) && (
            <button
              type="button"
              className={`card-creator ${dark ? 'dark-list' : 'light-list'}`}
              onClick={() => createCard(id)}
              disabled={editing && editingList === id && editingEmpty}
            >
              +Card
            </button>
          )}
          <button
            type="button"
            className={`list-close ${dark ? 'dark-list' : 'light-list'}`}
            onClick={() => deleteList(id)}
          >
            X
          </button>
        </li>
      )}
    </Draggable>
  );
  return list;
};

export default List;
