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
    description,
    changeDescription,
  } = props;
  const [showMore, setShowMore] = useState(false);
  const nameInput = useRef(null);

  const openMore = () => {
    setShowMore(true);
  };

  const closeMore = () => {
    setShowMore(false);
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
            <textarea
              ref={nameInput}
              value={title}
              onChange={(e) => changeCardTitle(id, listID, e.target.value)}
              onBlur={(e) => stopEditCardTitle(e, id, listID)}
              onKeyDown={(e) => stopEditCardTitle(e, id, listID)}
            />
          )}
          {!editingTitle && <div className="name-wrapper">{title}</div>}
          {!editingTitle && (
            <button type="button" onClick={openMore}>
              more
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
              onChange={(e) => changeDescription(id, listID, e.target.value)}
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
  description: PropTypes.string,
  changeDescription: PropTypes.func,
};

export default Card;
