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
  { word: 'sun', rhymeGroup: 1, icon: 'https://picsum.photos/id/1011/200/200' }, // sun/sky
  { word: 'run', rhymeGroup: 1, icon: 'https://picsum.photos/id/1025/200/200' }, // running track
  { word: 'cat', rhymeGroup: 2, icon: 'https://picsum.photos/id/1074/200/200' }, // cat
  { word: 'hat', rhymeGroup: 2, icon: 'https://picsum.photos/id/1084/200/200' }, // hat/clothing
  { word: 'dog', rhymeGroup: 3, icon: 'https://picsum.photos/id/237/200/200' }, // dog
  { word: 'log', rhymeGroup: 3, icon: 'https://picsum.photos/id/1015/200/200' }, // wood/log
  { word: 'bee', rhymeGroup: 4, icon: 'https://picsum.photos/id/1060/200/200' }, // bee/flower
  { word: 'tree', rhymeGroup: 4, icon: 'https://picsum.photos/id/1018/200/200' }, // tree
  { word: 'car', rhymeGroup: 5, icon: 'https://picsum.photos/id/111/200/200' }, // car
  { word: 'star', rhymeGroup: 5, icon: 'https://picsum.photos/id/1033/200/200' }, // stars/night
  { word: 'fox', rhymeGroup: 6, icon: 'https://picsum.photos/id/1062/200/200' }, // fox/animal
  { word: 'box', rhymeGroup: 6, icon: 'https://picsum.photos/id/1080/200/200' }, // box/package
  { word: 'fish', rhymeGroup: 7, icon: 'https://picsum.photos/id/1063/200/200' }, // fish/water
  { word: 'dish', rhymeGroup: 7, icon: 'https://picsum.photos/id/1058/200/200' }, // dish/plate
  { word: 'bear', rhymeGroup: 8, icon: 'https://picsum.photos/id/1076/200/200' }, // bear/wildlife
  { word: 'chair', rhymeGroup: 8, icon: 'https://picsum.photos/id/1019/200/200' }, // chair
  { word: 'moon', rhymeGroup: 9, icon: 'https://picsum.photos/id/1033/200/200' }, // moon/night
  { word: 'spoon', rhymeGroup: 9, icon: 'https://picsum.photos/id/1054/200/200' }, // spoon/utensil
  { word: 'king', rhymeGroup: 10, icon: 'https://picsum.photos/id/1036/200/200' }, // king/crown
  { word: 'ring', rhymeGroup: 10, icon: 'https://picsum.photos/id/1090/200/200' }, // ring/jewelry
  { word: 'cake', rhymeGroup: 11, icon: 'https://picsum.photos/id/1060/200/200' }, // cake/dessert
  { word: 'snake', rhymeGroup: 11, icon: 'https://picsum.photos/id/1074/200/200' }, // snake/reptile
  { word: 'boat', rhymeGroup: 12, icon: 'https://picsum.photos/id/1067/200/200' }, // boat/water
  { word: 'goat', rhymeGroup: 12, icon: 'https://picsum.photos/id/1084/200/200' }, // goat/farm
  { word: 'train', rhymeGroup: 13, icon: 'https://picsum.photos/id/1081/200/200' }, // train/railway
  { word: 'rain', rhymeGroup: 13, icon: 'https://picsum.photos/id/1043/200/200' }, // rain/weather
  { word: 'house', rhymeGroup: 14, icon: 'https://picsum.photos/id/1080/200/200' }, // house/home
  { word: 'mouse', rhymeGroup: 14, icon: 'https://picsum.photos/id/1074/200/200' }, // mouse/rodent
  { word: 'ball', rhymeGroup: 15, icon: 'https://picsum.photos/id/1011/200/200' }, // ball/toy
  { word: 'wall', rhymeGroup: 15, icon: 'https://picsum.photos/id/1015/200/200' }, // wall/brick
  { word: 'book', rhymeGroup: 16, icon: 'https://picsum.photos/id/1058/200/200' }, // book/reading
  { word: 'cook', rhymeGroup: 16, icon: 'https://picsum.photos/id/1060/200/200' }, // cook/chef
  { word: 'frog', rhymeGroup: 17, icon: 'https://picsum.photos/id/1063/200/200' }, // frog/amphibian
  { word: 'hog', rhymeGroup: 17, icon: 'https://picsum.photos/id/1076/200/200' }, // pig/farm
  { word: 'plane', rhymeGroup: 18, icon: 'https://picsum.photos/id/1033/200/200' }, // airplane/sky
  { word: 'crane', rhymeGroup: 18, icon: 'https://picsum.photos/id/1018/200/200' }, // crane/bird
  { word: 'sheep', rhymeGroup: 19, icon: 'https://picsum.photos/id/1084/200/200' }, // sheep/farm
  { word: 'sleep', rhymeGroup: 19, icon: 'https://picsum.photos/id/1025/200/200' }, // sleep/bed
  { word: 'light', rhymeGroup: 20, icon: 'https://picsum.photos/id/1011/200/200' }, // light/lamp
  { word: 'kite', rhymeGroup: 20, icon: 'https://picsum.photos/id/1033/200/200' }, // kite/flying
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

  return (
    <div className="app">
      {showConfetti && <Confetti />}

      <div className="game-container">
        <header className="header">
          <h1 className="title">🎵 Find the Rhymes! 🎵</h1>
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
