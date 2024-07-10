import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [leftTiming, setLeftTiming] = useState(120);
  const [value, setValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistake, setMistake] = useState(0);
  const [score, setScore] = useState(0);
  const [checkScore, setCheckScore] = useState(false);
  const text = "Hyderabad, is the capital of the state Telangana, India. It also goes by its sobriquet City of Pearls. As of 2010 it is the sixth most populous city and sixth-most populous urban agglomeration in India. Hyderabad was founded by Muhammad Quli Qutb Shah in 1591 on the banks of Musi. Today the city covers an area of approximately 650 km2.The twin cities of Hyderabad and Secunderabad come under the ambit of a single municipal unit, The Greater Hyderabad Municipal Corporation.";

  const reset = () => {
    setLeftTiming(120);
    setValue('');
    setMistake(0);
    setScore(0);
    setCheckScore(false);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (leftTiming > 0) {
        setLeftTiming((prev) => prev - 1);
      } else {
        clearInterval(timer);
        setCheckScore(true); // Automatically show score when timing is up
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [leftTiming]);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      // Decrease the score if the character being removed was correct
      if (currentIndex > 0) {
        if (text[currentIndex - 1] === value[currentIndex - 1]) {
          setScore((prev) => prev - 1);
        } else {
          setMistake((prev) => prev - 1);
          setScore((prev) => prev + 1);
        }
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.length <= text.length) {
      if (inputValue.length > currentIndex) {
        if (text[inputValue.length - 1] !== inputValue[inputValue.length - 1]) {
          setMistake((prev) => prev + 1);
          setScore((prev) => prev - 1);
        } else {
          setScore((prev) => prev + 1);
        }
      }
      setCurrentIndex(inputValue.length);
    }
  };

  const renderTextWithColors = () => {
    return text.split('').map((char, index) => {
      const inputChar = value[index];
      const color = inputChar === char ? 'green' : 'red';
      return <span key={index} style={{ color: inputChar ? color : 'black' }}>{char}</span>;
    });
  };

  return (
    <div className="App">
      <div className="main">
        <h1>Typing Test</h1>
        <p>
          leftTiming: <span style={{ backgroundColor: leftTiming > 50 ? 'green' : 'red' }}>{leftTiming} Sec</span>
        </p>
        <p>mistakes: {mistake}</p>
        {checkScore && <p>Total Point: {score}/{text.length}</p>}
      </div>

      <div className="container">
        <div className="text-container">
          <h4>{text}</h4>
        </div>
        <div className="textarea">
          {checkScore ? (
            <div className="result-text">
              {renderTextWithColors()}
            </div>
          ) : (
            <textarea
              className="input-textarea"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={value}
            />
          )}
        </div>
      </div>

      {!checkScore ? (
        <button className="control-button" onClick={() => setCheckScore(true)}>Get Score</button>
      ) : (
        <button className="control-button" onClick={reset}>Reset</button>
      )}
    </div>
  );
}

export default App;
