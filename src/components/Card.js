import React, { useState, useRef, useEffect } from 'react';
import ReactModal from 'react-modal';
import '../styles/Card.scss';

const Card = () => {
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');
  const [showMore, setShowMore] = useState(false);
  const nameInput = useRef(null);

  const openMore = () => {
    setShowMore(true);
  };

  const closeMore = () => {
    setShowMore(false);
  };

  useEffect(() => {
    if (editingName) {
      nameInput.current.focus();
    }
  });

  const startEditName = () => {
    setEditingName(true);
  };

  const stopEditName = () => {
    setEditingName(false);
  };

  const changeName = (value) => {
    setName(value);
  };

  let card = '';
  card = (
    <div className="card">
      {editingName && (
        <input
          type="text"
          ref={nameInput}
          value={name}
          onChange={(e) => changeName(e.target.value)}
          onBlur={stopEditName}
        />
      )}
      {!editingName && (
        <button type="button" className="name-wrapper" onClick={openMore}>
          {name}
        </button>
      )}
      {!editingName && (
        <button type="button" onClick={startEditName}>
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
        <button type="button" onClick={closeMore}>
          close
        </button>
      </ReactModal>
    </div>
  );
  return card;
};

export default Card;
