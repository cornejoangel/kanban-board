import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.scss';

const Card = (props) => {
  const { title } = props;
  return <div className="card">card title</div>;
};

Card.propTypes = {
  title: PropTypes.string,
};

export default Card;
