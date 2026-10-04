import React, { useState } from 'react';
import { FlappyBirdGame } from './FlappyBirdGame';
import { SnakeGame } from './SnakeGame';
import { 
  Gamepad2, 
  Sparkles, 
  Fuel, 
  Trophy, 
  HelpCircle, 
  ShieldCheck, 
  Gift
} from 'lucide-react';

interface GamesHubProps {
  onBackToHome?: () => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ onBackToHome }) => {
  const [selectedGame, setSelectedGame] = useState<'flappy' | 'snake'>('flappy');

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-red-600 via-[#003B70] to-[#00264d] rounded-3xl p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-amber-300">
            <Gift className="w-3.5 h-3.5" />
            <span>Mini Game Tri Ân Khách Hàng Tại Quầy</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Chờ vui – Chơi hay – Nhận quà liền tay
          </h2>

          <p className="text-sky-100 text-xs md:text-sm max-w-xl leading-relaxed">
            Thư giãn giải trí trong lúc chờ giao dịch hoặc sau khi hoàn tất thủ tục. Vượt qua các thử thách đơn giản để nhận ngay <strong>Voucher xăng 2 lít</strong> gửi tặng trực tiếp từ VietinBank!
          </p>
        </div>

        {/* Reward Highlight Badge */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 shrink-0 shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black">
            <Fuel className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] text-amber-200 uppercase font-bold block">Quà tặng đặc biệt</span>
            <strong className="text-base md:text-lg text-white font-extrabold block">Voucher 2 Lít Xăng</strong>
            <span className="text-[10px] text-sky-200">Đưa mã trúng thưởng cho GDV</span>
          </div>
        </div>
      </div>

      {/* Game Selector Switch */}
      <div className="flex justify-center">
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setSelectedGame('flappy')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
              selectedGame === 'flappy'
                ? 'bg-[#003B70] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#003B70] hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Game 1: Flappy Bird (20 Điểm)</span>
          </button>

          <button
            onClick={() => setSelectedGame('snake')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
              selectedGame === 'snake'
                ? 'bg-[#003B70] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#003B70] hover:bg-white/50'
            }`}
          >
            <Trophy className="w-4 h-4 text-red-400" />
            <span>Game 2: Rắn Săn Mồi (20-40 Điểm)</span>
          </button>
        </div>
      </div>

      {/* Render Selected Game */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 shadow-xs">
        {selectedGame === 'flappy' ? (
          <FlappyBirdGame onBackToHome={onBackToHome} />
        ) : (
          <SnakeGame onBackToHome={onBackToHome} />
        )}
      </div>

      {/* Notice & Disclaimer */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
        <p className="font-semibold text-[#003B70] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Quy định nhận quà tại quầy VietinBank:
        </p>
        <p>• Trò chơi mang tính chất tri ân, giải trí lành mạnh, không thu phí, không yêu cầu cung cấp thông tin tài khoản hay mật khẩu ngân hàng.</p>
        <p>• Quý khách chụp màn hình mã quà tặng hoặc giữ nguyên màn hình và gửi cho giao dịch viên quầy để đối soát nhận quà.</p>
      </div>
    </div>
  );
};
