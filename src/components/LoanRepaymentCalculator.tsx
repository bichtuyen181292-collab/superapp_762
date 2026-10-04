import React, { useState, useMemo } from 'react';
import { LoanScheduleRow } from '../types';
import { 
  Calculator, 
  Calendar, 
  Coins, 
  Table, 
  X, 
  FileText, 
  Printer, 
  Info,
  TrendingDown,
  Building,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

type RepaymentCycle = 'monthly' | 'quarterly' | 'six_months' | 'yearly';

export const LoanRepaymentCalculator: React.FC = () => {
  // Input fields
  const [propertyValueStr, setPropertyValueStr] = useState<string>('2,000,000,000');
  const [loanAmountStr, setLoanAmountStr] = useState<string>('1,000,000,000'); // Input format, NOT SLIDER as required!
  const [loanTermMonths, setLoanTermMonths] = useState<number>(120); // 10 years
  const [annualRateStr, setAnnualRateStr] = useState<string>('8.5');
  const [disbursementDate, setDisbursementDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [cycle, setCycle] = useState<RepaymentCycle>('monthly');
  const [paymentDayOfMonth, setPaymentDayOfMonth] = useState<number>(25); // e.g. day 25
  const [roundingMode, setRoundingMode] = useState<'exact' | '1000'>('1000'); // rounding to 1,000 VND

  // Modal display for detailed schedule table
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Parse numbers
  const loanAmount = useMemo(() => {
    const clean = loanAmountStr.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10) : 0;
  }, [loanAmountStr]);

  const propertyValue = useMemo(() => {
    const clean = propertyValueStr.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10) : 0;
  }, [propertyValueStr]);

  const annualRate = useMemo(() => {
    const val = parseFloat(annualRateStr);
    return isNaN(val) ? 0 : val;
  }, [annualRateStr]);

  // Format helper
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(num));
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (!raw) {
      setLoanAmountStr('');
      return;
    }
    const val = parseInt(raw, 10);
    setLoanAmountStr(new Intl.NumberFormat('vi-VN').format(val));
  };

  const handlePropertyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (!raw) {
      setPropertyValueStr('');
      return;
    }
    const val = parseInt(raw, 10);
    setPropertyValueStr(new Intl.NumberFormat('vi-VN').format(val));
  };

  // 2. Business Rules & Cycle Rate Calculation
  // Chu kỳ trả nợ: Hằng tháng (Lãi suất/12), Hằng quý (Lãi suất/4), 6 tháng (Lãi suất/2), Hằng năm (Lãi suất)
  const cycleInfo = useMemo(() => {
    let monthsPerPeriod = 1;
    let rateDivisor = 12;
    let label = 'Hằng tháng';

    switch (cycle) {
      case 'quarterly':
        monthsPerPeriod = 3;
        rateDivisor = 4;
        label = 'Hằng quý';
        break;
      case 'six_months':
        monthsPerPeriod = 6;
        rateDivisor = 2;
        label = '6 Tháng';
        break;
      case 'yearly':
        monthsPerPeriod = 12;
        rateDivisor = 1;
        label = 'Hằng năm';
        break;
      case 'monthly':
      default:
        monthsPerPeriod = 1;
        rateDivisor = 12;
        label = 'Hằng tháng';
        break;
    }

    const totalPeriods = Math.max(1, Math.floor(loanTermMonths / monthsPerPeriod));
    const periodRate = annualRate / 100 / rateDivisor;

    return {
      monthsPerPeriod,
      rateDivisor,
      label,
      totalPeriods,
      periodRate,
    };
  }, [cycle, loanTermMonths, annualRate]);

  // Helper to construct exact due dates:
  // E.g., Disbursed 10/01/2026, paymentDay 25 -> 25/02/2026, 25/03/2026...
  const calculateSchedule = useMemo((): {
    rows: LoanScheduleRow[];
    totalPrincipal: number;
    totalInterest: number;
    totalPayment: number;
    firstMonthPayment: number;
    lastMonthPayment: number;
  } => {
    if (loanAmount <= 0 || cycleInfo.totalPeriods <= 0) {
      return {
        rows: [],
        totalPrincipal: 0,
        totalInterest: 0,
        totalPayment: 0,
        firstMonthPayment: 0,
        lastMonthPayment: 0,
      };
    }

    const rows: LoanScheduleRow[] = [];
    const disbDateObj = new Date(disbursementDate || new Date());
    
    // Period 0 (Disbursement date)
    const formattedDisbDate = disbDateObj.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    let currentBalance = loanAmount;
    let accumulatedPrincipal = 0;
    let accumulatedInterest = 0;

    // Standard principal per period
    const rawPrincipalPerPeriod = loanAmount / cycleInfo.totalPeriods;
    const standardPrincipal =
      roundingMode === '1000'
        ? Math.round(rawPrincipalPerPeriod / 1000) * 1000
        : Math.round(rawPrincipalPerPeriod);

    for (let p = 1; p <= cycleInfo.totalPeriods; p++) {
      // Calculate date: Start from disbursement month + p * monthsPerPeriod
      const targetDate = new Date(disbDateObj);
      targetDate.setMonth(disbDateObj.getMonth() + p * cycleInfo.monthsPerPeriod);
      // Clamp day to available days in month
      const maxDaysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
      targetDate.setDate(Math.min(paymentDayOfMonth, maxDaysInMonth));

      const formattedDueDate = targetDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const beginningBalance = currentBalance;

      // Period Interest = Beginning Balance * Period Rate
      let rawInterest = beginningBalance * cycleInfo.periodRate;
      let periodInterest =
        roundingMode === '1000' ? Math.round(rawInterest / 1000) * 1000 : Math.round(rawInterest);

      // Period Principal (Adjust on last period to avoid rounding drift)
      let periodPrincipal = standardPrincipal;
      if (p === cycleInfo.totalPeriods) {
        periodPrincipal = beginningBalance; // exact payoff
      } else {
        periodPrincipal = Math.min(periodPrincipal, beginningBalance);
      }

      const totalPeriodPayment = periodPrincipal + periodInterest;
      const endingBalance = Math.max(0, beginningBalance - periodPrincipal);

      rows.push({
        period: p,
        dueDate: formattedDueDate,
        beginningBalance,
        principal: periodPrincipal,
        interest: periodInterest,
        totalPayment: totalPeriodPayment,
        remainingBalance: endingBalance,
      });

      currentBalance = endingBalance;
      accumulatedPrincipal += periodPrincipal;
      accumulatedInterest += periodInterest;
    }

    const firstMonthPayment = rows.length > 0 ? rows[0].totalPayment : 0;
    const lastMonthPayment = rows.length > 0 ? rows[rows.length - 1].totalPayment : 0;

    return {
      rows,
      totalPrincipal: accumulatedPrincipal,
      totalInterest: accumulatedInterest,
      totalPayment: accumulatedPrincipal + accumulatedInterest,
      firstMonthPayment,
      lastMonthPayment,
    };
  }, [
    loanAmount,
    cycleInfo,
    disbursementDate,
    paymentDayOfMonth,
    roundingMode,
  ]);

  const formattedDisbDate = new Date(disbursementDate).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003B70]/10 text-[#003B70] text-xs font-semibold mb-2">
          <Calculator className="w-4 h-4 text-red-600" />
          <span>Bảng Tính Lãi Suất Vay VietinBank</span>
        </div>
        <h2 className="text-xl md:text-3xl font-extrabold text-[#003B70] tracking-tight">
          Lịch Trả Nợ Khoản Vay (Dư Nợ Giảm Dần)
        </h2>
        <p className="text-slate-600 text-xs md:text-sm mt-1">
          Trả gốc đều từng kỳ, tiền lãi tính trên dư nợ thực tế giảm dần. Tiền trả hàng tháng giảm dần, tối ưu tổng lãi vay cho khách hàng.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form (Dạng nhập theo yêu cầu!) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base md:text-lg font-bold text-[#003B70] border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Thông tin khoản vay</span>
            <span className="text-xs font-normal text-slate-500">Nhập số liệu trực tiếp</span>
          </h3>

          {/* 1. Giá trị Bất động sản (Tùy chọn) */}
          <div className="space-y-1">
            <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Giá trị tài sản bảo đảm / BĐS (VND)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={propertyValueStr}
                onChange={handlePropertyValueChange}
                placeholder="2,000,000,000"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 focus:bg-white text-sm md:text-base font-semibold text-slate-800 focus:outline-hidden transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>
            {propertyValue > 0 && loanAmount > 0 && (
              <span className="text-[11px] text-sky-700 block">
                Tỷ lệ vay trên tài sản (LTV): <strong>{((loanAmount / propertyValue) * 100).toFixed(1)}%</strong>
              </span>
            )}
          </div>

          {/* 2. Số tiền vay (DẠNG NHẬP, KHÔNG KÉO THẢ) */}
          <div className="space-y-1">
            <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center justify-between">
              <span>Số tiền vay (VND) <span className="text-red-500">*</span></span>
              <span className="text-[11px] text-red-600 font-medium">(Nhập số tiền trực tiếp)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={loanAmountStr}
                onChange={handleLoanAmountChange}
                placeholder="1,000,000,000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 focus:bg-white text-base md:text-lg font-bold text-[#003B70] focus:outline-hidden transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>
            {/* Quick shortcuts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[300000000, 500000000, 1000000000, 2000000000, 3000000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLoanAmountStr(new Intl.NumberFormat('vi-VN').format(amt))}
                  className="px-2 py-0.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#003B70] text-xs font-medium border border-sky-100 transition cursor-pointer"
                >
                  {amt >= 1000000000 ? `${amt / 1000000000} Tỷ` : `${amt / 1000000} Tr`}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Thời gian vay (Tháng) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-slate-700 block">
                Thời gian vay (Tháng) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="420"
                  value={loanTermMonths}
                  onChange={(e) => setLoanTermMonths(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 focus:bg-white text-sm md:text-base font-semibold text-[#003B70] focus:outline-hidden transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  Tháng ({(loanTermMonths / 12).toFixed(1)} năm)
                </span>
              </div>
            </div>

            {/* 4. Lãi suất (%/Năm) */}
            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-slate-700 block">
                Lãi suất (%/Năm) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="30"
                  value={annualRateStr}
                  onChange={(e) => setAnnualRateStr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 focus:bg-white text-sm md:text-base font-semibold text-[#003B70] focus:outline-hidden transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  %/Năm
                </span>
              </div>
            </div>
          </div>

          {/* 5. Chu kỳ trả nợ & Ngày giải ngân */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-slate-700 block">
                Chu kỳ trả nợ
              </label>
              <select
                value={cycle}
                onChange={(e) => setCycle(e.target.value as RepaymentCycle)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 text-sm font-medium text-slate-800"
              >
                <option value="monthly">Hằng tháng (Lãi suất/12)</option>
                <option value="quarterly">Hằng quý (Lãi suất/4)</option>
                <option value="six_months">6 Tháng (Lãi suất/2)</option>
                <option value="yearly">Hằng năm (Lãi suất/1)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-slate-700 block">
                Ngày giải ngân
              </label>
              <input
                type="date"
                value={disbursementDate}
                onChange={(e) => setDisbursementDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 text-sm font-medium text-slate-800"
              />
            </div>
          </div>

          {/* 6. Ngày trả nợ định kỳ & Làm tròn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-slate-700 block">
                Ngày trả nợ định kỳ
              </label>
              <select
                value={paymentDayOfMonth}
                onChange={(e) => setPaymentDayOfMonth(parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 text-sm font-medium text-slate-800"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Ngày {d} hàng kỳ
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-slate-700 block">
                Quy tắc làm tròn
              </label>
              <select
                value={roundingMode}
                onChange={(e) => setRoundingMode(e.target.value as 'exact' | '1000')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#003B70] bg-slate-50 text-sm font-medium text-slate-800"
              >
                <option value="1000">Làm tròn đến 1.000 đồng (chuẩn NH)</option>
                <option value="exact">Làm tròn đến đơn vị đồng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Summary Card with Button "Xem chi tiết" */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-[#003B70] to-[#00274d] rounded-3xl p-6 text-white shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-sky-200">
                Tổng Quan Trả Nợ
              </span>
              <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-500/30">
                {cycleInfo.label}
              </span>
            </div>

            {/* Monthly payment range */}
            <div className="space-y-1">
              <span className="text-xs text-sky-200">Số tiền trả hàng tháng (giảm dần):</span>
              <div className="flex items-baseline gap-2 text-white">
                <span className="text-xs text-sky-300">Từ</span>
                <span className="text-xl md:text-2xl font-black text-amber-300">
                  {formatVND(calculateSchedule.firstMonthPayment)}
                </span>
                <span className="text-xs text-sky-300">đến</span>
                <span className="text-base md:text-lg font-bold text-emerald-300">
                  {formatVND(calculateSchedule.lastMonthPayment)}
                </span>
                <span className="text-xs font-semibold text-sky-200">VND</span>
              </div>
            </div>

            {/* Total interest & Total amount */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-sky-200">Tổng lãi phải trả:</span>
                <strong className="text-amber-300 font-bold text-base">
                  {formatVND(calculateSchedule.totalInterest)} VND
                </strong>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-sky-200">Tổng gốc + lãi:</span>
                <strong className="text-white font-extrabold text-lg">
                  {formatVND(calculateSchedule.totalPayment)} VND
                </strong>
              </div>
            </div>

            {/* Key parameters overview */}
            <div className="bg-white/10 rounded-2xl p-4 space-y-2 text-xs text-sky-100">
              <div className="flex justify-between">
                <span>Số kỳ trả nợ:</span>
                <strong className="text-white">{cycleInfo.totalPeriods} kỳ</strong>
              </div>
              <div className="flex justify-between">
                <span>Lãi suất kỳ quy đổi:</span>
                <strong className="text-amber-300">
                  {(cycleInfo.periodRate * 100).toFixed(2)}% / kỳ
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Gốc trả đều mỗi kỳ:</span>
                <strong className="text-white">
                  ~{formatVND(loanAmount / cycleInfo.totalPeriods)} VND
                </strong>
              </div>
            </div>

            {/* BUTTON XEM CHI TIẾT as specified in PDF */}
            <button
              onClick={() => setShowDetailModal(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-sm shadow-md transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Table className="w-4 h-4" />
              <span>Xem chi tiết lịch trả nợ</span>
            </button>
          </div>

          {/* Info pill */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#003B70] mb-0.5">Quy tắc nghiệp vụ ngân hàng:</p>
              <p>Sai lệch làm tròn được tự động bù trừ cân đối vào kỳ trả nợ cuối cùng, đảm bảo dư nợ cuối cùng về đúng 0 đồng.</p>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL: BẢNG TÍNH LỊCH TRẢ NỢ VỚI DƯ NỢ GIẢM DẦN */}
      {showDetailModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs"
          onClick={() => setShowDetailModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 md:p-6 bg-gradient-to-r from-[#003B70] to-[#004e92] text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold block">
                  VietinBank Amortization Schedule
                </span>
                <h3 className="text-lg md:text-xl font-bold">
                  Bảng tính lịch trả nợ với dư nợ giảm dần
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition text-xs flex items-center gap-1 cursor-pointer"
                  title="In lịch trả nợ"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">In lịch</span>
                </button>

                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Summary Strip */}
            <div className="bg-sky-50 px-6 py-3 border-b border-sky-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-500">Số tiền vay: </span>
                <strong className="text-[#003B70]">{formatVND(loanAmount)} VND</strong>
              </div>
              <div>
                <span className="text-slate-500">Thời gian vay: </span>
                <strong className="text-[#003B70]">{loanTermMonths} tháng</strong>
              </div>
              <div>
                <span className="text-slate-500">Lãi suất: </span>
                <strong className="text-[#003B70]">{annualRate}%/năm</strong>
              </div>
              <div>
                <span className="text-slate-500">Ngày giải ngân: </span>
                <strong className="text-[#003B70]">{formattedDisbDate}</strong>
              </div>
            </div>

            {/* Schedule Table (Matching PDF format exactly) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <th className="py-3 px-3 text-center">STT</th>
                      <th className="py-3 px-3">KỲ TRẢ NỢ</th>
                      <th className="py-3 px-3 text-right">SỐ GỐC CÒN LẠI</th>
                      <th className="py-3 px-3 text-right">GỐC</th>
                      <th className="py-3 px-3 text-right">LÃI</th>
                      <th className="py-3 px-3 text-right">TỔNG GỐC + LÃI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {/* Period 0: Disbursement */}
                    <tr className="bg-sky-50/50 text-slate-800 font-semibold">
                      <td className="py-2.5 px-3 text-center">0</td>
                      <td className="py-2.5 px-3">{formattedDisbDate} (Giải ngân)</td>
                      <td className="py-2.5 px-3 text-right text-[#003B70] font-bold">{formatVND(loanAmount)}</td>
                      <td className="py-2.5 px-3 text-right">-</td>
                      <td className="py-2.5 px-3 text-right">-</td>
                      <td className="py-2.5 px-3 text-right">-</td>
                    </tr>

                    {/* Amortization Rows */}
                    {calculateSchedule.rows.map((row) => (
                      <tr 
                        key={row.period}
                        className={row.period % 2 === 0 ? 'bg-slate-50/40 hover:bg-sky-50/60' : 'bg-white hover:bg-sky-50/60'}
                      >
                        <td className="py-2 px-3 text-center text-slate-500">{row.period}</td>
                        <td className="py-2 px-3 text-slate-700">{row.dueDate}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-800">{formatVND(row.beginningBalance)}</td>
                        <td className="py-2 px-3 text-right font-mono text-sky-800 font-semibold">{formatVND(row.principal)}</td>
                        <td className="py-2 px-3 text-right font-mono text-amber-700">{formatVND(row.interest)}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-900 font-bold">{formatVND(row.totalPayment)}</td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Total Row */}
                  <tfoot>
                    <tr className="bg-[#003B70] text-white font-bold text-xs md:text-sm">
                      <td colSpan={2} className="py-3.5 px-4 uppercase tracking-wider">
                        TỔNG CỘNG
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono">-</td>
                      <td className="py-3.5 px-3 text-right font-mono text-sky-200">
                        {formatVND(calculateSchedule.totalPrincipal)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-amber-300">
                        {formatVND(calculateSchedule.totalInterest)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-white text-base">
                        {formatVND(calculateSchedule.totalPayment)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#003B70] hover:bg-sky-900 text-white text-xs md:text-sm font-semibold transition cursor-pointer"
              >
                Đóng bảng tính
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
