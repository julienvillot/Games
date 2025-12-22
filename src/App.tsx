import { useState } from 'react';
import './App.css';

function Logo() {
  return (
    <div className="logo-container">
      <div className="logo-sparkles">✨</div>
      <div className="logo-text">
        <span className="name-olivia">Olivia</span>
        <span className="ampersand">&</span>
        <span className="name-zoe">Zoé</span>
      </div>
      <div className="logo-subtext">Learning Hub</div>
      <div className="logo-decoration dec-1">🎵</div>
      <div className="logo-decoration dec-2">🎨</div>
      <div className="logo-decoration dec-3">🔢</div>
    </div>
  );
}

interface Word {
  word: string;
  rhymeGroup: number;
  icon: string;
  color: string;
}

interface Round {
  words: Word[];
}


const allWords: Word[] = [
  // Existing Pairs
  { word: 'sun', rhymeGroup: 1, icon: 'https://openmoji.org/data/color/svg/2600.svg', color: 'yellow' },
  { word: 'run', rhymeGroup: 1, icon: 'https://openmoji.org/data/color/svg/1F3C3.svg', color: 'blue' },
  { word: 'cat', rhymeGroup: 2, icon: 'https://openmoji.org/data/color/svg/1F408.svg', color: 'black' },
  { word: 'hat', rhymeGroup: 2, icon: 'https://openmoji.org/data/color/svg/1F452.svg', color: 'red' },
  { word: 'dog', rhymeGroup: 3, icon: 'https://openmoji.org/data/color/svg/1F415.svg', color: 'brown' },
  { word: 'log', rhymeGroup: 3, icon: 'https://openmoji.org/data/color/svg/1FAB5.svg', color: 'brown' },
  { word: 'bee', rhymeGroup: 4, icon: 'https://openmoji.org/data/color/svg/1F41D.svg', color: 'yellow' },
  { word: 'tree', rhymeGroup: 4, icon: 'https://openmoji.org/data/color/svg/1F333.svg', color: 'green' },
  { word: 'car', rhymeGroup: 5, icon: 'https://openmoji.org/data/color/svg/1F697.svg', color: 'red' },
  { word: 'star', rhymeGroup: 5, icon: 'https://openmoji.org/data/color/svg/2B50.svg', color: 'yellow' },
  { word: 'fox', rhymeGroup: 6, icon: 'https://openmoji.org/data/color/svg/1F98A.svg', color: 'orange' },
  { word: 'box', rhymeGroup: 6, icon: 'https://openmoji.org/data/color/svg/1F4E6.svg', color: 'brown' },
  { word: 'fish', rhymeGroup: 7, icon: 'https://openmoji.org/data/color/svg/1F41F.svg', color: 'orange' },
  { word: 'dish', rhymeGroup: 7, icon: 'https://openmoji.org/data/color/svg/1F37D.svg', color: 'white' },
  { word: 'bear', rhymeGroup: 8, icon: 'https://openmoji.org/data/color/svg/1F43B.svg', color: 'brown' },
  { word: 'chair', rhymeGroup: 8, icon: 'https://openmoji.org/data/color/svg/1FA91.svg', color: 'brown' },
  { word: 'moon', rhymeGroup: 9, icon: 'https://openmoji.org/data/color/svg/1F319.svg', color: 'yellow' },
  { word: 'spoon', rhymeGroup: 9, icon: 'https://openmoji.org/data/color/svg/1F944.svg', color: 'white' },
  { word: 'king', rhymeGroup: 10, icon: 'https://openmoji.org/data/color/svg/1F451.svg', color: 'yellow' },
  { word: 'ring', rhymeGroup: 10, icon: 'https://openmoji.org/data/color/svg/1F48D.svg', color: 'yellow' },
  { word: 'cake', rhymeGroup: 11, icon: 'https://openmoji.org/data/color/svg/1F382.svg', color: 'pink' },
  { word: 'snake', rhymeGroup: 11, icon: 'https://openmoji.org/data/color/svg/1F40D.svg', color: 'green' },
  { word: 'boat', rhymeGroup: 12, icon: 'https://openmoji.org/data/color/svg/26F5.svg', color: 'white' },
  { word: 'goat', rhymeGroup: 12, icon: 'https://openmoji.org/data/color/svg/1F410.svg', color: 'white' },
  { word: 'train', rhymeGroup: 13, icon: 'https://openmoji.org/data/color/svg/1F682.svg', color: 'red' },
  { word: 'rain', rhymeGroup: 13, icon: 'https://openmoji.org/data/color/svg/1F327.svg', color: 'blue' },
  { word: 'house', rhymeGroup: 14, icon: 'https://openmoji.org/data/color/svg/1F3E0.svg', color: 'red' },
  { word: 'mouse', rhymeGroup: 14, icon: 'https://openmoji.org/data/color/svg/1F401.svg', color: 'grey' },
  { word: 'ball', rhymeGroup: 15, icon: 'https://openmoji.org/data/color/svg/26BD.svg', color: 'white' },
  { word: 'wall', rhymeGroup: 15, icon: 'https://openmoji.org/data/color/svg/1F9F1.svg', color: 'red' },
  { word: 'book', rhymeGroup: 16, icon: 'https://openmoji.org/data/color/svg/1F4D6.svg', color: 'blue' },
  { word: 'cook', rhymeGroup: 16, icon: 'https://openmoji.org/data/color/svg/1F373.svg', color: 'grey' },
  { word: 'frog', rhymeGroup: 17, icon: 'https://openmoji.org/data/color/svg/1F438.svg', color: 'green' },
  { word: 'hog', rhymeGroup: 17, icon: 'https://openmoji.org/data/color/svg/1F416.svg', color: 'pink' },
  { word: 'plane', rhymeGroup: 18, icon: 'https://openmoji.org/data/color/svg/2708.svg', color: 'grey' },
  { word: 'crane', rhymeGroup: 18, icon: 'https://openmoji.org/data/color/svg/1F3D7.svg', color: 'yellow' },
  { word: 'sheep', rhymeGroup: 19, icon: 'https://openmoji.org/data/color/svg/1F411.svg', color: 'white' },
  { word: 'sleep', rhymeGroup: 19, icon: 'https://openmoji.org/data/color/svg/1F634.svg', color: 'blue' },
  { word: 'light', rhymeGroup: 20, icon: 'https://openmoji.org/data/color/svg/1F4A1.svg', color: 'yellow' },
  { word: 'kite', rhymeGroup: 20, icon: 'https://openmoji.org/data/color/svg/1FA81.svg', color: 'red' },

  // New Pairs (G21 - G50)
  { word: 'duck', rhymeGroup: 21, icon: 'https://openmoji.org/data/color/svg/1F986.svg', color: 'yellow' },
  { word: 'truck', rhymeGroup: 21, icon: 'https://openmoji.org/data/color/svg/1F69A.svg', color: 'red' },
  { word: 'clock', rhymeGroup: 22, icon: 'https://openmoji.org/data/color/svg/231B.svg', color: 'white' },
  { word: 'rock', rhymeGroup: 22, icon: 'https://openmoji.org/data/color/svg/1F535.svg', color: 'blue' },
  { word: 'sock', rhymeGroup: 23, icon: 'https://openmoji.org/data/color/svg/1F9E6.svg', color: 'blue' },
  { word: 'lock', rhymeGroup: 23, icon: 'https://openmoji.org/data/color/svg/1F512.svg', color: 'yellow' },
  { word: 'pig', rhymeGroup: 24, icon: 'https://openmoji.org/data/color/svg/1F437.svg', color: 'pink' },
  { word: 'wig', rhymeGroup: 24, icon: 'https://openmoji.org/data/color/svg/1F9B1.svg', color: 'brown' },
  { word: 'shoe', rhymeGroup: 25, icon: 'https://openmoji.org/data/color/svg/1F45E.svg', color: 'brown' },
  { word: 'blue', rhymeGroup: 25, icon: 'https://openmoji.org/data/color/svg/2B55.svg', color: 'blue' },
  { word: 'whale', rhymeGroup: 26, icon: 'https://openmoji.org/data/color/svg/1F40B.svg', color: 'blue' },
  { word: 'snail', rhymeGroup: 26, icon: 'https://openmoji.org/data/color/svg/1F40C.svg', color: 'brown' },
  { word: 'bag', rhymeGroup: 27, icon: 'https://openmoji.org/data/color/svg/1F45C.svg', color: 'brown' },
  { word: 'flag', rhymeGroup: 27, icon: 'https://openmoji.org/data/color/svg/1F3F4.svg', color: 'black' },
  { word: 'bug', rhymeGroup: 28, icon: 'https://openmoji.org/data/color/svg/1FA72.svg', color: 'red' },
  { word: 'mug', rhymeGroup: 28, icon: 'https://openmoji.org/data/color/svg/2615.svg', color: 'brown' },
  { word: 'pan', rhymeGroup: 29, icon: 'https://openmoji.org/data/color/svg/1F373.svg', color: 'grey' },
  { word: 'can', rhymeGroup: 29, icon: 'https://openmoji.org/data/color/svg/1F96B.svg', color: 'grey' },
  { word: 'hen', rhymeGroup: 30, icon: 'https://openmoji.org/data/color/svg/1F413.svg', color: 'red' },
  { word: 'pen', rhymeGroup: 30, icon: 'https://openmoji.org/data/color/svg/1F58A.svg', color: 'blue' },
  { word: 'jam', rhymeGroup: 31, icon: 'https://openmoji.org/data/color/svg/1F36F.svg', color: 'red' },
  { word: 'ham', rhymeGroup: 31, icon: 'https://openmoji.org/data/color/svg/1F953.svg', color: 'pink' },
  { word: 'net', rhymeGroup: 32, icon: 'https://openmoji.org/data/color/svg/1F578.svg', color: 'white' },
  { word: 'jet', rhymeGroup: 32, icon: 'https://openmoji.org/data/color/svg/1F6E9.svg', color: 'grey' },
  { word: 'map', rhymeGroup: 33, icon: 'https://openmoji.org/data/color/svg/1F5FA.svg', color: 'blue' },
  { word: 'cap', rhymeGroup: 33, icon: 'https://openmoji.org/data/color/svg/1F9E2.svg', color: 'blue' },
  { word: 'cup', rhymeGroup: 34, icon: 'https://openmoji.org/data/color/svg/1F964.svg', color: 'white' },
  { word: 'pup', rhymeGroup: 34, icon: 'https://openmoji.org/data/color/svg/1F436.svg', color: 'brown' },
  { word: 'bat', rhymeGroup: 35, icon: 'https://openmoji.org/data/color/svg/1F987.svg', color: 'black' },
  { word: 'rat', rhymeGroup: 35, icon: 'https://openmoji.org/data/color/svg/1F400.svg', color: 'grey' },
  { word: 'bed', rhymeGroup: 36, icon: 'https://openmoji.org/data/color/svg/1F6CF.svg', color: 'brown' },
  { word: 'red', rhymeGroup: 36, icon: 'https://openmoji.org/data/color/svg/1F7E5.svg', color: 'red' },
  { word: 'tie', rhymeGroup: 37, icon: 'https://openmoji.org/data/color/svg/1F454.svg', color: 'blue' },
  { word: 'pie', rhymeGroup: 37, icon: 'https://openmoji.org/data/color/svg/1F967.svg', color: 'brown' },
  { word: 'bell', rhymeGroup: 38, icon: 'https://openmoji.org/data/color/svg/1F514.svg', color: 'yellow' },
  { word: 'shell', rhymeGroup: 38, icon: 'https://openmoji.org/data/color/svg/1F41A.svg', color: 'white' },
  { word: 'eye', rhymeGroup: 39, icon: 'https://openmoji.org/data/color/svg/1F441.svg', color: 'white' },
  { word: 'fly', rhymeGroup: 39, icon: 'https://openmoji.org/data/color/svg/1FAB0.svg', color: 'black' },
  { word: 'nose', rhymeGroup: 40, icon: 'https://openmoji.org/data/color/svg/1F443.svg', color: 'white' },
  { word: 'rose', rhymeGroup: 40, icon: 'https://openmoji.org/data/color/svg/1F339.svg', color: 'red' },
  { word: 'fire', rhymeGroup: 41, icon: 'https://openmoji.org/data/color/svg/1F525.svg', color: 'orange' },
  { word: 'tire', rhymeGroup: 41, icon: 'https://openmoji.org/data/color/svg/1F6DE.svg', color: 'black' },
  { word: 'cube', rhymeGroup: 42, icon: 'https://openmoji.org/data/color/svg/1F3B2.svg', color: 'white' },
  { word: 'ice', rhymeGroup: 42, icon: 'https://openmoji.org/data/color/svg/1F9CA.svg', color: 'blue' },
  { word: 'nail', rhymeGroup: 43, icon: 'https://openmoji.org/data/color/svg/1F485.svg', color: 'pink' },
  { word: 'mail', rhymeGroup: 43, icon: 'https://openmoji.org/data/color/svg/1F4EB.svg', color: 'blue' },
  { word: 'door', rhymeGroup: 44, icon: 'https://openmoji.org/data/color/svg/1F6AA.svg', color: 'brown' },
  { word: 'four', rhymeGroup: 44, icon: 'https://openmoji.org/data/color/svg/34-20E3.svg', color: 'grey' },
  { word: 'hand', rhymeGroup: 45, icon: 'https://openmoji.org/data/color/svg/1F590.svg', color: 'white' },
  { word: 'sand', rhymeGroup: 45, icon: 'https://openmoji.org/data/color/svg/1F3D6.svg', color: 'yellow' },
  { word: 'key', rhymeGroup: 46, icon: 'https://openmoji.org/data/color/svg/1F511.svg', color: 'grey' },
  { word: 'tea', rhymeGroup: 46, icon: 'https://openmoji.org/data/color/svg/1F375.svg', color: 'brown' },
  { word: 'bow', rhymeGroup: 47, icon: 'https://openmoji.org/data/color/svg/1F380.svg', color: 'pink' },
  { word: 'cow', rhymeGroup: 47, icon: 'https://openmoji.org/data/color/svg/1F404.svg', color: 'white' },
  { word: 'pear', rhymeGroup: 48, icon: 'https://openmoji.org/data/color/svg/1F350.svg', color: 'green' },
  { word: 'hair', rhymeGroup: 48, icon: 'https://openmoji.org/data/color/svg/1F9B0.svg', color: 'brown' },
  { word: 'wing', rhymeGroup: 49, icon: 'https://openmoji.org/data/color/svg/1FABD.svg', color: 'white' },
  { word: 'sing', rhymeGroup: 49, icon: 'https://openmoji.org/data/color/svg/1F3A4.svg', color: 'grey' },
  { word: 'van', rhymeGroup: 50, icon: 'https://openmoji.org/data/color/svg/1F690.svg', color: 'grey' },
  { word: 'fan', rhymeGroup: 50, icon: 'https://openmoji.org/data/color/svg/1F300.svg', color: 'blue' },
];

