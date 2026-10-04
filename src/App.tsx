import React, { useState } from 'react';
import { FeatureTab } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FaqGuide } from './components/FaqGuide';
import { DownloadApp } from './components/DownloadApp';
import { GamesHub } from './components/GamesHub';
import { SavingsCalculator } from './components/SavingsCalculator';
import { LoanRepaymentCalculator } from './components/LoanRepaymentCalculator';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BranchLocations } from './components/BranchLocations';
import { Footer } from './components/Footer';
import { TellerCallModal } from './components/TellerCallModal';
import { 
  HelpCircle, 
  Smartphone, 
  Gamepad2, 
  PiggyBank, 
  Calculator, 
  Star, 
  MapPin, 
  Fuel,
  ArrowRight,
  ShieldCheck,
  Headphones
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<FeatureTab>('faq');
  const [isTellerModalOpen, setIsTellerModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-slate-50 to-sky-50/30 text-slate-800 flex flex-col font-sans">
      {/* 1. Official Header with VietinBank logo & info */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onCallTellerClick={() => setIsTellerModalOpen(true)}
      />

      {/* 2. Primary Navigation Bar */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Quick Kiosk Service Quick-Jumps (when on FAQ or Home) */}
        {activeTab === 'faq' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => setActiveTab('download')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xs transition text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#003B70] flex items-center justify-center mb-2 group-hover:bg-[#003B70] group-hover:text-white transition">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Tải App iPay</span>
                <span className="text-[10px] text-slate-500">Quét mã QR iOS/Android</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-400 hover:shadow-xs transition text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                <Fuel className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-950 block">Chơi Game Nhận Quà</span>
                <span className="text-[10px] text-amber-700">Tặng Voucher 2L xăng</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('savings')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xs transition text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 group-hover:bg-emerald-600 group-hover:text-white transition">
                <PiggyBank className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Tính Lãi Tiết Kiệm</span>
                <span className="text-[10px] text-slate-500">Bảng lãi nhận cuối kỳ</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('loan')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xs transition text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Lịch Trả Nợ Vay</span>
                <span className="text-[10px] text-slate-500">Dư nợ giảm dần</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xs transition text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Sản Phẩm Nổi Bật</span>
                <span className="text-[10px] text-slate-500">Ưu đãi, Shop Plus, Đấu giá</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('branches')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xs transition text-left group cursor-pointer flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-2 group-hover:bg-slate-800 group-hover:text-white transition">
                <MapPin className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Điểm Giao Dịch</span>
                <span className="text-[10px] text-slate-500">Bản đồ 6 PGD Tây Tiền Giang</span>
              </div>
            </button>
          </div>
        )}

        {/* Tab 1: Giải đáp thắc mắc */}
        {activeTab === 'faq' && <FaqGuide onBackToMainMenu={() => setActiveTab('faq')} />}

        {/* Tab 2: Tải App VietinBank iPay */}
        {activeTab === 'download' && <DownloadApp />}

        {/* Tab 3: Thử thách Game */}
        {activeTab === 'games' && <GamesHub onBackToHome={() => setActiveTab('faq')} />}

        {/* Tab 4: Tính lãi tiền gửi */}
        {activeTab === 'savings' && <SavingsCalculator />}

        {/* Tab 5: Lịch trả nợ khoản vay */}
        {activeTab === 'loan' && <LoanRepaymentCalculator />}

        {/* Tab 6: Sản phẩm dịch vụ nổi bật */}
        {activeTab === 'products' && <FeaturedProducts />}

        {/* Tab 7: Điểm giao dịch */}
        {activeTab === 'branches' && <BranchLocations />}
      </main>

      {/* Floating Kiosk Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsTellerModalOpen(true)}
          className="flex items-center gap-2 bg-[#003B70] hover:bg-[#002b52] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition transform active:scale-95 cursor-pointer border border-sky-300"
          title="Yêu cầu hỗ trợ tại quầy"
        >
          <Headphones className="w-5 h-5 text-amber-300" />
          <span className="hidden sm:inline font-bold text-xs md:text-sm">Hỗ trợ tại quầy</span>
        </button>
      </div>

      {/* Teller Modal */}
      <TellerCallModal 
        isOpen={isTellerModalOpen} 
        onClose={() => setIsTellerModalOpen(false)} 
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
