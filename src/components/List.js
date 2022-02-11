import React from 'react';
import Card from './Card';
import '../styles/List.scss';

const List = () => {
  const cardOne = <Card title="c" />;
  return (
    <div className="list">
      this is a list
      {cardOne}
      {cardOne}
    </div>
  );
};

export default List;
