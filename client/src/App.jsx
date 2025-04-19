import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameBoard from "./components/GameBoard";

export default function App() {
  const WIDTH = 16;
  const HEIGHT = 10;
  const TOTAL_CELLS = WIDTH * HEIGHT;

  const [board, setBoard] = useState(() =>
    Array.from({ length: TOTAL_CELLS }, () => Math.floor(Math.random() * 7) + 1)
  );
  const [selected, setSelected] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startIndex, setStartIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); // 1분 30초
  const [gameOver, setGameOver] = useState(false);

  const onBlockMouseDown = (index) => {
    if (gameOver) return;
    setIsDragging(true);
    setStartIndex(index);
    setSelected([index]);
  };

  const onBlockMouseEnter = (index) => {
    if (!isDragging || startIndex === null) return;
    const newSelection = calculateRectangle(startIndex, index);
    setSelected(newSelection);
  };

  const calculateRectangle = (start, end) => {
    const x1 = Math.min(start % WIDTH, end % WIDTH);
    const x2 = Math.max(start % WIDTH, end % WIDTH);
    const y1 = Math.min(Math.floor(start / WIDTH), Math.floor(end / WIDTH));
    const y2 = Math.max(Math.floor(start / WIDTH), Math.floor(end / WIDTH));

    const result = [];
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        result.push(y * WIDTH + x);
      }
    }
    return result;
  };

  // 마우스 드래그 종료 처리
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging && selected.length > 0 && !gameOver) {
        const sum = selected.reduce((acc, idx) => acc + (board[idx] || 0), 0);
        if (sum % 4 === 0) {
          const newBoard = [...board];
          let deletedCount = 0;

          selected.forEach((idx) => {
            if (newBoard[idx] !== null) {
              newBoard[idx] = null;
              deletedCount += 1;
            }
          });

          setBoard(newBoard);
          setScore((prev) => prev + deletedCount); // 점수 추가
        }
      }

      setIsDragging(false);
      setStartIndex(null);
      setSelected([]);
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [isDragging, selected, board, gameOver]);

  // 타이머 처리
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const resetGame = () => {
    const newBoard = Array.from({ length: TOTAL_CELLS }, () =>
      Math.floor(Math.random() * 7) + 1
    );
    setBoard(newBoard);
    setSelected([]);
    setIsDragging(false);
    setStartIndex(null);
    setScore(0);
    setTimeLeft(90);
    setGameOver(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-2">🍊 Coin Game</h1>
        <p className="mb-1 text-lg">⏱️ Time Left: {timeLeft}s</p>
        <p className="mb-2 text-lg">🏆 Score: {score}</p>

        {gameOver && (
          <p className="text-red-600 text-xl font-bold mb-4">🎮 Game Over!</p>
        )}

        <button
          onClick={resetGame}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔁 Restart
        </button>

        <GameBoard
          board={board}
          selected={selected}
          onBlockMouseDown={onBlockMouseDown}
          onBlockMouseEnter={onBlockMouseEnter}
        />
      </div>
    </DndProvider>
  );
}
