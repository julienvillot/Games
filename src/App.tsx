import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
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
      <div className="logo-subtext">KIDS' LEARNING HUB</div>
      <div className="logo-decoration dec-1">🎨</div>
      <div className="logo-decoration dec-2">🚀</div>
      <div className="logo-decoration dec-3">🧩</div>
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

interface NumberRound {
  targetNumber: number;
  targetWord: Word;
  choices: number[];
}

interface ColorRound {
  targetColor: string;
  choices: Word[];
}

const fallbackWords: Word[] = [
  { word: 'sun', rhymeGroup: 1, icon: 'https://openmoji.org/data/color/svg/2600.svg', color: 'yellow' },
  { word: 'run', rhymeGroup: 1, icon: 'https://openmoji.org/data/color/svg/1F3C3.svg', color: 'blue' },
  { word: 'cat', rhymeGroup: 2, icon: 'https://openmoji.org/data/color/svg/1F408.svg', color: 'black' },
  { word: 'hat', rhymeGroup: 2, icon: 'https://openmoji.org/data/color/svg/1F452.svg', color: 'red' },
  { word: 'dog', rhymeGroup: 3, icon: 'https://openmoji.org/data/color/svg/1F415.svg', color: 'brown' },
  { word: 'log', rhymeGroup: 3, icon: 'https://openmoji.org/data/color/svg/1FAB5.svg', color: 'brown' },
  { word: 'bee', rhymeGroup: 4, icon: 'https://openmoji.org/data/color/svg/1F41D.svg', color: 'yellow' },
  { word: 'tree', rhymeGroup: 4, icon: 'https://openmoji.org/data/color/svg/1F333.svg', color: 'green' },
  { word: 'car', rhymeGroup: 5, icon: 'https://openmoji.org/data/color/svg/1F697.svg', color: 'red' },
  { word: 'star', rhymeGroup: 5, icon: 'https://openmoji.org/data/color/svg/2B50.svg', color: 'yellow' }
];

function generateRound(wordList: Word[]): Round {
  const rhymeGroups = Array.from(new Set(wordList.map(w => w.rhymeGroup)));
  const correctGroup = rhymeGroups[Math.floor(Math.random() * rhymeGroups.length)];
  const correctWords = wordList.filter(w => w.rhymeGroup === correctGroup);
  const wrongGroups = rhymeGroups.filter(g => g !== correctGroup);
  const selectedWrongGroups = wrongGroups.sort(() => Math.random() - 0.5).slice(0, 2);

  const words: Word[] = [...correctWords];
  selectedWrongGroups.forEach(group => {
    const groupWords = wordList.filter(w => w.rhymeGroup === group);
    const randomWord = groupWords[Math.floor(Math.random() * groupWords.length)];
    words.push(randomWord);
  });

  return { words: words.sort(() => Math.random() - 0.5) };
}

function generateNumberRound(wordList: Word[]): NumberRound {
  const targetNumber = Math.floor(Math.random() * 10) + 1;
  const targetWord = wordList[Math.floor(Math.random() * wordList.length)];

  const choices = [targetNumber];
  while (choices.length < 4) {
    const random = Math.floor(Math.random() * 10) + 1;
    if (!choices.includes(random)) {
      choices.push(random);
    }
  }

  return {
    targetNumber,
    targetWord,
    choices: choices.sort(() => Math.random() - 0.5)
  };
}

function generateColorRound(wordList: Word[]): ColorRound {
  const allColors = Array.from(new Set(wordList.map(w => w.color)));
  const targetColor = allColors[Math.floor(Math.random() * allColors.length)];
  const correctWord = wordList.filter(w => w.color === targetColor)[Math.floor(Math.random() * wordList.filter(w => w.color === targetColor).length)];
  const otherWords = wordList.filter(w => w.color !== targetColor);
  const selectedOtherWords = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [correctWord, ...selectedOtherWords].sort(() => Math.random() - 0.5);

  return { targetColor, choices };
}

