import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Copy, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Flame,
  Gift,
  Share2
} from 'lucide-react';

interface SnakeGameProps {
  onBackToHome?: () => void;
}

const GRID_SIZE = 20; // 20x20 grid
const SPEED = 130; // moderate speed for counter ease

export const SnakeGame: React.FC<SnakeGameProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [milestoneNotice, setMilestoneNotice] = useState<string | null>(null);
  const [copiedSlip, setCopiedSlip] = useState<boolean>(false);
  const [completionTime, setCompletionTime] = useState<string>('');
  const [voucherCode, setVoucherCode] = useState<string>('');

  // Internal mutable state
  const stateRef = useRef({
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    score: 0,
    status: 'idle' as 'idle' | 'playing' | 'gameover',
    notified20: false,
    notified40: false,
    intervalId: 0,
  });

  // Generate random food position not on snake
  const spawnFood = (snake: Array<{ x: number; y: number }>) => {
    let newFood: { x: number; y: number };
    let collision: boolean;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      collision = snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
    } while (collision);
    return newFood;
  };

  const generateSnakeVoucher = () => {
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `VB-SNAKE-${rand}`;
  };

  const getRewardTier = (finalScore: number) => {
    if (finalScore >= 40) {
      return {
        vouchers: 2,
        title: '02 Voucher Xăng (Mỗi voucher 2 lít)',
        message: 'Chúc mừng Quý khách! Quý khách đủ điều kiện nhận 02 voucher xăng, mỗi voucher trị giá 2 lít.',
      };
    }
    if (finalScore >= 20) {
      return {
        vouchers: 1,
        title: '01 Voucher Xăng trị giá 2 lít',
        message: 'Chúc mừng Quý khách! Quý khách đủ điều kiện nhận 01 voucher xăng trị giá 2 lít.',
      };
    }
    return {
      vouchers: 0,
      title: 'Chưa đạt mốc thưởng',
      message: 'Rất tiếc, Quý khách chưa đạt mốc nhận voucher. Hãy thử lại để chinh phục mốc 20 điểm!',
    };
  };

  // Start game
  const startGame = () => {
    const initialSnake = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ];
    stateRef.current = {
      snake: initialSnake,
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      food: spawnFood(initialSnake),
      score: 0,
      status: 'playing',
      notified20: false,
      notified40: false,
      intervalId: 0,
    };
    setScore(0);
    setGameState('playing');
    setMilestoneNotice(null);
  };

  // Direction Change Handler (Prevent 180 reverse)
  const changeDirection = useCallback((dir: { x: number; y: number }) => {
    const current = stateRef.current.direction;
    if (dir.x !== 0 && current.x !== 0) return;
    if (dir.y !== 0 && current.y !== 0) return;
    stateRef.current.nextDirection = dir;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: 0, y: -1 });
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: 0, y: 1 });
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: -1, y: 0 });
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: 1, y: 0 });
      } else if (e.code === 'Space' && gameState !== 'playing') {
        e.preventDefault();
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, gameState]);

  // Main Game Loop (Step by Step)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    const gameTick = () => {
      const state = stateRef.current;
      if (state.status !== 'playing') return;

      // Update direction
      state.direction = state.nextDirection;
      const head = state.snake[0];
      const newHead = {
        x: head.x + state.direction.x,
        y: head.y + state.direction.y,
      };

      // 1. Check Wall Collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        handleGameOver();
        return;
      }

      // 2. Check Self Collision
      if (state.snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
        handleGameOver();
        return;
      }

      // 3. Move snake forward
      const newSnake = [newHead, ...state.snake];

      // 4. Check Food eaten
      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        state.score += 1;
        setScore(state.score);
        state.food = spawnFood(newSnake);

        // Check milestones without disrupting game
        if (state.score >= 40 && !state.notified40) {
          state.notified40 = true;
          setMilestoneNotice('Xuất sắc! Quý khách đã đạt 40 điểm! Nhận được 02 voucher xăng (2L/voucher)');
          confetti({ particleCount: 50, spread: 60 });
        } else if (state.score >= 20 && !state.notified20 && !state.notified40) {
          state.notified20 = true;
          setMilestoneNotice('Chúc mừng Quý khách đã đạt 20 điểm! Nhận được 01 voucher xăng 2 lít');
          confetti({ particleCount: 30, spread: 50 });
        }
      } else {
        newSnake.pop(); // Remove tail
      }

      state.snake = newSnake;

      // 5. Render Board
      renderGame(ctx, cellSize);
    };

    const handleGameOver = () => {
      stateRef.current.status = 'gameover';
      setGameState('gameover');
      const now = new Date();
      setCompletionTime(
        now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
        ' ' +
        now.toLocaleDateString('vi-VN')
      );
      setVoucherCode(generateSnakeVoucher());

      if (stateRef.current.score >= 20) {
        confetti({ particleCount: 60, spread: 70 });
      }
    };

    const renderGame = (ctx: CanvasRenderingContext2D, size: number) => {
      const state = stateRef.current;

      // Grid background
      ctx.fillStyle = '#0F253E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          ctx.fillRect(x * size + size / 2 - 1, y * size + size / 2 - 1, 2, 2);
        }
      }

      // Draw Food (Gift / VietinBank Coin)
      const foodX = state.food.x * size;
      const foodY = state.food.y * size;

      ctx.save();
      // Glowing food
      ctx.shadowColor = '#ED1C24';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ED1C24';
      ctx.beginPath();
      ctx.arc(foodX + size / 2, foodY + size / 2, size / 2.3, 0, Math.PI * 2);
      ctx.fill();

      // Coin center
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.arc(foodX + size / 2, foodY + size / 2, size / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Snake
      state.snake.forEach((segment, index) => {
        const segX = segment.x * size;
        const segY = segment.y * size;

        if (index === 0) {
          // Head
          ctx.fillStyle = '#00A3E0';
          ctx.beginPath();
          ctx.roundRect(segX + 1, segY + 1, size - 2, size - 2, 6);
          ctx.fill();

          // Eyes
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(segX + size / 3, segY + size / 3, 2.5, 0, Math.PI * 2);
          ctx.arc(segX + (size * 2) / 3, segY + size / 3, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Body gradient
          ctx.fillStyle = index % 2 === 0 ? '#0072CE' : '#005BAA';
          ctx.beginPath();
          ctx.roundRect(segX + 1.5, segY + 1.5, size - 3, size - 3, 4);
          ctx.fill();
        }
      });
    };

    const intervalId = window.setInterval(gameTick, SPEED);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameState]);

  const copySlip = (slipText: string) => {
    navigator.clipboard.writeText(slipText);
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 2000);
  };

  const finalReward = getRewardTier(score);

  return (
    <div className="max-w-xl mx-auto space-y-4 select-none">
      {/* Game Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
            VietinBank Mini Game 2
          </span>
          <h3 className="text-lg font-black text-[#003B70]">
            VietinBank Snake Challenge
          </h3>
          <p className="text-xs text-slate-500">
            Chơi vui tại quầy – Săn voucher xăng hấp dẫn
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 text-center">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Điểm hiện tại</span>
            <span className="text-xl font-black text-[#003B70]">{score}</span>
          </div>
        </div>
      </div>

      {/* Rules & Milestone tracker */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Mốc 20: <strong>01 Voucher 2L</strong>
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Gift className="w-3.5 h-3.5 text-red-500" />
            Mốc 40: <strong>02 Voucher 2L</strong>
          </span>
        </div>

        <div className="text-slate-500">
          Trạng thái:{' '}
          <strong className={score >= 40 ? 'text-emerald-600' : score >= 20 ? 'text-amber-600' : 'text-slate-700'}>
            {score >= 40 ? 'Đạt 2 Voucher 2L' : score >= 20 ? 'Đạt 1 Voucher 2L' : 'Chưa đạt mốc'}
          </strong>
        </div>
      </div>

      {/* Milestone Non-disruptive Toast */}
      {milestoneNotice && (
        <div className="bg-amber-100 border border-amber-300 text-amber-950 px-4 py-2 rounded-xl text-xs font-bold text-center animate-bounce">
          🎉 {milestoneNotice}
        </div>
      )}

      {/* Canvas Area Container */}
      <div className="relative bg-[#0F253E] rounded-2xl overflow-hidden shadow-md flex justify-center items-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full max-w-[400px] h-[350px] sm:h-[400px] block"
        />

        {/* Start Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-[#003B70]/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-black">
                VietinBank Snake Challenge
              </h4>
              <p className="text-xs text-sky-100 max-w-xs mx-auto">
                Dùng phím mũi tên hoặc nút bấm cảm ứng điều khiển rắn ăn điểm. Đạt 20 điểm nhận ngay 1 voucher xăng, 40 điểm nhận 2 voucher xăng!
              </p>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition transform active:scale-95 cursor-pointer"
            >
              Bắt đầu chơi
            </button>
          </div>
        )}

        {/* Game Over Slip Modal (Phiếu xác nhận quà tặng) */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white overflow-y-auto animate-fadeIn">
            {/* Voucher Slip Container */}
            <div className="bg-white text-slate-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl border-2 border-dashed border-red-400 space-y-3">
              <div className="text-center border-b border-slate-200 pb-2">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block">
                  VietinBank - Quầy Giao Dịch
                </span>
                <h4 className="text-base font-extrabold text-[#003B70]">
                  PHIẾU XÁC NHẬN QUÀ TẶNG
                </h4>
              </div>

              {/* Reward status */}
              <div className="text-center py-1">
                <div className="text-xs font-medium text-slate-600">
                  {finalReward.message}
                </div>
              </div>

              {/* Data rows */}
              <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Điểm cuối cùng:</span>
                  <strong className="text-[#003B70] text-sm">{score} điểm</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mức quà đạt được:</span>
                  <strong className="text-red-600">{finalReward.title}</strong>
                </div>
                {finalReward.vouchers > 0 && (
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Mã phiếu quà tặng:</span>
                    <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                      {voucherCode}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-slate-200 text-[11px]">
                  <span className="text-slate-500">Thời gian hoàn thành:</span>
                  <span className="text-slate-700">{completionTime}</span>
                </div>
              </div>

              {/* Notice */}
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-center font-medium">
                👉 Vui lòng chụp màn hình hoặc thông báo với giao dịch viên để nhận quà.
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                {finalReward.vouchers > 0 && (
                  <button
                    onClick={() =>
                      copySlip(
                        `VietinBank Voucher Slip:\nMã: ${voucherCode}\nĐiểm: ${score}\nQuà: ${finalReward.title}\nThời gian: ${completionTime}`
                      )
                    }
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    {copiedSlip ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSlip ? 'Đã lưu' : 'Sao chép phiếu'}</span>
                  </button>
                )}

                <button
                  onClick={startGame}
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Chơi lại</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* On-screen Directional Touch Controls for mobile/kiosks */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center gap-2 max-w-[240px] mx-auto shadow-xs">
        <span className="text-[10px] text-slate-400 uppercase font-semibold">Phím điều khiển chạm</span>
        
        <button
          onClick={() => changeDirection({ x: 0, y: -1 })}
          className="w-12 h-12 bg-sky-50 hover:bg-[#003B70] text-[#003B70] hover:text-white rounded-xl flex items-center justify-center font-bold shadow-xs active:scale-90 transition cursor-pointer"
        >
          <ArrowUp className="w-6 h-6" />
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => changeDirection({ x: -1, y: 0 })}
            className="w-12 h-12 bg-sky-50 hover:bg-[#003B70] text-[#003B70] hover:text-white rounded-xl flex items-center justify-center font-bold shadow-xs active:scale-90 transition cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => changeDirection({ x: 0, y: 1 })}
            className="w-12 h-12 bg-sky-50 hover:bg-[#003B70] text-[#003B70] hover:text-white rounded-xl flex items-center justify-center font-bold shadow-xs active:scale-90 transition cursor-pointer"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
          <button
            onClick={() => changeDirection({ x: 1, y: 0 })}
            className="w-12 h-12 bg-sky-50 hover:bg-[#003B70] text-[#003B70] hover:text-white rounded-xl flex items-center justify-center font-bold shadow-xs active:scale-90 transition cursor-pointer"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
