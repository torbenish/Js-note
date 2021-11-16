/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Column, Tag, Title, List, Button,
} from 'rbx';
import Moment from 'moment';

function ListNotes(props) {
  return (
    <>
      <Column.Group breakpoint="mobile">
        <Column size={6} offset={1}>
          <Title size={6}>
            {props.notes.length}
            {' '}
            Notes
          </Title>
        </Column>
      </Column.Group>
      <List className="notes-list">
        {props.notes.map((item, key) => (
          <List.Item
            key={key}
            onClick={() => props.selectNote(item._id)}
            active={item === props.current_note}
          >
            <Title size={6}>
              {item.title.replace(/(<([^>]+)>)/gi, '').substring(0, 15)}
            </Title>
            <Title size={6} subtitle spaced={false}>
              {item.body.replace(/(<([^>]+)>)/gi, '').substring(0, 30)}
            </Title>

            <Column size={2}>
              <Button
                state="active"
                color="custom-purple"
                outlined
                size="small"
                onClick={() => props.createNote()}
              >
                Notes +
              </Button>
            </Column>

            <Column.Group breakpoint="mobile">
              <Column size={10}>
                <Tag color="dark">
                  {Moment(item.created_at).format('DD/MM')}
                </Tag>
              </Column>
            </Column.Group>
          </List.Item>
        ))}
      </List>
    </>
  );
}

export default ListNotes;
