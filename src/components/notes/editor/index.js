/* eslint-disable quote-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

function Editor(props) {
  const [currentContent, setCurrentContent] = useState('');

  useEffect(() => {
    setCurrentContent(props.note.body);
  }, [props.note]);

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <>
      <ReactQuill value={currentContent} modules={modules} />
    </>
  );
}

export default Editor;
