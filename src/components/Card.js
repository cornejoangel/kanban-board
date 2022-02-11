import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.scss';

const Card = (props) => {
  const { id, name, changeName } = props;
  const [editingName, setEditingName] = useState(false);

  const startEditName = () => {
    setEditingName(true);
  };

  const stopEditName = () => {
    setEditingName(false);
  };

  let card = '';
  card = (
    <div className="card">
      {editingName && (
        <input
          type="text"
          value={name}
          onChange={(e) => changeName(id, e.target.value)}
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

Card.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  changeName: PropTypes.func,
};

export default Card;
