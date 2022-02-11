import React from 'react';
import PropTypes from 'prop-types';
import '../styles/List.scss';

const List = (props) => {
  const { len } = props;
  return <div className="list">list name</div>;
};

List.propTypes = {
  len: PropTypes.number,
};

export default List;
