import React, { useState } from 'react';

function Calculator() {
  const [input, setInput] = useState('');

  // Handle button clicks
  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  // Handle evaluation of the input expression
  const handleEvaluate = () => {
    try {
      // Evaluate the expression and update the input state
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  // Handle clearing the input
  const handleClear = () => {
    setInput('');
  };

  // Handle deleting the last character
  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  return (
    <div>
      <div>
        <input type="text" value={input} readOnly />
      </div>
      <div>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>
      </div>
      <div>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
      </div>
      <div>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>
      </div>
      <div>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={handleEvaluate}>=</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
      <div>
        <button onClick={handleClear}>C</button>
        <button onClick={handleDelete}>DEL</button>
      </div>
    </div>
  );
}

export default Calculator;
