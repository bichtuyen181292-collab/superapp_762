import React, { useState, useEffect } from 'react';
import { VIETINBANK_LOGO, CONSULTANTS } from '../data/mockData';
import { Phone, Clock, MapPin, Sparkles, UserCheck } from 'lucide-react';
import { FeatureTab } from '../types';

interface HeaderProps {
  activeTab: FeatureTab;
  setActiveTab: (tab: FeatureTab) => void;
  onCallTellerClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ setActiveTab, onCallTellerClick }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + 
        ' - ' + 
        now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-[#003B70] via-[#004e92] to-[#003B70] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-sky-100">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <strong className="text-white">VietinBank CN Tây Tiền Giang</strong> (Hội sở & PGD trực thuộc)
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {currentTime}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${CONSULTANTS.hotline.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded-full font-medium transition shadow-xs text-xs"
            >
              <Phone className="w-3 h-3" />
              Hotline: {CONSULTANTS.hotline}
            </a>
            <button
              onClick={onCallTellerClick}
              className="hidden sm:flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full text-white transition text-xs font-medium cursor-pointer"
            >
              <UserCheck className="w-3 h-3 text-emerald-300" />
              Hỗ trợ tại quầy
            </button>
          </div>
        </div>
      </div>

      {/* Main Headbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo at Left as specified */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('faq')}
            className="flex items-center gap-3 focus:outline-hidden group text-left"
          >
            <div className="relative h-11 md:h-13 w-auto flex items-center bg-white px-2 py-1 rounded-lg border border-sky-100 group-hover:border-sky-300 transition shadow-xs">
              <img 
                src={VIETINBANK_LOGO} 
                alt="VietinBank Logo" 
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback if GitHub image is blocked
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-1 text-[#003B70] font-black text-xl tracking-tight">
                <span>Vietin</span><span className="text-red-600">Bank</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs uppercase tracking-wider font-semibold text-red-600 block">Quầy Giao Dịch Số</span>
              <h1 className="text-base md:text-lg font-bold text-[#003B70] leading-tight">
                Hệ Thống Tương Tác Khách Hàng
              </h1>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('games')}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-medium text-xs md:text-sm shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-spin text-amber-200" style={{ animationDuration: '3s' }} />
            <span>Chơi Game Nhận Quà</span>
            <span className="bg-white text-red-600 font-bold px-1.5 py-0.2 rounded-md text-[10px]">Voucher</span>
          </button>

          <button
            onClick={() => setActiveTab('download')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#003B70] font-medium text-xs md:text-sm border border-sky-200 transition cursor-pointer"
          >
            <span>Tải App iPay</span>
          </button>
        </div>
      </div>
    </header>
  );
};
