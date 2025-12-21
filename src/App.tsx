import { useState } from 'react';
import './App.css';

interface Word {
  word: string;
  rhymeGroup: number;
  icon: string;
}

interface Round {
  words: Word[];
}

const allWords: Word[] = [
  // Existing Pairs
  { word: 'sun', rhymeGroup: 1, icon: 'https://openmoji.org/data/color/svg/2600.svg' },
  { word: 'run', rhymeGroup: 1, icon: 'https://openmoji.org/data/color/svg/1F3C3.svg' },
  { word: 'cat', rhymeGroup: 2, icon: 'https://openmoji.org/data/color/svg/1F408.svg' },
  { word: 'hat', rhymeGroup: 2, icon: 'https://openmoji.org/data/color/svg/1F452.svg' },
  { word: 'dog', rhymeGroup: 3, icon: 'https://openmoji.org/data/color/svg/1F415.svg' },
  { word: 'log', rhymeGroup: 3, icon: 'https://openmoji.org/data/color/svg/1FAB5.svg' },
  { word: 'bee', rhymeGroup: 4, icon: 'https://openmoji.org/data/color/svg/1F41D.svg' },
  { word: 'tree', rhymeGroup: 4, icon: 'https://openmoji.org/data/color/svg/1F333.svg' },
  { word: 'car', rhymeGroup: 5, icon: 'https://openmoji.org/data/color/svg/1F697.svg' },
  { word: 'star', rhymeGroup: 5, icon: 'https://openmoji.org/data/color/svg/2B50.svg' },
  { word: 'fox', rhymeGroup: 6, icon: 'https://openmoji.org/data/color/svg/1F98A.svg' },
  { word: 'box', rhymeGroup: 6, icon: 'https://openmoji.org/data/color/svg/1F4E6.svg' },
  { word: 'fish', rhymeGroup: 7, icon: 'https://openmoji.org/data/color/svg/1F41F.svg' },
  { word: 'dish', rhymeGroup: 7, icon: 'https://openmoji.org/data/color/svg/1F37D.svg' },
  { word: 'bear', rhymeGroup: 8, icon: 'https://openmoji.org/data/color/svg/1F43B.svg' },
  { word: 'chair', rhymeGroup: 8, icon: 'https://openmoji.org/data/color/svg/1FA91.svg' },
  { word: 'moon', rhymeGroup: 9, icon: 'https://openmoji.org/data/color/svg/1F319.svg' },
  { word: 'spoon', rhymeGroup: 9, icon: 'https://openmoji.org/data/color/svg/1F944.svg' },
  { word: 'king', rhymeGroup: 10, icon: 'https://openmoji.org/data/color/svg/1F451.svg' },
  { word: 'ring', rhymeGroup: 10, icon: 'https://openmoji.org/data/color/svg/1F48D.svg' },
  { word: 'cake', rhymeGroup: 11, icon: 'https://openmoji.org/data/color/svg/1F382.svg' },
  { word: 'snake', rhymeGroup: 11, icon: 'https://openmoji.org/data/color/svg/1F40D.svg' },
  { word: 'boat', rhymeGroup: 12, icon: 'https://openmoji.org/data/color/svg/26F5.svg' },
  { word: 'goat', rhymeGroup: 12, icon: 'https://openmoji.org/data/color/svg/1F410.svg' },
  { word: 'train', rhymeGroup: 13, icon: 'https://openmoji.org/data/color/svg/1F682.svg' },
  { word: 'rain', rhymeGroup: 13, icon: 'https://openmoji.org/data/color/svg/1F327.svg' },
  { word: 'house', rhymeGroup: 14, icon: 'https://openmoji.org/data/color/svg/1F3E0.svg' },
  { word: 'mouse', rhymeGroup: 14, icon: 'https://openmoji.org/data/color/svg/1F401.svg' },
  { word: 'ball', rhymeGroup: 15, icon: 'https://openmoji.org/data/color/svg/26BD.svg' },
  { word: 'wall', rhymeGroup: 15, icon: 'https://openmoji.org/data/color/svg/1F9F1.svg' },
  { word: 'book', rhymeGroup: 16, icon: 'https://openmoji.org/data/color/svg/1F4D6.svg' },
  { word: 'cook', rhymeGroup: 16, icon: 'https://openmoji.org/data/color/svg/1F373.svg' },
  { word: 'frog', rhymeGroup: 17, icon: 'https://openmoji.org/data/color/svg/1F438.svg' },
  { word: 'hog', rhymeGroup: 17, icon: 'https://openmoji.org/data/color/svg/1F416.svg' },
  { word: 'plane', rhymeGroup: 18, icon: 'https://openmoji.org/data/color/svg/2708.svg' },
  { word: 'crane', rhymeGroup: 18, icon: 'https://openmoji.org/data/color/svg/1F3D7.svg' },
  { word: 'sheep', rhymeGroup: 19, icon: 'https://openmoji.org/data/color/svg/1F411.svg' },
  { word: 'sleep', rhymeGroup: 19, icon: 'https://openmoji.org/data/color/svg/1F634.svg' },
  { word: 'light', rhymeGroup: 20, icon: 'https://openmoji.org/data/color/svg/1F4A1.svg' },
  { word: 'kite', rhymeGroup: 20, icon: 'https://openmoji.org/data/color/svg/1FA81.svg' },

  // New Pairs (G21 - G50)
  { word: 'duck', rhymeGroup: 21, icon: 'https://openmoji.org/data/color/svg/1F986.svg' },
  { word: 'truck', rhymeGroup: 21, icon: 'https://openmoji.org/data/color/svg/1F69A.svg' },
  { word: 'clock', rhymeGroup: 22, icon: 'https://openmoji.org/data/color/svg/231B.svg' },
  { word: 'rock', rhymeGroup: 22, icon: 'https://openmoji.org/data/color/svg/1F535.svg' },
  { word: 'sock', rhymeGroup: 23, icon: 'https://openmoji.org/data/color/svg/1F9E6.svg' },
  { word: 'lock', rhymeGroup: 23, icon: 'https://openmoji.org/data/color/svg/1F512.svg' },
  { word: 'pig', rhymeGroup: 24, icon: 'https://openmoji.org/data/color/svg/1F437.svg' },
  { word: 'wig', rhymeGroup: 24, icon: 'https://openmoji.org/data/color/svg/1F9B1.svg' },
  { word: 'shoe', rhymeGroup: 25, icon: 'https://openmoji.org/data/color/svg/1F45E.svg' },
  { word: 'blue', rhymeGroup: 25, icon: 'https://openmoji.org/data/color/svg/2B55.svg' },
  { word: 'whale', rhymeGroup: 26, icon: 'https://openmoji.org/data/color/svg/1F40B.svg' },
  { word: 'snail', rhymeGroup: 26, icon: 'https://openmoji.org/data/color/svg/1F40C.svg' },
  { word: 'bag', rhymeGroup: 27, icon: 'https://openmoji.org/data/color/svg/1F45C.svg' },
  { word: 'flag', rhymeGroup: 27, icon: 'https://openmoji.org/data/color/svg/1F3F4.svg' },
  { word: 'bug', rhymeGroup: 28, icon: 'https://openmoji.org/data/color/svg/1FA72.svg' },
  { word: 'mug', rhymeGroup: 28, icon: 'https://openmoji.org/data/color/svg/2615.svg' },
  { word: 'pan', rhymeGroup: 29, icon: 'https://openmoji.org/data/color/svg/1F373.svg' },
  { word: 'can', rhymeGroup: 29, icon: 'https://openmoji.org/data/color/svg/1F96B.svg' },
  { word: 'hen', rhymeGroup: 30, icon: 'https://openmoji.org/data/color/svg/1F413.svg' },
  { word: 'pen', rhymeGroup: 30, icon: 'https://openmoji.org/data/color/svg/1F58A.svg' },
  { word: 'jam', rhymeGroup: 31, icon: 'https://openmoji.org/data/color/svg/1F36F.svg' },
  { word: 'ham', rhymeGroup: 31, icon: 'https://openmoji.org/data/color/svg/1F953.svg' },
  { word: 'net', rhymeGroup: 32, icon: 'https://openmoji.org/data/color/svg/1F578.svg' },
  { word: 'jet', rhymeGroup: 32, icon: 'https://openmoji.org/data/color/svg/1F6E9.svg' },
  { word: 'map', rhymeGroup: 33, icon: 'https://openmoji.org/data/color/svg/1F5FA.svg' },
  { word: 'cap', rhymeGroup: 33, icon: 'https://openmoji.org/data/color/svg/1F9E2.svg' },
  { word: 'cup', rhymeGroup: 34, icon: 'https://openmoji.org/data/color/svg/1F964.svg' },
  { word: 'pup', rhymeGroup: 34, icon: 'https://openmoji.org/data/color/svg/1F436.svg' },
  { word: 'bat', rhymeGroup: 35, icon: 'https://openmoji.org/data/color/svg/1F987.svg' },
  { word: 'rat', rhymeGroup: 35, icon: 'https://openmoji.org/data/color/svg/1F400.svg' },
  { word: 'bed', rhymeGroup: 36, icon: 'https://openmoji.org/data/color/svg/1F6CF.svg' },
  { word: 'red', rhymeGroup: 36, icon: 'https://openmoji.org/data/color/svg/1F7E5.svg' },
  { word: 'tie', rhymeGroup: 37, icon: 'https://openmoji.org/data/color/svg/1F454.svg' },
  { word: 'pie', rhymeGroup: 37, icon: 'https://openmoji.org/data/color/svg/1F967.svg' },
  { word: 'bell', rhymeGroup: 38, icon: 'https://openmoji.org/data/color/svg/1F514.svg' },
  { word: 'shell', rhymeGroup: 38, icon: 'https://openmoji.org/data/color/svg/1F41A.svg' },
  { word: 'eye', rhymeGroup: 39, icon: 'https://openmoji.org/data/color/svg/1F441.svg' },
  { word: 'fly', rhymeGroup: 39, icon: 'https://openmoji.org/data/color/svg/1FAB0.svg' },
  { word: 'nose', rhymeGroup: 40, icon: 'https://openmoji.org/data/color/svg/1F443.svg' },
  { word: 'rose', rhymeGroup: 40, icon: 'https://openmoji.org/data/color/svg/1F339.svg' },
  { word: 'fire', rhymeGroup: 41, icon: 'https://openmoji.org/data/color/svg/1F525.svg' },
  { word: 'tire', rhymeGroup: 41, icon: 'https://openmoji.org/data/color/svg/1F6DE.svg' },
  { word: 'cube', rhymeGroup: 42, icon: 'https://openmoji.org/data/color/svg/1F3B2.svg' },
  { word: 'ice', rhymeGroup: 42, icon: 'https://openmoji.org/data/color/svg/1F9CA.svg' },
  { word: 'nail', rhymeGroup: 43, icon: 'https://openmoji.org/data/color/svg/1F485.svg' },
  { word: 'mail', rhymeGroup: 43, icon: 'https://openmoji.org/data/color/svg/1F4EB.svg' },
  { word: 'door', rhymeGroup: 44, icon: 'https://openmoji.org/data/color/svg/1F6AA.svg' },
  { word: 'four', rhymeGroup: 44, icon: 'https://openmoji.org/data/color/svg/34-20E3.svg' },
  { word: 'hand', rhymeGroup: 45, icon: 'https://openmoji.org/data/color/svg/1F590.svg' },
  { word: 'sand', rhymeGroup: 45, icon: 'https://openmoji.org/data/color/svg/1F3D6.svg' },
  { word: 'key', rhymeGroup: 46, icon: 'https://openmoji.org/data/color/svg/1F511.svg' },
  { word: 'tea', rhymeGroup: 46, icon: 'https://openmoji.org/data/color/svg/1F375.svg' },
  { word: 'bow', rhymeGroup: 47, icon: 'https://openmoji.org/data/color/svg/1F380.svg' },
  { word: 'cow', rhymeGroup: 47, icon: 'https://openmoji.org/data/color/svg/1F404.svg' },
  { word: 'pear', rhymeGroup: 48, icon: 'https://openmoji.org/data/color/svg/1F350.svg' },
  { word: 'hair', rhymeGroup: 48, icon: 'https://openmoji.org/data/color/svg/1F9B0.svg' },
  { word: 'wing', rhymeGroup: 49, icon: 'https://openmoji.org/data/color/svg/1FABD.svg' },
  { word: 'sing', rhymeGroup: 49, icon: 'https://openmoji.org/data/color/svg/1F3A4.svg' },
  { word: 'van', rhymeGroup: 50, icon: 'https://openmoji.org/data/color/svg/1F690.svg' },
  { word: 'fan', rhymeGroup: 50, icon: 'https://openmoji.org/data/color/svg/1F300.svg' },
];

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