interface NumberRound {
  targetNumber: number;
  targetWord: Word;
  choices: number[];
}

interface ColorRound {
  targetColor: string;
  choices: Word[];
}

function generateRound(): Round {
  const rhymeGroups = Array.from(new Set(allWords.map(w => w.rhymeGroup)));

  // Select one rhyme group for the correct answers
  const correctGroup = rhymeGroups[Math.floor(Math.random() * rhymeGroups.length)];

  // Get both words from the correct rhyme group
  const correctWords = allWords.filter(w => w.rhymeGroup === correctGroup);

  // Select 2 wrong answers from different rhyme groups
  const wrongGroups = rhymeGroups.filter(g => g !== correctGroup);
  const selectedWrongGroups = wrongGroups.sort(() => Math.random() - 0.5).slice(0, 2);

  const words: Word[] = [...correctWords];
  selectedWrongGroups.forEach(group => {
    const groupWords = allWords.filter(w => w.rhymeGroup === group);
    const randomWord = groupWords[Math.floor(Math.random() * groupWords.length)];
    words.push(randomWord);
  });

  // Shuffle all 4 words
  return { words: words.sort(() => Math.random() - 0.5) };
}

function generateNumberRound(): NumberRound {
  const targetNumber = Math.floor(Math.random() * 10) + 1;
  const targetWord = allWords[Math.floor(Math.random() * allWords.length)];

  const choices = [targetNumber];
  while (choices.length < 4) {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    if (!choices.includes(randomNum)) {
      choices.push(randomNum);
    }
  }

  return {
    targetNumber,
    targetWord,
    choices: choices.sort(() => Math.random() - 0.5),
  };
}

