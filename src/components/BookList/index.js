import React, { useState, useEffect } from 'react';

import Book from '../Book/index';

import './index.scss';

export default function BookList() {
  useEffect(() => {
    console.log('useEffect');
  }, []);
  console.log('outside');
  const addTodo = (inputValue) => {
    let copy = [...bookList];
    copy = [...copy, { id: bookList.length + 1, name: `書本${inputValue}`, price: 650, complete: true }];
    setBookList((bookList) => {
      return (bookList = copy);
    });
  };

  const clickHandler = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  const changeHandler = (e) => {
    setInputValue(() => {
      return e.target.value;
    });
  };

  const BooksData = [
    { id: 1, name: '書本1', price: 600, complete: false },
    { id: 2, name: '書本2', price: 800, complete: false },
  ];

  const [bookList, setBookList] = useState(BooksData);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="mainDate">
      <input type="text" onChange={(e) => changeHandler(e)} value={inputValue} />
      <button onClick={(e) => clickHandler(e)}>Enter</button>

      <p>{inputValue}</p>
      {bookList.map((book) => {
        return <Book key={book.id} {...book} />;
      })}
    </div>
  );
}
