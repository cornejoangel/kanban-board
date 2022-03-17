import React, { useRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { MdClose, MdAdd } from 'react-icons/md';
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
    blurHandler,
    editingCard,
  } = props;

  const listNameInput = useRef();

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      listNameInput.current.blur();
    }
  };

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
            ref={listNameInput}
            value={title}
            placeholder="Add a title..."
            className={`list-title ${dark ? 'dark-list' : 'light-list'}`}
            onChange={(e) => changeListTitle(id, e.target.value)}
            onKeyDown={(e) => handleKey(e)}
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
                    blurHandler={blurHandler}
                  />
                ))}
                {listProvided.placeholder}
              </ul>
            )}
          </Droppable>
          {!editingEmpty && editingList === id && (
            <button
              type="button"
              className={`card-creator save-card ${
                dark ? 'dark-list' : 'light-list'
              }`}
              onClick={() => stopEditCardTitle({}, editingCard, editingList)}
            >
              <MdAdd className="card-creator-svg" />
            </button>
          )}
          {(editingEmpty || editingList !== id) && (
            <button
              type="button"
              className={`card-creator ${dark ? 'dark-list' : 'light-list'}`}
              onClick={() => createCard(id)}
              disabled={editing && editingList === id && editingEmpty}
            >
              <MdAdd className="card-creator-svg" />
            </button>
          )}
          <button
            type="button"
            className={`list-close ${dark ? 'dark-list' : 'light-list'}`}
            onClick={() => deleteList(id)}
          >
            <MdClose className="list-close-svg" />
          </button>
        </li>
      )}
    </Draggable>
  );
  return list;
};

List.propTypes = {
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
  dark: PropTypes.bool,
  blurHandler: PropTypes.func,
  editingCard: PropTypes.string,
};
export default List;
