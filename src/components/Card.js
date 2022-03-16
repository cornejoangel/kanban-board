import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdClose, MdEdit, MdOpenInFull } from 'react-icons/md';
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
    dark,
    blurHandler,
  } = props;
  const [showMore, setShowMore] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
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

  const handleMouseEnter = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  let card = '';
  card = (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={`card ${dark ? 'dark-card' : 'light-card'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
        >
          {editingTitle && (
            <textarea
              ref={nameInput}
              value={title}
              className={`card-name-edit ${dark ? 'dark-card' : 'light-card'}`}
              onChange={(e) => changeCardTitle(id, listID, e.target.value)}
              // onBlur={(e) => stopEditCardTitle(e, id, listID)}
              onBlur={(e) => blurHandler(e, id, listID)}
              onKeyDown={(e) => stopEditCardTitle(e, id, listID)}
            />
          )}
          {!editingTitle && <div className="name-wrapper">{title}</div>}
          {mouseOver && (
            <div className="card-buttons">
              {!editingTitle && (
                <button
                  type="button"
                  className={`edit ${dark ? 'dark-card' : 'light-card'}`}
                  onClick={() => startEditCardTitle(id, listID)}
                >
                  <MdEdit className="edit-svg" />
                </button>
              )}
              {!editingTitle && (
                <button
                  type="button"
                  className={`more ${dark ? 'dark-card' : 'light-card'}`}
                  onClick={openMore}
                >
                  <MdOpenInFull className="more-svg" />
                </button>
              )}
              {!editingTitle && (
                <button
                  type="button"
                  className={`delete-card ${dark ? 'dark-card' : 'light-card'}`}
                  onClick={() => deleteCard(id, listID)}
                >
                  <MdClose className="card-close-svg" />
                </button>
              )}
            </div>
          )}

          <ReactModal
            isOpen={showMore}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            onRequestClose={closeMore}
            ariaHideApp={!showMore}
            className={`more-content ${
              dark ? 'dark-more-content' : 'light-more-content'
            }`}
            overlayClassName={`more-overlay ${
              dark ? 'dark-more-overlay' : 'light-more-overlay'
            }`}
          >
            <input
              type="text"
              className={`more-header ${dark ? 'dark-card' : 'light-card'}`}
              value={title}
              onChange={(e) => changeCardTitle(id, listID, e.target.value)}
            />
            <textarea
              value={description}
              className={`description ${dark ? 'dark-card' : 'light-card'}`}
              placeholder="Add more detail for this card..."
              onChange={(e) => changeDescription(id, listID, e.target.value)}
            />
            <button
              type="button"
              className={`more-close ${dark ? 'dark-card' : 'light-card'}`}
              onClick={closeMore}
            >
              Close
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
  dark: PropTypes.bool,
  blurHandler: PropTypes.func,
};

export default Card;
