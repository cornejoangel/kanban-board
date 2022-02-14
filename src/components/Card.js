import React, { useState, useRef, useEffect } from 'react';
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
    <div className="card">
      {editingTitle && (
        <input
          type="text"
          ref={nameInput}
          value={title}
          onChange={(e) => changeCardTitle(id, e.target.value)}
          onBlur={() => stopEditCardTitle(id)}
        />
      )}
      {!editingTitle && (
        <button type="button" className="name-wrapper" onClick={openMore}>
          {title}
        </button>
      )}
      {!editingTitle && (
        <button type="button" onClick={() => startEditCardTitle(id)}>
          edit
        </button>
      )}
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
    </div>
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
};

export default Card;
