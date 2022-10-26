import React, { useState } from 'react';

export default function Book(props) {
  const { id, name, price, complete } = props;

  const [text, setText] = useState({
    name: 'Peter',
    age: 24,
    message: 'random message',
  });

  const [isChange, setIsChange] = useState(false);

  const changeHandler = (id) => {
    if (id === 1) {
      // return setText({ ...text, message: 123 });
      return setText((text) => ({ ...text, message: 666 }));
    }
  };

  return (
    <div>
      <input type="checkbox" checked={isChange} onChange={() => setIsChange(!isChange)} />
      <h1>{name}</h1>
      <p>{price}</p>
      <h1>{text.name}</h1>
      <h1>{text.message}</h1>

      <button onClick={() => changeHandler(id)}>Change</button>
    </div>
  );
}