function App() {
  const [view, setView] = useState<'home' | 'rhyme-game' | 'number-game' | 'color-game'>('home');
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState<Round | null>(null);
  const [numberRound, setNumberRound] = useState<NumberRound | null>(null);
  const [colorRound, setColorRound] = useState<ColorRound | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    async function fetchWords() {
      try {
        const { data, error } = await supabase
          .from('words')
          .select('*');

        if (error) throw error;

        if (data) {
          const mappedWords: Word[] = data.map(w => ({
            word: w.word,
            rhymeGroup: w.rhyme_group_id,
            icon: w.icon_url,
            color: w.color
          }));
          setAllWords(mappedWords);
          initializeGames(mappedWords);
        }
      } catch (err) {
        console.error('Error fetching words:', err);
        setAllWords(fallbackWords);
        initializeGames(fallbackWords);
      } finally {
        setLoading(false);
      }
    }

    fetchWords();
  }, []);

  const initializeGames = (wordList: Word[]) => {
    setRound(generateRound(wordList));
    setNumberRound(generateNumberRound(wordList));
    setColorRound(generateColorRound(wordList));
  };

  const handleWordClick = (index: number) => {
    if (feedback !== null || selected.includes(index) || !round) return;

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
    setRound(generateRound(allWords));
    setSelected([]);
    setFeedback(null);
  };

  const startRhymeGame = () => {
    setScore(0);
    setRound(generateRound(allWords));
    setView('rhyme-game');
  };

  const startNumberGame = () => {
    setScore(0);
    setNumberRound(generateNumberRound(allWords));
    setView('number-game');
  };

  const startColorGame = () => {
    setScore(0);
    setColorRound(generateColorRound(allWords));
    setView('color-game');
  };

  const handleNumberChoice = (choice: number) => {
    if (feedback !== null || !numberRound) return;

    if (choice === numberRound.targetNumber) {
      setFeedback('correct');
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setNumberRound(generateNumberRound(allWords));
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
    if (feedback !== null || !colorRound) return;

    if (word.color === colorRound.targetColor) {
      setFeedback('correct');
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setColorRound(generateColorRound(allWords));
        setFeedback(null);
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="app loading">
        <div className="loader">✨ Loading magical games... ✨</div>
      </div>
    );
  }

  if (view === 'home') {
    return (
      <div className="app">
        <div className="home-container">
          <Logo />
          <p className="home-subtitle">Fun games to help you learn and grow!</p>

          <div className="games-grid">
            <div className="game-card card-pink" onClick={startRhymeGame}>
              <div className="game-card-icon">🎵</div>
              <h2 className="game-card-title">Rhyme Time</h2>
              <p className="game-card-desc">Find words that sound the same!</p>
            </div>

            <div className="game-card card-blue" onClick={startNumberGame}>
              <div className="game-card-icon">🔢</div>
              <h2 className="game-card-title">Number Fun</h2>
              <p className="game-card-desc">Count the pictures and pick the number!</p>
            </div>

            <div className="game-card card-orange" onClick={startColorGame}>
              <div className="game-card-icon">🌈</div>
              <h2 className="game-card-title">Find the Match</h2>
              <p className="game-card-desc">Find the matching color!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'number-game') {
    if (!numberRound) return null;
    return (
      <div className="app">
        {showConfetti && <Confetti />}
        <div className="game-container">
          <header className="header">
            <button className="back-button" onClick={() => setView('home')}>🏠 Home</button>
            <h1 className="title">🔢 Number Fun 🔢</h1>
            <div className="score">
              <span className="score-label">Score:</span>
              <span className="score-value">{score}</span>
            </div>
          </header>

          <p className="instruction">How many {numberRound.targetWord.word}s can you see?</p>

          <div className="counting-area">
            {Array.from({ length: numberRound.targetNumber }).map((_, i) => (
              <img key={i} src={numberRound.targetWord.icon} alt={numberRound.targetWord.word} className="counting-item" />
            ))}
          </div>

          <div className="number-choices">
            {numberRound.choices.map((choice) => (
              <button
                key={choice}
                className={`number-button ${feedback === 'correct' && choice === numberRound.targetNumber ? 'correct' : ''} ${feedback === 'incorrect' && choice !== numberRound.targetNumber ? 'disabled' : ''}`}
                onClick={() => handleNumberChoice(choice)}
              >
                {choice}
              </button>
            ))}
          </div>

          {feedback === 'correct' && <div className="feedback feedback-correct">✨ Perfect! Counted them right! ✨</div>}
          {feedback === 'incorrect' && <div className="feedback feedback-incorrect">💭 Not quite, try counting again! 💭</div>}
        </div>
      </div>
    );
  }

  if (view === 'color-game') {
    if (!colorRound) return null;
    return (
      <div className="app">
        {showConfetti && <Confetti />}
        <div className="game-container">
          <header className="header">
            <button className="back-button" onClick={() => setView('home')}>🏠 Home</button>
            <h1 className="title">🌈 Find the Match 🌈</h1>
            <div className="score">
              <span className="score-label">Score:</span>
              <span className="score-value">{score}</span>
            </div>
          </header>

          <div className="color-prompt">
            <p className="instruction">Can you find the matching color?</p>
            <div className="color-splash-container">
              <div className="color-splash" style={{ backgroundColor: colorRound.targetColor }}></div>
              <span className="color-name">{colorRound.targetColor.toUpperCase()}</span>
            </div>
          </div>

          <div className="words-grid">
            {colorRound.choices.map((wordObj, index) => (
              <div
                key={index}
                className={`word-card ${feedback === 'correct' && wordObj.color === colorRound.targetColor ? 'correct' : ''} ${feedback === 'incorrect' ? 'disabled' : ''}`}
                onClick={() => handleColorChoice(wordObj)}
              >
                <img src={wordObj.icon} alt={wordObj.word} className="icon" />
                <p className="word-text">{wordObj.word}</p>
              </div>
            ))}
          </div>

          {feedback === 'correct' && <div className="feedback feedback-correct">🎨 Wonderful! That's the color! 🎨</div>}
          {feedback === 'incorrect' && <div className="feedback feedback-incorrect">💭 Try looking for a different one! 💭</div>}
        </div>
      </div>
    );
  }

  if (view === 'rhyme-game') {
    if (!round) return null;
    return (
      <div className="app">
        {showConfetti && <Confetti />}
        <div className="game-container">
          <header className="header">
            <button className="back-button" onClick={() => setView('home')}>🏠 Home</button>
            <h1 className="title">🎵 Rhyme Time 🎵</h1>
            <div className="score">
              <span className="score-label">Score:</span>
              <span className="score-value">{score}</span>
            </div>
          </header>

          <p className="instruction">Find and click the two words that rhyme!</p>

          <div className="words-grid">
            {round.words.map((wordObj, index) => (
              <div
                key={index}
                className={`word-card ${selected.includes(index) ? 'selected' : ''} ${feedback === 'correct' && selected.includes(index) ? 'correct' : ''} ${feedback === 'incorrect' && selected.includes(index) ? 'incorrect' : ''}`}
                onClick={() => handleWordClick(index)}
              >
                <img src={wordObj.icon} alt={wordObj.word} className="icon" />
                <p className="word-text">{wordObj.word}</p>
              </div>
            ))}
          </div>

          {feedback === 'correct' && <div className="feedback feedback-correct">🎉 Great job! They rhyme! 🎉</div>}
          {feedback === 'incorrect' && <div className="feedback feedback-incorrect">💭 Try again! 💭</div>}
        </div>
      </div>
    );
  }

  return null;
}

function Confetti() {
  return (
    <div className="confetti-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: ['#FF69B4', '#FFD700', '#00FF7F', '#1E90FF', '#FF4500'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );
}

export default App;
