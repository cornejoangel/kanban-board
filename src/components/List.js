import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/List.scss';

const List = (props) => {
  const { len } = props;
  const cardOne = <Card title="c" />;
  return (
    <div className="list">
      this is a list
      {cardOne}
      {cardOne}
    </div>
  );
};

List.propTypes = {
  len: PropTypes.number,
};

export default List;
