import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import uniqid from 'uniqid';
import List from './components/List';
import './styles/normalize.css';
import './styles/App.scss';

const App = () => {
  const [lists, setLists] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingList, setEditingList] = useState('');
  const [editingEmpty, setEditingEmpty] = useState(true);

  const createList = () => {
    const newList = { id: uniqid(), title: '', cards: [] };
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
    setLists(
      lists.map((list) => {
        if (list.id === listID) {
          list.cards = list.cards.concat(newCard);
        }
        return list;
      })
    );
    setEditing(true);
    setEditingList(listID);
    setEditingEmpty(true);
  };

  const deleteCard = (cardID, listID) => {
    setLists(
      lists.map((list) => {
        if (list.id === listID) {
          list.cards = list.cards.filter((card) => card.id !== cardID);
        }
        return list;
      })
    );
  };

  const startEditCardTitle = (cardID, listID) => {
    setLists(
      lists.map((list) => {
        if (list.id === listID) {
          list.cards = list.cards.map((card) => {
            if (card.id === cardID) {
              card.editingTitle = true;
            }
            return card;
          });
        }
        return list;
      })
    );
  };

  const stopEditCardTitle = (cardID, listID) => {
    setEditing(false);
    setEditingList('');
    const l = { ...lists.find((list) => list.id === listID) };
    const c = { ...l.cards.find((card) => card.id === cardID) };
    if (c.title === '') {
      deleteCard(cardID, listID);
      return;
    }

    setLists(
      lists.map((list) => {
        if (list.id === listID) {
          list.cards = list.cards.map((card) => {
            if (card.id === cardID) {
              card.editingTitle = false;
            }
            return card;
          });
        }
        return list;
      })
    );
  };

  const changeCardTitle = (cardID, listID, value) => {
    setLists(
      lists.map((list) => {
        if (list.id === listID) {
          list.cards = list.cards.map((card) => {
            if (card.id === cardID) {
              card.title = value;
            }
            return card;
          });
        }
        return list;
      })
    );

    const l = { ...lists.find((list) => list.id === listID) };
    const c = { ...l.cards.find((card) => card.id === cardID) };
    if (c.title !== '') {
      setEditingEmpty(false);
    }
  };

  const handleListDrag = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'column') {
      // dragging a list
      const tempLists = JSON.parse(JSON.stringify(lists));
      const [temp] = tempLists.splice(result.source.index, 1);
      tempLists.splice(result.destination.index, 0, temp);
      setLists(tempLists);
    }
    if (type === 'row' && source.droppableId === destination.droppableId) {
      // dragging a card within a list
      const l = { ...lists.find((list) => list.id === source.droppableId) };
      const tempCards = JSON.parse(JSON.stringify(l.cards));
      const [tempCard] = tempCards.splice(result.source.index, 1);
      tempCards.splice(result.destination.index, 0, tempCard);
      setLists(
        lists.map((list) => {
          if (list.id === source.droppableId) {
            list.cards = tempCards;
          }
          return list;
        })
      );
    } else if (type === 'row') {
      // dragging a card to a different list
      console.log('different list');
    }
  };

  let board = '';
  board = (
    <main className="board">
      <DragDropContext onDragEnd={handleListDrag}>
        <Droppable droppableId="lists" direction="horizontal" type="column">
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
                  cards={list.cards}
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
