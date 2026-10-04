import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { APP_DOWNLOAD_LINKS } from '../data/mockData';
import { 
  Smartphone, 
  Apple, 
  Play, 
  QrCode, 
  ShieldCheck, 
  Zap, 
  Gift, 
  CreditCard, 
  ExternalLink,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';

export const DownloadApp: React.FC = () => {
  const [iosQr, setIosQr] = useState<string>('');
  const [androidQr, setAndroidQr] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<'ios' | 'android' | null>(null);

  useEffect(() => {
    // Generate QR codes
    QRCode.toDataURL(APP_DOWNLOAD_LINKS.ios, {
      width: 260,
      margin: 2,
      color: {
        dark: '#003B70',
        light: '#FFFFFF'
      }
    }).then(setIosQr).catch(console.error);

    QRCode.toDataURL(APP_DOWNLOAD_LINKS.android, {
      width: 260,
      margin: 2,
      color: {
        dark: '#003B70',
        light: '#FFFFFF'
      }
    }).then(setAndroidQr).catch(console.error);
  }, []);

  const handleCopy = (type: 'ios' | 'android', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const features = [
    {
      icon: Zap,
      title: 'Chuyển tiền 24/7 hoàn toàn 0 đồng',
      desc: 'Miễn 100% phí chuyển khoản trong và ngoài hệ thống VietinBank, hạn mức lên tới hàng tỷ đồng/ngày.'
    },
    {
      icon: ShieldCheck,
      title: 'Sinh trắc học & Bảo mật đa lớp',
      desc: 'Công nghệ FaceID/CCCD gắn chip bảo vệ tài khoản an toàn tuyệt đối khi giao dịch trên 10 triệu đồng.'
    },
    {
      icon: CreditCard,
      title: 'Quản lý thẻ & Tài khoản số đẹp',
      desc: 'Mở thẻ phi vật lý ngay lập tức, đặt tài khoản theo số điện thoại, ngày sinh nhật hay số phong thủy.'
    },
    {
      icon: Gift,
      title: 'Hệ sinh thái dịch vụ & Quà tặng',
      desc: 'Nộp thuế, đặt vé máy bay/tàu xe/khách sạn, thanh toán tiền điện nước và tích điểm VietinBank Loyalty.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#003B70] via-[#005baa] to-[#003B70] rounded-3xl p-6 md:p-10 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-sky-100">
            <Smartphone className="w-3.5 h-3.5 text-amber-300" />
            <span>Ngân Hàng Số Trong Tầm Tay</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Tải App VietinBank iPay Mobile
          </h2>

          <p className="text-sky-100 text-sm md:text-base leading-relaxed">
            Quét mã QR bằng camera điện thoại của Quý khách ngay tại quầy để tải và cài đặt ứng dụng ngân hàng số VietinBank iPay chính thức chỉ trong 30 giây.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs md:text-sm text-sky-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Miễn phí tải về & kích hoạt
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Tương thích iOS & Android
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Cán bộ quầy hỗ trợ cài đặt
            </span>
          </div>
        </div>
      </div>

      {/* 2 Big QR Code Cards: iOS & Android */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* iOS Card */}
        <div className="bg-white border-2 border-sky-100 hover:border-sky-300 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col items-center text-center transition">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-3 shadow-sm">
            <Apple className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#003B70]">
            Dành cho iPhone (iOS)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Quét mã mở App Store trực tiếp trên thiết bị iOS
          </p>

          {/* QR Code Container */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-4 shadow-inner relative group">
            {iosQr ? (
              <img 
                src={iosQr} 
                alt="QR Code Tải VietinBank iPay trên iOS" 
                className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-lg object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
            )}
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
              Quét bằng Camera iPhone
            </span>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 mt-auto">
            <a
              href={APP_DOWNLOAD_LINKS.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition shadow-xs cursor-pointer"
            >
              <Apple className="w-4 h-4" />
              <span>Mở App Store</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              onClick={() => handleCopy('ios', APP_DOWNLOAD_LINKS.ios)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer"
              title="Sao chép liên kết"
            >
              {copiedLink === 'ios' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink === 'ios' ? 'Đã chép' : 'Sao chép link'}</span>
            </button>
          </div>
        </div>

        {/* Android Card */}
        <div className="bg-white border-2 border-sky-100 hover:border-sky-300 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col items-center text-center transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-sm">
            <Play className="w-6 h-6 fill-white" />
          </div>
          <h3 className="text-xl font-bold text-[#003B70]">
            Dành cho điện thoại Android
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Quét mã mở Google Play Store (Samsung, Oppo, Xiaomi...)
          </p>

          {/* QR Code Container */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-4 shadow-inner relative group">
            {androidQr ? (
              <img 
                src={androidQr} 
                alt="QR Code Tải VietinBank iPay trên Android" 
                className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-lg object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
            )}
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
              Quét bằng Camera / Zalo
            </span>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 mt-auto">
            <a
              href={APP_DOWNLOAD_LINKS.android}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition shadow-xs cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Mở Google Play</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              onClick={() => handleCopy('android', APP_DOWNLOAD_LINKS.android)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer"
              title="Sao chép liên kết"
            >
              {copiedLink === 'android' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink === 'android' ? 'Đã chép' : 'Sao chép link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-[#003B70] mb-5 text-center">
          Những tiện ích vượt trội trên VietinBank iPay
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#003B70] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#003B70] text-sm mb-1.5">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
