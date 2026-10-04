import React, { useState } from 'react';
import { GUIDES, CONSULTANTS } from '../data/mockData';
import { GuideItem, GuideStep } from '../types';
import { 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft, 
  Youtube, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  X, 
  ZoomIn, 
  Smile, 
  HeartHandshake,
  Share2,
  ExternalLink
} from 'lucide-react';

interface FaqGuideProps {
  onBackToMainMenu?: () => void;
}

export const FaqGuide: React.FC<FaqGuideProps> = ({ onBackToMainMenu }) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  
  // Feedback / Satisfaction state
  const [satisfactionState, setSatisfactionState] = useState<'prompt' | 'satisfied' | 'need_help' | null>(null);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  const handleSelectGuide = (guide: GuideItem) => {
    setSelectedGuide(guide);
    setActiveStepIndex(0);
    setSatisfactionState('prompt');
  };

  const handleResetToGuideList = () => {
    setSelectedGuide(null);
    setActiveStepIndex(0);
    setSatisfactionState(null);
    if (onBackToMainMenu) {
      onBackToMainMenu();
    }
  };

  const handleEndConversation = () => {
    setShowExitModal(true);
  };

  return (
    <div className="space-y-6">
      {/* If no guide selected, show prompt and 4 main cards */}
      {!selectedGuide ? (
        <div className="space-y-6">
          {/* Greeting & Header */}
          <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200/80 rounded-2xl p-6 md:p-8 text-center shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003B70]/10 text-[#003B70] text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-4 h-4 text-red-600" />
              <span>Trợ Lý Hướng Dẫn Tương Tác</span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold text-[#003B70] mb-2 tracking-tight">
              Anh/chị đang gặp khó khăn với nội dung nào?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
              Vui lòng chọn chủ đề bên dưới để xem hướng dẫn từng bước kèm hình ảnh minh họa chi tiết và video hướng dẫn thực tế từ VietinBank.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5">
            {GUIDES.map((guide, idx) => (
              <div
                key={guide.id}
                onClick={() => handleSelectGuide(guide)}
                className="group relative bg-white border border-slate-200 hover:border-sky-500 rounded-2xl p-5 md:p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-sky-100 text-[#003B70] font-black text-sm flex items-center justify-center group-hover:bg-[#003B70] group-hover:text-white transition">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-[#003B70] text-base md:text-lg group-hover:text-sky-700 transition">
                      {guide.title.replace(/^\d+\.\s*/, '')}
                    </span>
                  </div>
                  {guide.badge && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 shrink-0">
                      {guide.badge}
                    </span>
                  )}
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {guide.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 mt-auto">
                  <span className="flex items-center gap-1 font-medium text-sky-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {guide.steps.length} bước thực hiện
                  </span>
                  <span className="flex items-center gap-1 text-[#003B70] font-semibold group-hover:translate-x-1 transition">
                    Bắt đầu xem
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Support Card */}
          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-lg">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-[#003B70] text-sm md:text-base">
                  Cần hỗ trợ trực tiếp từ Chuyên viên quầy?
                </h4>
                <p className="text-xs text-slate-600">
                  {CONSULTANTS.tuyen.name} ({CONSULTANTS.tuyen.branch}) - SĐT: {CONSULTANTS.tuyen.displayPhone}
                </p>
              </div>
            </div>
            <a
              href={`tel:${CONSULTANTS.tuyen.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#003B70] hover:bg-[#002d56] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-xs"
            >
              <Phone className="w-4 h-4" />
              Gọi {CONSULTANTS.tuyen.phone}
            </a>
          </div>
        </div>
      ) : (
        /* Detailed Step-by-Step Guide View */
        <div className="space-y-6">
          {/* Header Bar of Guide */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedGuide(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-medium transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Danh sách câu hỏi</span>
              </button>
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-[#003B70]">
                  {selectedGuide.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-500">
                  {selectedGuide.summary}
                </p>
              </div>
            </div>

            {selectedGuide.videoUrl && (
              <a
                href={selectedGuide.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition shadow-xs cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
                <span>Xem Video Hướng Dẫn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            )}
          </div>

          {/* Stepper Tabs Bar */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center overflow-x-auto no-scrollbar gap-1.5">
            {selectedGuide.steps.map((step, index) => {
              const isCurrent = activeStepIndex === index;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(index)}
                  className={`px-3 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                    isCurrent
                      ? 'bg-[#003B70] text-white shadow-xs'
                      : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[#003B70]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                    isCurrent ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {step.step}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Presentation */}
          {selectedGuide.steps[activeStepIndex] && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Text instruction & Controls */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                    <span>Bước {selectedGuide.steps[activeStepIndex].step} / {selectedGuide.steps.length}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-[#003B70]">
                    {selectedGuide.steps[activeStepIndex].title}
                  </h3>

                  <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-4 text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                    {selectedGuide.steps[activeStepIndex].description}
                  </div>

                  {/* Step Navigation Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeStepIndex === 0}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs md:text-sm disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Bước trước</span>
                    </button>

                    <span className="text-xs font-medium text-slate-500">
                      {activeStepIndex + 1} của {selectedGuide.steps.length}
                    </span>

                    <button
                      onClick={() => setActiveStepIndex((prev) => Math.min(selectedGuide.steps.length - 1, prev + 1))}
                      disabled={activeStepIndex === selectedGuide.steps.length - 1}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003B70] hover:bg-sky-900 text-white font-semibold text-xs md:text-sm disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <span>Bước tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* YouTube Shortcut if Available */}
                  {selectedGuide.videoUrl && (
                    <div className="p-3.5 bg-red-50/60 border border-red-200 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
                          <Youtube className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-red-900">
                          Xem video hướng dẫn chi tiết trên YouTube
                        </span>
                      </div>
                      <a
                        href={selectedGuide.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:underline shrink-0"
                      >
                        Mở video <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right: Illustration Image with Zoom preview */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs relative group">
                    {selectedGuide.steps[activeStepIndex].image ? (
                      <div className="relative">
                        <img
                          src={selectedGuide.steps[activeStepIndex].image}
                          alt={selectedGuide.steps[activeStepIndex].title}
                          className="w-full h-auto max-h-[460px] object-contain mx-auto bg-slate-900/5 transition duration-200 group-hover:scale-[1.02]"
                          onError={(e) => {
                            // If remote image fails, show clean fallback illustration
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="hidden h-64 w-full flex-col items-center justify-center text-slate-400 p-6 text-center">
                          <HelpCircle className="w-12 h-12 mb-2 text-sky-400" />
                          <p className="text-sm font-medium text-slate-600">{selectedGuide.steps[activeStepIndex].title}</p>
                          <p className="text-xs text-slate-400 mt-1">Hình ảnh minh họa</p>
                        </div>
                        <button
                          onClick={() => setZoomImage(selectedGuide.steps[activeStepIndex].image || null)}
                          className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white p-2 rounded-xl text-xs flex items-center gap-1 shadow-md transition cursor-pointer backdrop-blur-xs"
                          title="Phóng to ảnh"
                        >
                          <ZoomIn className="w-4 h-4" />
                          <span className="hidden sm:inline">Phóng to</span>
                        </button>
                      </div>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-slate-400">
                        <span>Chưa có ảnh minh họa</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2 text-center">
                    Hình ảnh minh họa thực tế giao diện ứng dụng VietinBank iPay
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Satisfaction Check Section (As explicitly requested in PDF) */}
          <div className="bg-gradient-to-br from-slate-50 to-sky-50/60 border border-sky-200 rounded-2xl p-5 md:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-[#003B70] flex items-center justify-center shrink-0">
                  <Smile className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#003B70] text-base md:text-lg">
                    Quý khách thực hiện hướng dẫn ổn hay chưa?
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600">
                    Phản hồi của Quý khách giúp VietinBank hoàn thiện và nâng cao chất lượng phục vụ
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-end">
                <button
                  onClick={() => setSatisfactionState('satisfied')}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition flex items-center gap-1.5 cursor-pointer ${
                    satisfactionState === 'satisfied'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã thực hiện ổn</span>
                </button>

                <button
                  onClick={() => setSatisfactionState('need_help')}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition flex items-center gap-1.5 cursor-pointer ${
                    satisfactionState === 'need_help'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-amber-300 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Chưa ổn, cần trợ giúp</span>
                </button>
              </div>
            </div>

            {/* Satisfaction Responses */}
            {satisfactionState === 'satisfied' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-medium">
                    Tuyệt vời! VietinBank rất vui vì đã hỗ trợ Quý khách thành công.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetToGuideList}
                    className="px-3.5 py-1.5 bg-[#003B70] text-white hover:bg-sky-900 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Quay lại menu chính
                  </button>
                  <button
                    onClick={handleEndConversation}
                    className="px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Kết thúc cuộc trò chuyện
                  </button>
                </div>
              </div>
            )}

            {satisfactionState === 'need_help' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4.5 text-slate-800 space-y-3 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs md:text-sm leading-relaxed">
                    <p className="font-semibold text-amber-900 mb-1">
                      “Cảm ơn Quý khách đã phản hồi. Quý khách có thể liên hệ Chuyên viên tư vấn <strong className="text-red-700">{CONSULTANTS.tuyen.name}</strong> – số điện thoại: <strong className="text-red-700">{CONSULTANTS.tuyen.phone}</strong> để hỗ trợ trực tiếp. Em sẽ cố gắng cải thiện để phục vụ Quý khách tốt hơn!”
                    </p>
                    <p className="text-slate-600 text-xs">
                      Chi nhánh: {CONSULTANTS.tuyen.branch} - Quầy giao dịch trực tiếp.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`tel:${CONSULTANTS.tuyen.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Gọi ngay {CONSULTANTS.tuyen.phone}
                  </a>
                  <button
                    onClick={handleResetToGuideList}
                    className="px-3.5 py-2 bg-[#003B70] text-white hover:bg-sky-900 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Quay lại menu chính
                  </button>
                  <button
                    onClick={handleEndConversation}
                    className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Kết thúc cuộc trò chuyện
                  </button>
                </div>
              </div>
            )}

            {/* Default Navigation row */}
            {!satisfactionState && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <button
                  onClick={handleResetToGuideList}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-[#003B70] rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer"
                >
                  Quay lại menu chính
                </button>
                <button
                  onClick={handleEndConversation}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer"
                >
                  Kết thúc cuộc trò chuyện
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setZoomImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={zoomImage} 
              alt="Ảnh phóng to" 
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* End Conversation Modal (As explicitly required in PDF) */}
      {showExitModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowExitModal(false)}
        >
          <div 
            className="max-w-md w-full bg-white rounded-2xl p-6 text-center shadow-2xl space-y-4 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <HeartHandshake className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#003B70]">
              Cảm ơn Quý khách!
            </h3>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              “Cảm ơn Quý khách đã sử dụng dịch vụ của VietinBank. Chúc Quý khách một ngày tốt lành!”
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowExitModal(false);
                  handleResetToGuideList();
                }}
                className="w-full py-2.5 rounded-xl bg-[#003B70] hover:bg-sky-900 text-white font-semibold text-sm transition cursor-pointer"
              >
                Quay về trang chủ
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-700 text-xs font-medium"
              >
                Đóng thông báo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
