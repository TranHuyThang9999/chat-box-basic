import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Button } from 'zmp-ui';

const DinoGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [dinoPosition, setDinoPosition] = useState({ bottom: 0, jumping: false });
  const [obstacles, setObstacles] = useState([]);
  const gameRef = useRef(null);
  const animationFrameRef = useRef(null);
  const obstacleTimerRef = useRef(null);
  const scoreTimerRef = useRef(null);

  // Game constants
  const JUMP_HEIGHT = 120;
  const JUMP_DURATION = 500; // ms
  const GRAVITY = 0.6;
  const OBSTACLE_SPEED = 5;
  const OBSTACLE_INTERVAL_MIN = 1000; // ms
  const OBSTACLE_INTERVAL_MAX = 2500; // ms

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setDinoPosition({ bottom: 0, jumping: false });
    setObstacles([]);
    
    // Start generating obstacles
    generateObstacle();
    
    // Start score counter
    scoreTimerRef.current = setInterval(() => {
      setScore(prevScore => prevScore + 1);
    }, 100);
    
    // Start game loop
    gameLoop();
  };

  // Game loop
  const gameLoop = () => {
    updateObstacles();
    checkCollisions();
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  // Update obstacles positions
  const updateObstacles = () => {
    setObstacles(prevObstacles => 
      prevObstacles
        .map(obstacle => ({
          ...obstacle,
          left: obstacle.left - OBSTACLE_SPEED
        }))
        .filter(obstacle => obstacle.left > -50)
    );
  };

  // Generate new obstacle
  const generateObstacle = () => {
    if (gameOver) return;
    
    const randomHeight = Math.floor(Math.random() * 30) + 30;
    const randomWidth = Math.floor(Math.random() * 20) + 20;
    
    setObstacles(prevObstacles => [
      ...prevObstacles,
      {
        id: Date.now(),
        left: 600,
        height: randomHeight,
        width: randomWidth,
        type: Math.random() > 0.5 ? 'cactus' : 'bird'
      }
    ]);
    
    // Schedule next obstacle
    const randomInterval = Math.floor(
      Math.random() * (OBSTACLE_INTERVAL_MAX - OBSTACLE_INTERVAL_MIN) + OBSTACLE_INTERVAL_MIN
    );
    
    obstacleTimerRef.current = setTimeout(generateObstacle, randomInterval);
  };

  // Check for collisions
  const checkCollisions = () => {
    const dinoRect = {
      left: 50,
      right: 50 + 40,
      top: 200 - dinoPosition.bottom - 60,
      bottom: 200 - dinoPosition.bottom
    };
    
    for (const obstacle of obstacles) {
      const obstacleRect = {
        left: obstacle.left,
        right: obstacle.left + obstacle.width,
        top: obstacle.type === 'bird' ? 200 - 100 - obstacle.height : 200 - obstacle.height,
        bottom: obstacle.type === 'bird' ? 200 - 100 : 200
      };
      
      if (
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom
      ) {
        endGame();
        break;
      }
    }
  };

  // End the game
  const endGame = () => {
    setGameOver(true);
    clearInterval(scoreTimerRef.current);
    clearTimeout(obstacleTimerRef.current);
    cancelAnimationFrame(animationFrameRef.current);
    
    if (score > highScore) {
      setHighScore(score);
    }
  };

  // Handle jump
  const jump = () => {
    if (dinoPosition.jumping || gameOver) return;
    
    setDinoPosition({ bottom: 0, jumping: true });
    
    let jumpVelocity = 10;
    let jumpHeight = 0;
    
    const jumpInterval = setInterval(() => {
      jumpHeight += jumpVelocity;
      jumpVelocity -= GRAVITY;
      
      if (jumpHeight <= 0) {
        clearInterval(jumpInterval);
        setDinoPosition({ bottom: 0, jumping: false });
      } else {
        setDinoPosition({ bottom: jumpHeight, jumping: true });
      }
    }, 20);
  };

  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.key === 'ArrowUp') && gameStarted) {
        jump();
      } else if (e.code === 'Space' && !gameStarted) {
        startGame();
      } else if (e.code === 'Space' && gameOver) {
        startGame();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, gameOver, dinoPosition.jumping]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(scoreTimerRef.current);
      clearTimeout(obstacleTimerRef.current);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <Box className="w-full max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <Text size="large" bold>Dinosaur Game</Text>
        <div className="flex space-x-4">
          <Text>Score: {score}</Text>
          <Text>High Score: {highScore}</Text>
        </div>
      </div>
      
      <div 
        ref={gameRef}
        className="relative w-full h-[200px] border-b-2 border-gray-400 bg-white overflow-hidden"
        onClick={() => {
          if (!gameStarted) {
            startGame();
          } else if (!gameOver) {
            jump();
          } else {
            startGame();
          }
        }}
      >
        {/* Game area */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <Text size="xlarge" bold className="mb-4">Dinosaur Game</Text>
            <Button className="bg-blue-500 text-white">Press Space or Tap to Start</Button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center flex-col bg-black/30">
            <Text size="xlarge" bold className="mb-2 text-white">Game Over</Text>
            <Text className="mb-4 text-white">Score: {score}</Text>
            <Button className="bg-blue-500 text-white">Press Space or Tap to Restart</Button>
          </div>
        )}
        
        {/* Dinosaur */}
        <div 
          className="absolute left-[50px] w-[40px] h-[60px] bg-gray-800"
          style={{ 
            bottom: `${dinoPosition.bottom}px`,
            transition: dinoPosition.jumping ? 'none' : 'bottom 0.1s',
          }}
        >
          <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-700"></div>
          <div className={`absolute bottom-0 ${dinoPosition.jumping ? 'left-3' : 'left-0'} w-4 h-10 bg-gray-700`}></div>
          <div className={`absolute bottom-0 ${dinoPosition.jumping ? 'right-3' : 'right-0'} w-4 h-10 bg-gray-700`}></div>
        </div>
        
        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className={`absolute bottom-0 ${obstacle.type === 'bird' ? 'bottom-[100px]' : 'bottom-0'}`}
            style={{
              left: `${obstacle.left}px`,
              height: `${obstacle.height}px`,
              width: `${obstacle.width}px`,
              backgroundColor: obstacle.type === 'cactus' ? '#2d8a39' : '#8a2d2d',
            }}
          >
            {obstacle.type === 'bird' && (
              <>
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-700"></div>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700"></div>
              </>
            )}
            {obstacle.type === 'cactus' && (
              <>
                <div className="absolute top-1/3 left-1/3 w-1/3 h-1/2 bg-green-800"></div>
                <div className="absolute top-1/4 right-1/3 w-1/4 h-1/3 bg-green-800"></div>
              </>
            )}
          </div>
        ))}
        
        {/* Ground details */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bottom-0 w-1 h-1 bg-gray-400"
            style={{ left: `${i * 30 + Math.random() * 10}px` }}
          ></div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Text size="small" className="text-gray-500">
          Press Space or tap to jump. Avoid obstacles and survive as long as possible!
        </Text>
      </div>
    </Box>
  );
};

export default DinoGame;