function App() {
  const [view, setView] = useState<'home' | 'rhyme-game'>('home');
  const [round, setRound] = useState<Round>(generateRound());
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

  const startLevel = () => {
    setScore(0);
    setRound(generateRound());
    setView('rhyme-game');
  };

  if (view === 'home') {
    return (
      <div className="app">
        <header className="home-header">
          <h1 className="home-title">🌈 Kids' Learning Hub 🌈</h1>
          <p className="home-subtitle">Choose a game to start playing!</p>
        </header>

        <div className="games-grid">
          <div className="game-card rhyme-card" onClick={startLevel}>
            <div className="game-card-icon">🎵</div>
            <h2 className="game-card-title">Rhyme Time</h2>
            <p className="game-card-desc">Find the words that sound the same!</p>
            <button className="play-button">Play Now</button>
          </div>

          <div className="game-card disabled">
            <div className="game-card-icon">🔢</div>
            <h2 className="game-card-title">Number Fun</h2>
            <p className="game-card-desc">Coming Soon!</p>
          </div>

          <div className="game-card disabled">
            <div className="game-card-icon">🎨</div>
            <h2 className="game-card-title">Color Match</h2>
            <p className="game-card-desc">Coming Soon!</p>
          </div>
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
          {round.words.map((wordObj, index) => (
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
