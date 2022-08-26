import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button } from '@mui/material';

let operatorStyle = {
  fontSize: "30px"
}

let buttonStyle = {
  color: "black",
  fontSize: "30px"
};

function isOperator(c) {
  return c == '%' || c == '÷' || c == '×' || c == '+' || c == '−' || c == '^';
}

let timeoutId;

function App() {
  const [haveResult, setHaveResult] = useState(false);
  const [num, setNum] = useState('');
  const addChar = (c) => {
    if (haveResult) {
      setHaveResult(false);
      if (isOperator(c)) {
        setNum(num + c);
      } else {
        setNum(c);
      }
    } else {
      if (c === '×' && num.length > 0 && num.charAt(num.length - 1) === '×') {
        setNum(num.substring(0, num.length - 1) + '^');
      } else {
        setNum(num + c);
      }
    }
  };
  const evaluate = () => {
    let expression = num.replace(/[÷×−^]/g, (m) => {
      return {
        '÷': '/',
        '×': '*',
        '−': '-',
        '^': '**',
      }[m];
    });
    setHaveResult(true);
    try {
      setNum(eval(expression));
    } catch (e) {
      console.log(e);
      setNum("ERROR");
    }
  };
  const clear = () => {
    if (haveResult) {
      setNum('');
      setHaveResult(false);
    } else if (num.length > 0) {
      setNum(num.substring(0, num.length - 1));
      timeoutId = setTimeout(() => {
        setNum('');
      }, 1000)
    }
  };
  const cancelTimeout = () => {
    clearTimeout(timeoutId);
  };
  return (
    <div className="app">
      <h1>Calculator</h1>
      <div className="widget">
        <p className="display">{num}</p>
        <Button sx={operatorStyle} onMouseDown={clear} onMouseUp={cancelTimeout}>{haveResult ? "AC" : "CE"}</Button>
        <Button sx={operatorStyle} onClick={() => addChar('(')}>(</Button>
        <Button sx={operatorStyle} onClick={() => addChar(')')}>)</Button>
        <Button sx={operatorStyle} onClick={() => addChar('^')}>^</Button>
        <Button sx={operatorStyle} onClick={() => addChar('%')}>%</Button>
        <Button sx={buttonStyle} onClick={() => addChar('7')}>7</Button>
        <Button sx={buttonStyle} onClick={() => addChar('8')}>8</Button>
        <Button sx={buttonStyle} onClick={() => addChar('9')}>9</Button>
        <Button sx={operatorStyle} onClick={() => addChar('÷')}>÷</Button>
        <Button sx={buttonStyle} onClick={() => addChar('4')}>4</Button>
        <Button sx={buttonStyle} onClick={() => addChar('5')}>5</Button>
        <Button sx={buttonStyle} onClick={() => addChar('6')}>6</Button>
        <Button sx={operatorStyle} onClick={() => addChar('×')}>×</Button>
        <Button sx={buttonStyle} onClick={() => addChar('1')}>1</Button>
        <Button sx={buttonStyle} onClick={() => addChar('2')}>2</Button>
        <Button sx={buttonStyle} onClick={() => addChar('3')}>3</Button>
        <Button sx={operatorStyle} onClick={() => addChar('−')}>−</Button>
        <Button sx={buttonStyle} onClick={() => addChar('0')}>0</Button>
        <Button sx={buttonStyle} onClick={() => addChar('.')}>.</Button>
        <Button sx={operatorStyle} variant="contained" onClick={evaluate}>=</Button>
        <Button sx={operatorStyle} onClick={() => addChar('+')}>+</Button>
      </div>
    </div>
  )
}

export default App;