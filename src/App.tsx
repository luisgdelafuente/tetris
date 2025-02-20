import React from 'react';
import { useTetris } from './hooks/useTetris';
import Board from './components/Board';
import { Gamepad2, RotateCcw, ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';

function App() {
  const { gameState, resetGame, moveHorizontally, moveDown, rotate } = useTetris();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-4 sm:p-8 rounded-xl shadow-2xl max-w-full">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          <h1 className="text-lg sm:text-xl font-bold text-white">AlvaroTetris.xyz v1.2</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <Board gameState={gameState} />
          
          <div className="text-white">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Puntuación</h2>
              <p className="text-xl sm:text-2xl font-bold text-purple-500">{gameState.score}</p>
            </div>
            
            <div className="mb-4 sm:mb-6 hidden sm:block">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Controles</h2>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-300">
                <li>↑ Rotar</li>
                <li>← Mover Izquierda</li>
                <li>→ Mover Derecha</li>
                <li>↓ Mover Abajo</li>
              </ul>
            </div>

            {gameState.gameOver && (
              <div>
                <p className="text-lg sm:text-xl font-bold text-red-500 mb-3 sm:mb-4">¡Juego Terminado!</p>
                <button
                  onClick={resetGame}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Jugar de Nuevo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="mt-6 grid grid-cols-3 gap-4 sm:hidden">
          <div className="flex justify-center">
            <button
              onClick={() => moveHorizontally(-1)}
              className="p-4 bg-gray-700 rounded-full text-white active:bg-gray-600 touch-manipulation"
              aria-label="Move Left"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={rotate}
              className="p-4 bg-gray-700 rounded-full text-white active:bg-gray-600 touch-manipulation"
              aria-label="Rotate"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => moveHorizontally(1)}
              className="p-4 bg-gray-700 rounded-full text-white active:bg-gray-600 touch-manipulation"
              aria-label="Move Right"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <div className="col-span-3 flex justify-center">
            <button
              onClick={moveDown}
              className="p-4 bg-gray-700 rounded-full text-white active:bg-gray-600 touch-manipulation"
              aria-label="Move Down"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;