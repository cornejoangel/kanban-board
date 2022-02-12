import React, { useState } from 'react';
import '../styles/Card.scss';

const Card = () => {
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');

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
          value={name}
          onChange={(e) => changeName(e.target.value)}
          onBlur={stopEditName}
        />
      )}
      {!editingName && <div className="name-wrapper">{name}</div>}
      {!editingName && (
        <button type="button" onClick={startEditName}>
          edit
        </button>
      )}
    </div>
  );
  return card;
};

export default Card;
