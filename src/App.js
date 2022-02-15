import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import uniqid from 'uniqid';
import List from './components/List';
import './styles/normalize.css';
import './styles/App.scss';

const App = () => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingList, setEditingList] = useState('');
  const [editingEmpty, setEditingEmpty] = useState(true);

  const createList = () => {
    const newList = { id: uniqid(), title: '' };
    setLists(lists.concat(newList));
  };

  const deleteList = (deleteID) => {
    setLists(lists.filter((list) => list.id !== deleteID));
  };

  const changeListTitle = (id, value) => {
    setLists(
      lists.map((list) => {
        if (list.id === id) {
          list.title = value;
        }
        return list;
      })
    );
  };

  const createCard = (listID) => {
    const newCard = { listID, id: uniqid(), title: '', editingTitle: true };
    setCards(cards.concat(newCard));
    setEditing(true);
    setEditingList(listID);
    setEditingEmpty(true);
  };

  const deleteCard = (cardID) => {
    setCards(cards.filter((card) => card.id !== cardID));
  };

  const startEditCardTitle = (id) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          card.editingTitle = true;
        }
        return card;
      })
    );
  };

  const stopEditCardTitle = (id) => {
    setEditing(false);
    setEditingList('');
    const c = { ...cards.find((card) => card.id === id) };
    if (c.title === '') {
      deleteCard(id);
      return;
    }

    setCards(
      cards.map((card) => {
        if (card.id === id) {
          card.editingTitle = false;
        }
        return card;
      })
    );
  };

  const changeCardTitle = (id, value) => {
    setCards(
      cards.map((card) => {
        if (card.id === id) {
          card.title = value;
        }
        return card;
      })
    );

    const c = cards.find((card) => card.id === id);
    if (c.title !== '') {
      setEditingEmpty(false);
    }
  };

  const handleListDrag = (result) => {
    if (!result.destination) return;
    const tempLists = JSON.parse(JSON.stringify(lists));
    const [temp] = tempLists.splice(result.source.index, 1);
    tempLists.splice(result.destination.index, 0, temp);
    setLists(tempLists);
  };

  let board = '';
  board = (
    <main className="board">
      <DragDropContext onDragEnd={handleListDrag}>
        <Droppable droppableId="lists" direction="horizontal">
          {(provided) => (
            <ul
              className="list-column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  changeListTitle={changeListTitle}
                  cards={cards.filter((card) => card.listID === list.id)}
                  createCard={createCard}
                  deleteCard={deleteCard}
                  startEditCardTitle={startEditCardTitle}
                  stopEditCardTitle={stopEditCardTitle}
                  changeCardTitle={changeCardTitle}
                  editing={editing}
                  editingList={editingList}
                  editingEmpty={editingEmpty}
                  deleteList={deleteList}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button type="button" className="list-creator" onClick={createList}>
        +List
      </button>
    </main>
  );
  return board;
};

export default App;
