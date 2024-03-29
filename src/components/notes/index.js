/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Column } from 'rbx';
import '../../styles/notes.scss';
import { push as Menu } from 'react-burger-menu';
import List from './list';
import Editor from './editor';
import Search from './search';
import NotesService from '../../services/notes';

function Notes(props) {
  const [notes, setNotes] = useState([]);
  const [current_note, setCurrentNote] = useState({ title: '', body: '', id: '' });

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
    await NotesService.delete(note._id);
    fetchNotes();
  };

  const updateNote = async (oldNote, params) => {
    const updatedNote = await NotesService.update(oldNote._id, params);
    const index = notes.indexOf(oldNote);
    const newNotes = notes;
    newNotes[index] = updatedNote.data;
    setNotes(newNotes);
    setCurrentNote(updatedNote.data);
  };

  const searchNotes = async (query) => {
    const response = await NotesService.search(query);
    setNotes(response.data);
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
          pageWrapId="notes-editor"
          isOpen={props.isOpen}
          onStateChange={(state) => props.setIsOpen(state.isOpen)}
          disableAutoFocus
          outerContainerId="notes"
          customBurgerIcon={false}
          customCrossIcon={false}
        >
          <Column.Group>
            <Column size={10} offset={1}>
              <Search searchNotes={searchNotes} fetchNotes={fetchNotes} />
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
          <Editor
            note={current_note}
            updateNote={updateNote}
          />
        </Column>
      </Column.Group>
    </>
  );
}

export default Notes;