function generateColorRound(): ColorRound {
  const allColors = Array.from(new Set(allWords.map(w => w.color)));
  const targetColor = allColors[Math.floor(Math.random() * allColors.length)];

  const correctWord = allWords.filter(w => w.color === targetColor)[Math.floor(Math.random() * allWords.filter(w => w.color === targetColor).length)];

  const otherWords = allWords.filter(w => w.color !== targetColor);
  const selectedOtherWords = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);

  const choices = [correctWord, ...selectedOtherWords].sort(() => Math.random() - 0.5);

  return { targetColor, choices };
}

function App() {
  const [view, setView] = useState<'home' | 'rhyme-game' | 'number-game' | 'color-game'>('home');
  const [round, setRound] = useState<Round>(generateRound());
  const [numberRound, setNumberRound] = useState<NumberRound>(generateNumberRound());
  const [colorRound, setColorRound] = useState<ColorRound>(generateColorRound());
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleWordClick = (index: number) => {
    if (feedback !== null || selected.includes(index)) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const word1 = round.words[newSelected[0]];
      const word2 = round.words[newSelected[1]];

      if (word1.rhymeGroup === word2.rhymeGroup) {
        setFeedback('correct');
        setScore(score + 1);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          nextRound();
        }, 2000);
      } else {
        setFeedback('incorrect');
        setTimeout(() => {
          setSelected([]);
          setFeedback(null);
        }, 1000);
      }
    }
  };

  const nextRound = () => {
    setRound(generateRound());
    setSelected([]);
    setFeedback(null);
  };

  const startRhymeGame = () => {
    setScore(0);
    setRound(generateRound());
    setView('rhyme-game');
  };

  const startNumberGame = () => {
    setScore(0);
    setNumberRound(generateNumberRound());
    setView('number-game');
  };

  const startColorGame = () => {
    setScore(0);
    setColorRound(generateColorRound());
    setView('color-game');
  };

  const handleNumberChoice = (choice: number) => {
    if (feedback !== null) return;

    if (choice === numberRound.targetNumber) {
      setFeedback('correct');
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setNumberRound(generateNumberRound());
        setFeedback(null);
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  const handleColorChoice = (word: Word) => {
    if (feedback !== null) return;

    if (word.color === colorRound.targetColor) {
      setFeedback('correct');
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setColorRound(generateColorRound());
        setFeedback(null);
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  if (view === 'home') {
    return (
      <div className="app">
        <header className="home-header">
          <Logo />
          <p className="home-subtitle">Choose a game to start playing!</p>
        </header>

        <div className="games-grid">
          <div className="game-card rhyme-card" onClick={startRhymeGame}>
            <div className="game-card-icon">🎵</div>
            <h2 className="game-card-title">Rhyme Time</h2>
            <p className="game-card-desc">Find the words that sound the same!</p>
            <button className="play-button">Play Now</button>
          </div>

          <div className="game-card number-card" onClick={startNumberGame}>
            <div className="game-card-icon">🔢</div>
            <h2 className="game-card-title">Number Fun</h2>
            <p className="game-card-desc">Count the items and pick the number!</p>
            <button className="play-button">Play Now</button>
          </div>

          <div className="game-card color-card" onClick={startColorGame}>
            <div className="game-card-icon">🎨</div>
            <h2 className="game-card-title">Find the Match</h2>
            <p className="game-card-desc">Find the object with the right color!</p>
            <button className="play-button">Play Now</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'number-game') {
    return (
      <div className="app">
        {showConfetti && <Confetti />}
        <div className="game-container">
          <header className="header">
            <button className="back-button" onClick={() => setView('home')}>
              🏠 Home
            </button>
            <h1 className="title">🔢 Number Fun 🔢</h1>
            <div className="score">
              <span className="score-label">Score:</span>
              <span className="score-value">{score}</span>
            </div>
          </header>

          <p className="instruction">How many items can you count?</p>

          <div className="counting-area">
            <div className="items-grid">
              {Array.from({ length: numberRound.targetNumber }).map((_, i) => (
                <div key={i} className="counting-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <img src={numberRound.targetWord.icon} alt="item" className="item-icon" />
                </div>
              ))}
            </div>
          </div>

          <div className="number-choices">
            {numberRound.choices.map((choice: number) => (
              <button
                key={choice}
                className={`number-button ${feedback === 'correct' && choice === numberRound.targetNumber ? 'correct' : ''} 
                  ${feedback === 'incorrect' && choice !== numberRound.targetNumber ? 'dimmed' : ''}`}
                onClick={() => handleNumberChoice(choice)}
              >
                {choice}
              </button>
            ))}
          </div>

          {feedback === 'correct' && (
            <div className="feedback feedback-correct">
              <span className="feedback-emoji">🌟</span>
              <span className="feedback-text">Awesome counting!</span>
            </div>
          )}

          {feedback === 'incorrect' && (
            <div className="feedback feedback-incorrect">
              <span className="feedback-emoji">❓</span>
              <span className="feedback-text">Try counting again!</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'color-game') {
    return (
      <div className="app">
        {showConfetti && <Confetti />}
        <div className="game-container">
          <header className="header">
            <button className="back-button" onClick={() => setView('home')}>
              🏠 Home
            </button>
            <h1 className="title">🎨 Find the Match 🎨</h1>
            <div className="score">
              <span className="score-label">Score:</span>
              <span className="score-value">{score}</span>
            </div>
          </header>

          <div className="color-prompt">
            <p className="instruction">Can you find something that is <strong>{colorRound.targetColor.toUpperCase()}</strong>?</p>
            <div className="color-splash" style={{ backgroundColor: colorRound.targetColor }}></div>
          </div>

          <div className="words-grid">
            {colorRound.choices.map((wordObj: Word, index: number) => (
              <div
                key={index}
                className={`word-card ${feedback === 'correct' && wordObj.color === colorRound.targetColor ? 'correct' : ''} 
                  ${feedback === 'incorrect' && wordObj.color !== colorRound.targetColor ? 'incorrect' : ''}`}
                onClick={() => handleColorChoice(wordObj)}
              >
                <img src={wordObj.icon} alt={wordObj.word} className="icon" />
                <p className="word-text">{wordObj.word}</p>
              </div>
            ))}
          </div>

          {feedback === 'correct' && (
            <div className="feedback feedback-correct">
              <span className="feedback-emoji">🌈</span>
              <span className="feedback-text">Perfect! That's {colorRound.targetColor}!</span>
            </div>
          )}

          {feedback === 'incorrect' && (
            <div className="feedback feedback-incorrect">
              <span className="feedback-emoji">🎨</span>
              <span className="feedback-text">Check the color again!</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {showConfetti && <Confetti />}

      <div className="game-container">
        <header className="header">
          <button className="back-button" onClick={() => setView('home')}>
            🏠 Home
          </button>
          <h1 className="title">🎵 Rhyme Time 🎵</h1>
          <div className="score">
            <span className="score-label">Score:</span>
            <span className="score-value">{score}</span>
          </div>
        </header>

        <p className="instruction">Find and click the two words that rhyme!</p>

        <div className="words-grid">
          {round.words.map((wordObj: Word, index: number) => (
            <div
              key={index}
              className={`word-card ${selected.includes(index) ? 'selected' : ''} ${feedback === 'correct' && selected.includes(index) ? 'correct' : ''
                } ${feedback === 'incorrect' && selected.includes(index) ? 'incorrect' : ''}`}
              onClick={() => handleWordClick(index)}
            >
              <img src={wordObj.icon} alt={wordObj.word} className="icon" />
              <p className="word-text">{wordObj.word}</p>
            </div>
          ))}
        </div>

        {feedback === 'correct' && (
          <div className="feedback feedback-correct">
            <span className="feedback-emoji">🎉</span>
            <span className="feedback-text">Great job! They rhyme!</span>
          </div>
        )}

        {feedback === 'incorrect' && (
          <div className="feedback feedback-incorrect">
            <span className="feedback-emoji">💭</span>
            <span className="feedback-text">Try again!</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Confetti() {
  const colors = ['#FF6B9D', '#4ECDC4', '#FFE66D', '#95E1D3', '#A8E6CF'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  );
}

export default App;
