import React, { useState, useMemo } from 'react';
import { APP_DOWNLOAD_LINKS } from '../data/mockData';
import { 
  PiggyBank, 
  Coins, 
  TrendingUp, 
  AlertCircle, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

interface TermOption {
  value: number; // months
  label: string;
  defaultRate: number; // typical annual rate %
}

const TERM_OPTIONS: TermOption[] = [
  { value: 1, label: '1 Tháng', defaultRate: 2.0 },
  { value: 2, label: '2 Tháng', defaultRate: 2.0 },
  { value: 3, label: '3 Tháng', defaultRate: 2.3 },
  { value: 6, label: '6 Tháng', defaultRate: 3.3 },
  { value: 9, label: '9 Tháng', defaultRate: 3.3 },
  { value: 12, label: '12 Tháng', defaultRate: 4.8 },
  { value: 18, label: '18 Tháng', defaultRate: 4.8 },
  { value: 24, label: '24 Tháng', defaultRate: 4.9 },
  { value: 36, label: '36 Tháng', defaultRate: 5.0 },
];

export const SavingsCalculator: React.FC = () => {
  // Raw inputs
  const [depositAmountStr, setDepositAmountStr] = useState<string>('100,000,000');
  const [selectedTermMonths, setSelectedTermMonths] = useState<number | ''>(12);
  const [interestRateStr, setInterestRateStr] = useState<string>('4.8');
  
  // Touched states for validation
  const [touchedAmount, setTouchedAmount] = useState<boolean>(false);
  const [touchedTerm, setTouchedTerm] = useState<boolean>(false);
  const [touchedRate, setTouchedRate] = useState<boolean>(false);

  // Parse numeric amount
  const depositAmount = useMemo(() => {
    const clean = depositAmountStr.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10) : 0;
  }, [depositAmountStr]);

  // Parse rate
  const interestRate = useMemo(() => {
    const val = parseFloat(interestRateStr);
    return isNaN(val) ? 0 : val;
  }, [interestRateStr]);

  // Format number to VND with comma/period
  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(val));
  };

  // Validation errors matching prompt guidelines
  const amountError = useMemo(() => {
    if (!touchedAmount) return null;
    if (!depositAmountStr || depositAmount <= 0) {
      return 'Vui lòng nhập số tiền gửi hợp lệ.';
    }
    if (depositAmount < 1000000) {
      return 'Số tiền gửi tối thiểu tại quầy là 1.000.000 VND.';
    }
    return null;
  }, [depositAmount, depositAmountStr, touchedAmount]);

  const termError = useMemo(() => {
    if (!touchedTerm) return null;
    if (selectedTermMonths === '' || selectedTermMonths <= 0) {
      return 'Vui lòng chọn kỳ hạn gửi.';
    }
    return null;
  }, [selectedTermMonths, touchedTerm]);

  const rateError = useMemo(() => {
    if (!touchedRate) return null;
    if (interestRateStr === '' || isNaN(interestRate) || interestRate < 0) {
      return 'Vui lòng nhập lãi suất hợp lệ.';
    }
    if (interestRate > 15) {
      return 'Lãi suất không được vượt quá mức trần cấu hình (15%/năm).';
    }
    return null;
  }, [interestRate, interestRateStr, touchedRate]);

  // Calculation (Tiền gửi thông thường trả lãi sau)
  // Lãi = Tiền gửi * (Lãi suất năm / 100) * (Số tháng / 12)
  const estimatedInterest = useMemo(() => {
    if (depositAmount <= 0 || !selectedTermMonths || interestRate <= 0) return 0;
    return (depositAmount * (interestRate / 100) * selectedTermMonths) / 12;
  }, [depositAmount, selectedTermMonths, interestRate]);

  const totalPayout = useMemo(() => {
    return depositAmount + estimatedInterest;
  }, [depositAmount, estimatedInterest]);

  // Handle amount change with number formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (!raw) {
      setDepositAmountStr('');
      return;
    }
    const num = parseInt(raw, 10);
    setDepositAmountStr(new Intl.NumberFormat('vi-VN').format(num));
  };

  // Quick preset amounts
  const setQuickAmount = (amount: number) => {
    setTouchedAmount(true);
    setDepositAmountStr(new Intl.NumberFormat('vi-VN').format(amount));
  };

  // Handle term select
  const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTouchedTerm(true);
    const months = parseInt(e.target.value, 10);
    if (isNaN(months)) {
      setSelectedTermMonths('');
    } else {
      setSelectedTermMonths(months);
      // Auto populate typical rate
      const opt = TERM_OPTIONS.find((t) => t.value === months);
      if (opt) {
        setInterestRateStr(opt.defaultRate.toString());
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003B70]/10 text-[#003B70] text-xs font-semibold mb-2">
          <PiggyBank className="w-4 h-4 text-emerald-600" />
          <span>Công Cụ Tài Chính VietinBank</span>
        </div>
        <h2 className="text-xl md:text-3xl font-extrabold text-[#003B70] tracking-tight">
          Công cụ tính lãi suất tiền gửi sản phẩm tiền gửi thông thường trả lãi sau
        </h2>
        <p className="text-slate-600 text-xs md:text-sm mt-1">
          Hỗ trợ khách hàng tính toán chính xác tiền lãi nhận được và tổng số tiền khi đáo hạn tại quầy giao dịch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
          <h3 className="text-base md:text-lg font-bold text-[#003B70] border-b border-slate-100 pb-3 flex items-center gap-2">
            <span>Thông tin khoản tiền gửi</span>
          </h3>

          {/* 1. Số tiền gửi */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs md:text-sm font-semibold text-slate-700">
                Tổng tiền gửi (VND) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Tối thiểu: 1.000.000 VND</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={depositAmountStr}
                onChange={handleAmountChange}
                onBlur={() => setTouchedAmount(true)}
                placeholder="Nhập số tiền gửi..."
                className={`w-full px-4 py-3 rounded-xl border text-base md:text-lg font-bold text-[#003B70] bg-slate-50 focus:bg-white focus:outline-hidden transition ${
                  amountError ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-[#003B70]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>

            {amountError && (
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {amountError}
              </p>
            )}

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[50000000, 100000000, 200000000, 500000000, 1000000000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setQuickAmount(val)}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#003B70] text-xs font-medium border border-sky-100 transition cursor-pointer"
                >
                  {val >= 1000000000 ? `${val / 1000000000} Tỷ` : `${val / 1000000} Tr`}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Kỳ hạn gửi */}
          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-semibold text-slate-700 block">
              Kỳ hạn gửi (Tháng) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedTermMonths}
                onChange={handleTermChange}
                onBlur={() => setTouchedTerm(true)}
                className={`w-full px-4 py-3 rounded-xl border text-sm md:text-base font-semibold text-[#003B70] bg-slate-50 focus:bg-white focus:outline-hidden transition appearance-none cursor-pointer ${
                  termError ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-[#003B70]'
                }`}
              >
                <option value="">-- Chọn kỳ hạn gửi --</option>
                {TERM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} (Lãi suất tham khảo: {opt.defaultRate}%/năm)
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                ▼
              </div>
            </div>

            {termError && (
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {termError}
              </p>
            )}
          </div>

          {/* 3. Lãi suất */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs md:text-sm font-semibold text-slate-700">
                Lãi suất (%/năm) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Có thể điều chỉnh theo thỏa thuận quầy</span>
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.05"
                min="0"
                max="15"
                value={interestRateStr}
                onChange={(e) => setInterestRateStr(e.target.value)}
                onBlur={() => setTouchedRate(true)}
                placeholder="0"
                className={`w-full px-4 py-3 rounded-xl border text-sm md:text-base font-bold text-[#003B70] bg-slate-50 focus:bg-white focus:outline-hidden transition ${
                  rateError ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-[#003B70]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                %/năm
              </span>
            </div>

            {rateError && (
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {rateError}
              </p>
            )}
          </div>

          {/* Video link banner from PDF */}
          <div className="pt-2">
            <a
              href={APP_DOWNLOAD_LINKS.tiktokSavingsGuide}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-rose-200 text-rose-900 hover:from-red-100 hover:to-rose-100 transition group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-rose-950">
                    Video Hướng Dẫn Gửi Tiết Kiệm iPay
                  </span>
                  <span className="text-[11px] text-rose-700">
                    Xem clip hướng dẫn chi tiết trên kênh VietinBank TikTok
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-rose-600 group-hover:translate-x-0.5 transition" />
            </a>
          </div>
        </div>

        {/* Right Column: Output Results */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-[#003B70] to-[#00274d] rounded-3xl p-6 text-white shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-sky-200">
                Kết Quả Dự Tính
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Trả Lãi Cuối Kỳ
              </span>
            </div>

            {/* Interest Profit */}
            <div className="space-y-1">
              <span className="text-xs text-sky-200">Tiền lãi dự tính:</span>
              <div className="text-2xl md:text-3xl font-black text-amber-300 tracking-tight">
                {formatVND(estimatedInterest)} <span className="text-sm font-semibold text-white">VND</span>
              </div>
            </div>

            {/* Total Balance */}
            <div className="space-y-1 pt-3 border-t border-white/10">
              <span className="text-xs text-sky-200">Tổng tiền nhận được khi đáo hạn:</span>
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {formatVND(totalPayout)} <span className="text-base font-semibold text-sky-200">VND</span>
              </div>
              <span className="text-[11px] text-sky-300 block">
                (Bao gồm tiền gốc: {formatVND(depositAmount)} VND + Tiền lãi)
              </span>
            </div>

            {/* Parameter summary */}
            <div className="bg-white/10 rounded-2xl p-4 space-y-2 text-xs text-sky-100">
              <div className="flex justify-between">
                <span>Kỳ hạn áp dụng:</span>
                <strong className="text-white">{selectedTermMonths || 0} tháng</strong>
              </div>
              <div className="flex justify-between">
                <span>Mức lãi suất:</span>
                <strong className="text-amber-300">{interestRate}% / năm</strong>
              </div>
              <div className="flex justify-between">
                <span>Hình thức nhận lãi:</span>
                <strong className="text-white">Lãi nhập gốc hoặc chuyển tài khoản</strong>
              </div>
            </div>

            <div className="text-[11px] text-sky-300/80 leading-relaxed italic">
              * Lưu ý: Kết quả trên mang tính chất tham khảo. Lãi suất thực tế có thể thay đổi tùy theo chính sách ưu đãi của VietinBank tại thời điểm gửi tiền.
            </div>
          </div>

          {/* Counter Advisor Callout */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="text-slate-800 block">Ưu đãi cộng thêm lãi suất</strong>
              <span className="text-slate-500">
                Gửi tiết kiệm trực tuyến qua VietinBank iPay được cộng thêm tới 0.3%/năm so với quầy.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
