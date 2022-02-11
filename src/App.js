import React, { useState } from 'react';
import List from './components/List';
import './styles/App.scss';

const App = () => {
  const listOne = <List len={0} />;
  const listTwo = <List len={0} />;
  let board = '';
  board = (
    <main>
      {listOne}
      {listTwo}
    </main>
  );
  return board;
};

export default App;
