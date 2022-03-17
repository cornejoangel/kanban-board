import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { MdAdd, MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import uniqid from 'uniqid';
import List from './components/List';
import './styles/normalize.css';
import './styles/App.scss';

const App = () => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('lists');
    if (savedLists !== null) {
      return JSON.parse(savedLists);
    }
    return [];
  });
  const [editing, setEditing] = useState(false);
  const [editingList, setEditingList] = useState('');
  const [editingEmpty, setEditingEmpty] = useState(true);
  const [dark, setDark] = useState(() => {
    const savedDark = localStorage.getItem('dark');
    if (savedDark !== null) {
      return JSON.parse(savedDark);
    }
    return false;
  });
  const [editingCard, setEditingCard] = useState('');
  const [queueCard, setQueueCard] = useState(false);
  const [queueList, setQueueList] = useState('');
  const [doneBlurring, setDoneBlurring] = useState(true);
  const [queueEditCard, setQueueEditCard] = useState('');

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(dark));
  }, [dark]);

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

  const stopEditCardTitle = (e, cardID, listID) => {
    if (e.key && e.key !== 'Enter') return;
    setEditing(false);
    setEditingList('');
    setEditingEmpty(true);
    setEditingCard('');
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
    setDoneBlurring(true);
  };

  const blurHandler = useCallback((e, cardID, listID) => {
    stopEditCardTitle(e, cardID, listID);
    setDoneBlurring(true);
  }, []);

  const createCard = useCallback(
    (listID) => {
      if (editing) {
        setQueueCard(true);
        setQueueList(listID);
        setEditing(false);
        setDoneBlurring(false);
        blurHandler({}, editingCard, editingList);
        return;
      }
      const newCard = {
        listID,
        id: uniqid(),
        title: '',
        editingTitle: true,
        description: '',
      };
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
      setEditingCard(newCard.id);
    },
    [blurHandler, editing, editingCard, editingList, lists]
  );

  useEffect(() => {
    if (queueCard && doneBlurring) {
      createCard(queueList);
      setQueueCard(false);
      setQueueList('');
    }
  }, [queueCard, queueList, doneBlurring, createCard]);

  const startEditCardTitle = useCallback(
    (cardID, listID) => {
      if (editing) {
        setQueueEditCard(cardID);
        setQueueList(listID);
        setEditing(false);
        setDoneBlurring(false);
        blurHandler({}, editingCard, editingList);
        return;
      }
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
      setEditing(true);
      setEditingList(listID);
      setEditingCard(cardID);
      setEditingEmpty(false);
    },
    [lists, editing]
  );

  useEffect(() => {
    if (queueEditCard !== '' && doneBlurring) {
      startEditCardTitle(queueEditCard, queueList);
      setQueueEditCard('');
      setQueueList('');
    }
  }, [startEditCardTitle, queueEditCard, queueList, doneBlurring]);

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
      return;
    }
    setEditingEmpty(true);
  };

  const changeDescription = (cardID, listID, value) => {
    setLists(
      lists.map((list) => {
        if (list.id === listID) {
          list.cards = list.cards.map((card) => {
            if (card.id === cardID) {
              card.description = value;
            }
            return card;
          });
        }
        return list;
      })
    );
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
      const startList = {
        ...lists.find((list) => list.id === source.droppableId),
      };
      const endList = {
        ...lists.find((list) => list.id === destination.droppableId),
      };
      // take the card out of its source list
      const startCards = JSON.parse(JSON.stringify(startList.cards));
      const [tempCard] = startCards.splice(result.source.index, 1);
      // // move the card into its destination list
      const endCards = JSON.parse(JSON.stringify(endList.cards));
      endCards.splice(result.destination.index, 0, tempCard);
      setLists(
        lists.map((list) => {
          if (list.id === source.droppableId) {
            list.cards = startCards;
          } else if (list.id === destination.droppableId) {
            list.cards = endCards;
          }
          return list;
        })
      );
    }
  };

  const toggleDark = () => {
    setDark(!dark);
  };

  let board = '';
  board = (
    <div>
      <header className={dark ? 'dark-header' : 'light-header'}>
        <button
          type="button"
          className={`theme-toggle ${
            dark ? 'dark-theme-toggle' : 'light-theme-toggle'
          }`}
          onClick={() => toggleDark()}
        >
          {dark ? (
            <MdOutlineLightMode className="light-svg" />
          ) : (
            <MdOutlineDarkMode className="dark-svg" />
          )}
        </button>
      </header>
      <main className={`board ${dark ? 'dark-board' : 'light-board'}`}>
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
                    changeDescription={changeDescription}
                    dark={dark}
                    blurHandler={blurHandler}
                    editingCard={editingCard}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <button
          type="button"
          className={`list-creator ${
            dark ? 'dark-list-creator' : 'light-list-creator'
          }`}
          onClick={createList}
        >
          <MdAdd className="list-creator-svg" />
        </button>
      </main>
    </div>
  );
  return board;
};

export default App;
