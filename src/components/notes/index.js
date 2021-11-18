/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../../styles/notes.scss';
import { push as Menu } from 'react-burger-menu';
import { Column } from 'rbx';
import List from './list';
import NotesService from '../../services/notes';

function Notes(props) {
  const [notes, setNotes] = useState([]);
  const [current_note, setCurrentNote] = useState({
    title: '',
    body: '',
    id: '',
  });

  async function fetchNotes() {
    const response = await NotesService.index();
    if (response.data.length >= 1) {
      setNotes(response.data.reverse());
      setCurrentNote(response.data[0]);
    } else {
      setNotes([]);
    }
  }

  const createNote = async () => {
    await NotesService.create();
    fetchNotes();
  };

  const deleteNote = async (note) => {
    await NotesService.create(note._id);
    fetchNotes();
  };

  const selectNote = (id) => {
    const note = notes.find((note) => note._id == id);
    setCurrentNote(note);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Column.Group className="notes" id="notes">
        <Menu
          pageWrapId={'notes-editor'}
          isOpen={props.isOpen}
          onStateChange={(state) => props.setIsOpen(state.isOpen)}
          disableAutoFocus
          outerContainerId={'notes'}
          customBurgerIcon={false}
          customCrossIcon={false}
        >
          <Column.Group>
            <Column size={10} offset={1}>
              Search...
            </Column>
          </Column.Group>
          <List
            notes={notes}
            selectNote={selectNote}
            current_note={current_note}
            deleteNote={deleteNote}
            createNote={createNote}
          />
        </Menu>

        <Column size={12} className="notes-editor" id="notes-editor">
          Editor...
        </Column>
      </Column.Group>
    </>
  );
}

export default Notes;
