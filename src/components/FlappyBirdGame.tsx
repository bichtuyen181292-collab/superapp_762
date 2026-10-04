import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, RotateCcw, Copy, Check, Sparkles, Trophy, Home } from 'lucide-react';

// Required Configuration Variables as per specification
const WIN_SCORE = 20;
const GRAVITY = 0.28;
const JUMP_FORCE = -5.8;
const PIPE_SPEED = 2.4;
const PIPE_GAP = 165; // Wide enough for comfortable counter playing
const VOUCHER_TEXT = 'Voucher 2 lít xăng';
const BRAND_NAME = 'VietinBank';
const GAME_TITLE = 'Chờ vui – Chơi hay – Nhận quà liền tay';

interface FlappyBirdGameProps {
  onBackToHome?: () => void;
}

export const FlappyBirdGame: React.FC<FlappyBirdGameProps> = ({ onBackToHome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game states
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('flappy_high_score') || '0', 10);
  });
  const [latestVoucher, setLatestVoucher] = useState<string | null>(() => {
    return localStorage.getItem('flappy_latest_voucher') || null;
  });
  const [activeVoucher, setActiveVoucher] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Motivational message based on score
  const getMotivationalMessage = (score: number) => {
    if (score < 5) return 'Khởi động nhẹ nhàng!';
    if (score < 10) return 'Tốt lắm, tiếp tục nào!';
    if (score < 15) return 'Một nửa chặng đường rồi!';
    if (score < 20) return 'Sắp nhận quà rồi!';
    return 'Xuất sắc!';
  };

  // Helper: Generate voucher code format VB-XXXXXX
  const generateVoucherCode = useCallback((): string => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `VB-${randomDigits}`;
  }, []);

  const copyVoucherCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Internal mutable game loop references
  const gameRef = useRef({
    animationFrameId: 0,
    birdY: 200,
    birdVelocity: 0,
    birdX: 80,
    birdRadius: 18,
    pipes: [] as Array<{ x: number; top: number; bottom: number; passed: boolean }>,
    score: 0,
    status: 'idle' as 'idle' | 'playing' | 'gameover' | 'won',
    lastPipeSpawn: 0,
    voucherGenerated: false,
  });

  // Sound generator using Web Audio API (muted by default)
  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted
    }
  };

  // Start game action
  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    gameRef.current = {
      animationFrameId: 0,
      birdY: canvas.height / 2,
      birdVelocity: 0,
      birdX: 70,
      birdRadius: 18,
      pipes: [],
      score: 0,
      status: 'playing',
      lastPipeSpawn: Date.now(),
      voucherGenerated: false,
    };
    
    setCurrentScore(0);
    setGameState('playing');
    playBeep(440, 'sine', 0.15);
  };

  // Jump action
  const handleJump = useCallback(() => {
    if (gameRef.current.status === 'playing') {
      gameRef.current.birdVelocity = JUMP_FORCE;
      playBeep(600, 'triangle', 0.08);
    } else if (gameRef.current.status === 'idle') {
      startGame();
    }
  }, [soundEnabled]);

  // Win game action
  const winGame = useCallback((finalScore: number) => {
    gameRef.current.status = 'won';
    setGameState('won');

    const newVoucher = generateVoucherCode();
    setActiveVoucher(newVoucher);
    setLatestVoucher(newVoucher);
    localStorage.setItem('flappy_latest_voucher', newVoucher);
    
    // Update high score
    const newHigh = Math.max(highScore, finalScore);
    setHighScore(newHigh);
    localStorage.setItem('flappy_high_score', newHigh.toString());

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    playBeep(880, 'sine', 0.3);

    // Call window callback if defined as per specs
    if (typeof (window as unknown as { onFlappyVoucherWin?: (data: unknown) => void }).onFlappyVoucherWin === 'function') {
      (window as unknown as { onFlappyVoucherWin: (data: unknown) => void }).onFlappyVoucherWin({
        score: WIN_SCORE,
        voucherCode: newVoucher,
        reward: VOUCHER_TEXT,
        timestamp: new Date().toISOString(),
      });
    }
  }, [generateVoucherCode, highScore, soundEnabled]);

  // End game action (Loss)
  const endGame = useCallback((finalScore: number) => {
    gameRef.current.status = 'gameover';
    setGameState('gameover');

    // Update high score
    const newHigh = Math.max(highScore, finalScore);
    setHighScore(newHigh);
    localStorage.setItem('flappy_high_score', newHigh.toString());

    playBeep(180, 'sawtooth', 0.25);

    // Call window callback if defined as per specs
    if (typeof (window as unknown as { onFlappyVoucherLose?: (data: unknown) => void }).onFlappyVoucherLose === 'function') {
      (window as unknown as { onFlappyVoucherLose: (data: unknown) => void }).onFlappyVoucherLose({
        score: finalScore,
        timestamp: new Date().toISOString(),
      });
    }
  }, [highScore, soundEnabled]);

  const resetGame = () => {
    startGame();
  };

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const { width, height } = canvas;
      const game = gameRef.current;

      // 1. Clear & Background Gradient (VietinBank sky theme)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#E1F0FA');
      bgGrad.addColorStop(0.7, '#C5E3F6');
      bgGrad.addColorStop(1, '#8AC4EB');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Clouds decoration
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.arc(80, 70, 28, 0, Math.PI * 2);
      ctx.arc(110, 60, 35, 0, Math.PI * 2);
      ctx.arc(140, 70, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(280, 110, 25, 0, Math.PI * 2);
      ctx.arc(310, 100, 30, 0, Math.PI * 2);
      ctx.arc(335, 110, 22, 0, Math.PI * 2);
      ctx.fill();

      // Ground (VietinBank Navy / City silhouette)
      ctx.fillStyle = '#003B70';
      ctx.fillRect(0, height - 35, width, 35);
      ctx.fillStyle = '#ED1C24';
      ctx.fillRect(0, height - 35, width, 4);

      // 2. Logic Update if playing
      if (game.status === 'playing') {
        // Bird physics
        game.birdVelocity += GRAVITY;
        game.birdY += game.birdVelocity;

        // Ground / Ceiling collision
        if (game.birdY + game.birdRadius >= height - 35) {
          endGame(game.score);
        }
        if (game.birdY - game.birdRadius <= 0) {
          game.birdY = game.birdRadius;
          game.birdVelocity = 0;
        }

        // Pipe spawning
        const now = Date.now();
        if (now - game.lastPipeSpawn > 1650) {
          const minPipeTop = 60;
          const maxPipeTop = height - 35 - PIPE_GAP - 60;
          const topHeight = Math.floor(minPipeTop + Math.random() * (maxPipeTop - minPipeTop));
          game.pipes.push({
            x: width,
            top: topHeight,
            bottom: topHeight + PIPE_GAP,
            passed: false,
          });
          game.lastPipeSpawn = now;
        }

        // Move pipes & collision detection
        for (let i = game.pipes.length - 1; i >= 0; i--) {
          const pipe = game.pipes[i];
          pipe.x -= PIPE_SPEED;

          // Check if bird passed pipe
          if (!pipe.passed && pipe.x + 55 < game.birdX) {
            pipe.passed = true;
            game.score += 1;
            setCurrentScore(game.score);
            playBeep(520, 'sine', 0.1);

            // Win condition reached!
            if (game.score >= WIN_SCORE) {
              winGame(WIN_SCORE);
              break;
            }
          }

          // Collision with pipe bounds
          const birdLeft = game.birdX - game.birdRadius;
          const birdRight = game.birdX + game.birdRadius;
          const birdTop = game.birdY - game.birdRadius;
          const birdBottom = game.birdY + game.birdRadius;

          const pipeLeft = pipe.x;
          const pipeRight = pipe.x + 55;

          if (birdRight > pipeLeft && birdLeft < pipeRight) {
            // Check top or bottom collision
            if (birdTop < pipe.top || birdBottom > pipe.bottom) {
              endGame(game.score);
              break;
            }
          }

          // Remove off-screen pipes
          if (pipe.x < -60) {
            game.pipes.splice(i, 1);
          }
        }
      }

      // 3. Draw Pipes (VietinBank styled columns)
      game.pipes.forEach((pipe) => {
        // Top Pipe
        const topGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + 55, 0);
        topGrad.addColorStop(0, '#004880');
        topGrad.addColorStop(0.5, '#0066B3');
        topGrad.addColorStop(1, '#003366');
        ctx.fillStyle = topGrad;
        ctx.fillRect(pipe.x, 0, 55, pipe.top);

        // Top Pipe Rim
        ctx.fillStyle = '#ED1C24';
        ctx.fillRect(pipe.x - 3, pipe.top - 12, 61, 12);

        // Bottom Pipe
        const botGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + 55, 0);
        botGrad.addColorStop(0, '#004880');
        botGrad.addColorStop(0.5, '#0066B3');
        botGrad.addColorStop(1, '#003366');
        ctx.fillStyle = botGrad;
        ctx.fillRect(pipe.x, pipe.bottom, 55, height - 35 - pipe.bottom);

        // Bottom Pipe Rim
        ctx.fillStyle = '#ED1C24';
        ctx.fillRect(pipe.x - 3, pipe.bottom, 61, 12);
      });

      // 4. Draw Bird / VietinBank Mascot or Card
      ctx.save();
      ctx.translate(game.birdX, game.birdY);
      
      // Slight rotation based on velocity
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, game.birdVelocity * 0.07));
      ctx.rotate(angle);

      // Card-like mascot body
      ctx.fillStyle = '#ED1C24';
      ctx.beginPath();
      ctx.roundRect(-18, -14, 36, 28, 8);
      ctx.fill();

      // Card accent stripe (VietinBank Blue)
      ctx.fillStyle = '#003B70';
      ctx.beginPath();
      ctx.roundRect(-18, -4, 36, 8, 2);
      ctx.fill();

      // Wing (flapping animation)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(-4, 0, 9, 6, Math.sin(Date.now() / 80) * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(8, -6, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#003B70';
      ctx.beginPath();
      ctx.arc(10, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Beak / Front tip
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.moveTo(14, -2);
      ctx.lineTo(24, 1);
      ctx.lineTo(14, 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Request next frame
      game.animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(gameRef.current.animationFrameId);
    };
  }, [endGame, winGame]);

  // Keyboard controls (Space key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleJump]);

  return (
    <div id="flappy-voucher-game" className="relative max-w-2xl mx-auto select-none">
      {/* Game Header Bar */}
      <div className="bg-white border border-slate-200 rounded-t-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
            {BRAND_NAME} Kiosk Challenge
          </span>
          <h3 className="text-base md:text-lg font-bold text-[#003B70]">
            {GAME_TITLE}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-sky-50 px-3 py-1 rounded-xl border border-sky-200 text-xs">
            <span className="text-slate-500">Mục tiêu: </span>
            <strong className="text-[#003B70] font-black">{WIN_SCORE} điểm</strong>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Progress & Live Motivation Bar */}
      <div className="bg-sky-900 text-white px-4 py-2 flex items-center justify-between gap-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span>Điểm: <strong className="text-amber-300 text-sm font-bold">{currentScore}/{WIN_SCORE}</strong></span>
          <span className="hidden sm:inline text-sky-300">|</span>
          <span className="hidden sm:inline text-amber-200">{getMotivationalMessage(currentScore)}</span>
        </div>

        {/* Progress bar 0 to 20 */}
        <div className="flex-1 max-w-[180px] bg-sky-950/60 rounded-full h-2.5 overflow-hidden border border-sky-700">
          <div 
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-200"
            style={{ width: `${Math.min(100, (currentScore / WIN_SCORE) * 100)}%` }}
          />
        </div>

        <div className="text-sky-200 text-[11px]">
          Kỷ lục: <strong>{highScore}</strong>
        </div>
      </div>

      {/* Canvas Area Container */}
      <div 
        className="relative bg-sky-100 overflow-hidden cursor-pointer touch-none"
        onClick={handleJump}
        style={{ touchAction: 'manipulation' }}
      >
        <canvas
          ref={canvasRef}
          width={520}
          height={400}
          className="w-full h-[360px] md:h-[400px] block"
        />

        {/* Start Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-[#003B70]/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl md:text-2xl font-black">
                {GAME_TITLE}
              </h4>
              <p className="text-amber-200 text-sm font-medium">
                Vượt qua {WIN_SCORE} thử thách để nhận {VOUCHER_TEXT}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="px-8 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg hover:shadow-red-500/30 transition transform active:scale-95 cursor-pointer"
            >
              Bắt đầu chơi
            </button>

            <p className="text-xs text-sky-200 animate-pulse">
              Chạm màn hình hoặc nhấn Space để bay
            </p>

            {latestVoucher && (
              <div className="mt-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs text-amber-200 border border-white/10">
                Mã gần nhất: <span className="font-mono font-bold text-white">{latestVoucher}</span>
              </div>
            )}
          </div>
        )}

        {/* Game Over Overlay (Loss) */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-red-600/30 border border-red-500/50 flex items-center justify-center">
              <RotateCcw className="w-7 h-7 text-red-400" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg md:text-xl font-bold text-red-200">
                Rất tiếc, bạn đã vượt qua {currentScore}/{WIN_SCORE} thử thách
              </h4>
              <p className="text-xs md:text-sm text-slate-300">
                Chỉ còn một chút nữa thôi, hãy thử lại nhé!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetGame();
                }}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGameState('idle');
                  if (onBackToHome) onBackToHome();
                }}
                className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Về màn hình chính</span>
              </button>
            </div>
          </div>
        )}

        {/* Win Overlay */}
        {gameState === 'won' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#003B70]/95 to-sky-950/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-xl animate-bounce">
              <Trophy className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-amber-300 font-bold text-xs uppercase tracking-widest">
                Xuất sắc hoàn thành
              </span>
              <h4 className="text-2xl font-black text-white">
                Chúc mừng!
              </h4>
              <p className="text-xs md:text-sm text-sky-100 max-w-sm mx-auto">
                Bạn đã vượt qua 20 thử thách và đủ điều kiện nhận <strong>{VOUCHER_TEXT}</strong>.
              </p>
            </div>

            {/* Voucher Code Card */}
            <div className="bg-white/10 border-2 border-dashed border-amber-300 p-4 rounded-2xl max-w-xs w-full space-y-2">
              <span className="text-[11px] text-amber-200 uppercase font-semibold">Mã nhận quà của Quý khách</span>
              <div className="text-2xl md:text-3xl font-mono font-black tracking-widest text-amber-300 bg-black/40 py-2 rounded-xl">
                {activeVoucher}
              </div>
              <p className="text-[11px] text-sky-200">
                Vui lòng chụp màn hình hoặc đưa mã này cho nhân viên để nhận quà.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyVoucherCode(activeVoucher);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs md:text-sm transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Đã sao chép' : 'Sao chép mã'}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetGame();
                }}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs md:text-sm transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="bg-slate-50 border border-slate-200 rounded-b-2xl p-3 text-center text-xs text-slate-500">
        💡 <strong>Mẹo nhỏ:</strong> Nhấn nhẹ ngón tay hoặc phím Space để bay nhịp nhàng. Không va vào ống và mặt đất.
      </div>
    </div>
  );
};
