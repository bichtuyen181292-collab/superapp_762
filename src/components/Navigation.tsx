import React from 'react';
import { FeatureTab } from '../types';
import { 
  HelpCircle, 
  Smartphone, 
  Gamepad2, 
  PiggyBank, 
  Calculator, 
  Star, 
  MapPin
} from 'lucide-react';

interface NavigationProps {
  activeTab: FeatureTab;
  setActiveTab: (tab: FeatureTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'faq' as FeatureTab,
      label: 'Giải đáp thắc mắc',
      shortLabel: 'Giải đáp',
      icon: HelpCircle,
      badge: '4+ mục',
    },
    {
      id: 'download' as FeatureTab,
      label: 'Tải VietinBank iPay',
      shortLabel: 'Tải App',
      icon: Smartphone,
      badge: 'QR Code',
    },
    {
      id: 'games' as FeatureTab,
      label: 'Thử thách Game',
      shortLabel: 'Mini Game',
      icon: Gamepad2,
      badge: 'Tặng Voucher',
      highlight: true,
    },
    {
      id: 'savings' as FeatureTab,
      label: 'Tính lãi tiền gửi',
      shortLabel: 'Tiền gửi',
      icon: PiggyBank,
    },
    {
      id: 'loan' as FeatureTab,
      label: 'Lịch trả nợ khoản vay',
      shortLabel: 'Khoản vay',
      icon: Calculator,
      badge: 'Dư nợ giảm dần',
    },
    {
      id: 'products' as FeatureTab,
      label: 'Sản phẩm nổi bật',
      shortLabel: 'Nổi bật',
      icon: Star,
      badge: 'Hot',
    },
    {
      id: 'branches' as FeatureTab,
      label: 'Điểm giao dịch',
      shortLabel: 'Chi nhánh',
      icon: MapPin,
      badge: '6 Điểm',
    },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[89px] md:top-[97px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar py-2 gap-1 md:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-xs md:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? 'bg-[#003B70] text-white shadow-md shadow-sky-900/20 font-semibold'
                    : 'text-slate-600 hover:text-[#003B70] hover:bg-sky-50/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : tab.highlight ? 'text-amber-500' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : tab.highlight
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-red-500 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
