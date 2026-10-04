import React, { useState } from 'react';
import { BRANCH_OFFICES, WORKING_HOURS, CONSULTANTS } from '../data/mockData';
import { BranchOffice } from '../types';
import { 
  MapPin, 
  Phone, 
  ExternalLink, 
  Clock, 
  Building2, 
  Navigation2, 
  ShieldCheck, 
  ZoomIn,
  X,
  Search
} from 'lucide-react';

export const BranchLocations: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchOffice>(BRANCH_OFFICES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredBranches = BRANCH_OFFICES.filter((b) => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003B70]/10 text-[#003B70] text-xs font-semibold mb-2">
          <MapPin className="w-4 h-4 text-red-600" />
          <span>Mạng Lưới Hoạt Động</span>
        </div>
        <h2 className="text-xl md:text-3xl font-extrabold text-[#003B70] tracking-tight">
          Hệ Thống Chi Nhánh & Điểm Giao Dịch
        </h2>
        <p className="text-slate-600 text-xs md:text-sm mt-1">
          Tra cứu nhanh địa chỉ, hình ảnh thực tế, chỉ đường Google Maps và gọi hotline trực tiếp tới các phòng giao dịch VietinBank CN Tây Tiền Giang.
        </p>
      </div>

      {/* Working Hours Card (From PDF) */}
      <div className="bg-[#003B70] text-white rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-200 uppercase tracking-wider block">
                Khung Giờ Phục Vụ Tại Quầy
              </span>
              <h3 className="text-base md:text-lg font-bold">
                Thời Gian Giao Dịch Chuẩn Toàn Hệ Thống
              </h3>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-xs space-y-1 w-full sm:w-auto">
            <div className="font-semibold text-amber-300">
              📅 {WORKING_HOURS.weekdays}:
            </div>
            <div className="text-sky-100 flex flex-wrap gap-x-4">
              <span>• {WORKING_HOURS.morning}</span>
              <span>• {WORKING_HOURS.afternoon}</span>
            </div>
            <div className="text-red-300 font-medium pt-0.5">
              • {WORKING_HOURS.weekend}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Branch List & Selected Branch Map / Photo Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Branch selector list with search */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm chi nhánh, xã, huyện..."
              className="w-full px-4 py-3 pl-10 rounded-2xl border border-slate-300 focus:border-[#003B70] bg-white text-xs md:text-sm focus:outline-hidden shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredBranches.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 border-[#003B70] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-bold text-[#003B70] text-sm md:text-base">
                      {branch.id}. {branch.name}
                    </h4>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#003B70] text-white shrink-0">
                        Đang chọn
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {branch.address}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    {/* Hotline clickable as required */}
                    <a
                      href={`tel:${branch.phone.replace(/[^0-9]/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-semibold text-red-600 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{branch.phone}</span>
                    </a>

                    {/* Google Maps link clickable as required */}
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-[#003B70]"
                    >
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>Bản đồ</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed selected branch view */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                {selectedBranch.branchName}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#003B70]">
                {selectedBranch.name}
              </h3>
            </div>

            {/* Google maps link button */}
            <a
              href={selectedBranch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm shadow-xs transition cursor-pointer shrink-0"
            >
              <Navigation2 className="w-4 h-4 fill-white" />
              <span>Chỉ đường Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Photo & Zoom */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs group bg-slate-100">
            <img
              src={selectedBranch.imageUrl}
              alt={selectedBranch.name}
              className="w-full h-64 md:h-80 object-cover object-center group-hover:scale-102 transition duration-300"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden h-64 w-full flex-col items-center justify-center p-6 text-center text-slate-400">
              <Building2 className="w-12 h-12 text-[#003B70] mb-2" />
              <span className="font-bold text-slate-700">{selectedBranch.name}</span>
            </div>

            <button
              onClick={() => setPreviewImage(selectedBranch.imageUrl)}
              className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white p-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer backdrop-blur-xs"
              title="Phóng to ảnh chi nhánh"
            >
              <ZoomIn className="w-4 h-4" />
              <span>Xem ảnh lớn</span>
            </button>
          </div>

          {/* Address & Direct Actions */}
          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase block">Địa chỉ giao dịch</span>
                <p className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                  {selectedBranch.address}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={`tel:${selectedBranch.phone.replace(/[^0-9]/g, '')}`}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Hotline: {selectedBranch.phone}</span>
              </a>

              <a
                href={selectedBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border border-sky-300 bg-white hover:bg-sky-50 text-[#003B70] font-semibold text-sm transition"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Mở trong Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={previewImage} 
              alt="Ảnh chi nhánh phóng to" 
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
