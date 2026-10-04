import React, { useState } from 'react';
import { CONSULTANTS } from '../data/mockData';
import { UserCheck, Phone, CheckCircle2, X, AlertCircle } from 'lucide-react';

interface TellerCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TellerCallModal: React.FC<TellerCallModalProps> = ({ isOpen, onClose }) => {
  const [requested, setRequested] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 text-center shadow-2xl space-y-4 animate-scaleUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-sky-100 text-[#003B70] mx-auto flex items-center justify-center">
          <UserCheck className="w-8 h-8 text-[#003B70]" />
        </div>

        <h3 className="text-xl font-bold text-[#003B70]">
          Hỗ Trợ Trực Tiếp Tại Quầy
        </h3>

        {requested ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="font-bold text-sm">
              Đã gửi yêu cầu tới Giao dịch viên!
            </p>
            <p className="text-xs text-emerald-700">
              Giao dịch viên quầy sẽ hỗ trợ Quý khách ngay trong ít phút.
            </p>
          </div>
        ) : (
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Quý khách đang cần giải đáp thêm hoặc cần hướng dẫn trực tiếp? Hãy nhấn nút bên dưới để gửi tín hiệu tới cán bộ quầy.
          </p>
        )}

        {/* Contacts */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-3">
          <span className="font-semibold text-slate-500 uppercase tracking-wider block text-[10px]">
            Chuyên viên tư vấn quầy phụ trách
          </span>

          <div className="flex items-center justify-between">
            <div>
              <strong className="text-slate-800 block">{CONSULTANTS.tuyen.name}</strong>
              <span className="text-slate-500 text-[11px]">{CONSULTANTS.tuyen.branch}</span>
            </div>
            <a
              href={`tel:${CONSULTANTS.tuyen.phone.replace(/[^0-9]/g, '')}`}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
            >
              <Phone className="w-3 h-3" />
              <span>{CONSULTANTS.tuyen.phone}</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div>
              <strong className="text-slate-800 block">{CONSULTANTS.hiep.name}</strong>
              <span className="text-slate-500 text-[11px]">{CONSULTANTS.hiep.branch}</span>
            </div>
            <a
              href={`tel:${CONSULTANTS.hiep.phone.replace(/[^0-9]/g, '')}`}
              className="px-3 py-1.5 rounded-xl bg-[#003B70] hover:bg-sky-900 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
            >
              <Phone className="w-3 h-3" />
              <span>{CONSULTANTS.hiep.phone}</span>
            </a>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {!requested ? (
            <button
              onClick={() => setRequested(true)}
              className="w-full py-3 rounded-xl bg-[#003B70] hover:bg-sky-900 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              Nhấn để gọi Giao dịch viên
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              Đóng cửa sổ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
