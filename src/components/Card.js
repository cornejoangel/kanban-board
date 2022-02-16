import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import '../styles/Card.scss';

const Card = (props) => {
  const {
    id,
    title,
    editingTitle,
    startEditCardTitle,
    stopEditCardTitle,
    changeCardTitle,
    deleteCard,
    index,
    listID,
  } = props;
  const [showMore, setShowMore] = useState(false);
  const nameInput = useRef(null);
  const [description, setDescription] = useState('');

  const openMore = () => {
    setShowMore(true);
  };

  const closeMore = () => {
    setShowMore(false);
  };

  const changeDescription = (value) => {
    setDescription(value);
  };

  useEffect(() => {
    if (editingTitle) {
      nameInput.current.focus();
    }
  });

  let card = '';
  card = (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editingTitle && (
            <input
              type="text"
              ref={nameInput}
              value={title}
              onChange={(e) => changeCardTitle(id, listID, e.target.value)}
              onBlur={() => stopEditCardTitle(id, listID)}
            />
          )}
          {!editingTitle && (
            <button type="button" className="name-wrapper" onClick={openMore}>
              {title}
            </button>
          )}
          {!editingTitle && (
            <button
              type="button"
              onClick={() => startEditCardTitle(id, listID)}
            >
              edit
            </button>
          )}
          <button type="button" onClick={() => deleteCard(id, listID)}>
            X
          </button>
          <ReactModal
            isOpen={showMore}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            onRequestClose={closeMore}
            ariaHideApp={!showMore}
          >
            <textarea
              value={description}
              className="description"
              onChange={(e) => changeDescription(e.target.value)}
            />
            <button type="button" onClick={closeMore}>
              close
            </button>
          </ReactModal>
        </li>
      )}
    </Draggable>
  );
  return card;
};

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  editingTitle: PropTypes.bool,
  startEditCardTitle: PropTypes.func,
  stopEditCardTitle: PropTypes.func,
  changeTitle: PropTypes.func,
  deleteCard: PropTypes.func,
  index: PropTypes.number,
  lisID: PropTypes.string,
};

export default Card;
