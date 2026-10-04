import React from 'react';
import { CONSULTANTS, WORKING_HOURS, VIETINBANK_LOGO } from '../data/mockData';
import { Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: VietinBank Brand & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl w-fit">
              <img 
                src={VIETINBANK_LOGO} 
                alt="VietinBank" 
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-extrabold text-[#003B70] text-lg">VietinBank</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ngân hàng TMCP Công Thương Việt Nam - Nâng giá trị cuộc sống. Hệ thống tương tác khách hàng thông minh tại quầy giao dịch.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>An toàn • Bảo mật • Tận tâm</span>
            </div>
          </div>

          {/* Col 2: Hotline & Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Đường Dây Nóng
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-400">Tổng đài CSKH VietinBank:</p>
              <a 
                href={`tel:${CONSULTANTS.hotline.replace(/\s+/g, '')}`} 
                className="text-base font-extrabold text-red-500 hover:text-red-400 block"
              >
                {CONSULTANTS.hotline} (24/7)
              </a>
              <p className="text-slate-400 pt-1">Email hỗ trợ:</p>
              <span className="text-white font-mono">contact@vietinbank.vn</span>
            </div>
          </div>

          {/* Col 3: Consultants */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Chuyên Viên Tư Vấn Quầy
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80">
                <strong className="text-white block">{CONSULTANTS.tuyen.name}</strong>
                <span className="text-slate-400 block text-[11px]">{CONSULTANTS.tuyen.role}</span>
                <a 
                  href={`tel:${CONSULTANTS.tuyen.phone.replace(/[^0-9]/g, '')}`} 
                  className="text-amber-400 hover:underline font-bold mt-1 inline-flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" /> {CONSULTANTS.tuyen.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Working hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Giờ Làm Việc
            </h4>
            <div className="text-xs space-y-1.5 text-slate-300">
              <p className="font-semibold text-white">{WORKING_HOURS.weekdays}</p>
              <p className="text-slate-400">{WORKING_HOURS.morning}</p>
              <p className="text-slate-400">{WORKING_HOURS.afternoon}</p>
              <p className="text-red-400 pt-1 font-medium">{WORKING_HOURS.weekend}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Ngân hàng TMCP Công Thương Việt Nam (VietinBank). Bản quyền thuộc về VietinBank.</p>
          <p>Ứng dụng kiosk quầy giao dịch chi nhánh Tây Tiền Giang.</p>
        </div>
      </div>
    </footer>
  );
};
