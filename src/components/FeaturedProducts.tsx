import React, { useState } from 'react';
import { FEATURED_PRODUCTS, CONSULTANTS } from '../data/mockData';
import { FeaturedProduct } from '../types';
import { 
  Star, 
  Gift, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Phone, 
  X, 
  CheckCircle2, 
  UserCheck, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'list'>('carousel');
  const [interestedProduct, setInterestedProduct] = useState<FeaturedProduct | null>(null);
  const [consultationSubmitted, setConsultationSubmitted] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'ca-nhan', label: 'Cá nhân' },
    { id: 'ho-kinh-doanh', label: 'Hộ kinh doanh' },
    { id: 'doanh-nghiep', label: 'Doanh nghiệp' },
    { id: 'uu-dai', label: 'Ưu đãi' },
    { id: 'dau-gia', label: 'Tài sản đấu giá' },
  ];

  const filteredProducts = FEATURED_PRODUCTS.filter((prod) => {
    if (activeCategory === 'all') return true;
    return prod.category === activeCategory;
  });

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  const handleOpenInterestModal = (prod: FeaturedProduct) => {
    setInterestedProduct(prod);
    setConsultationSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Featured Header Card as specified:
          "Card này nên có thiết kế nổi hơn một chút: có nhãn nhỏ 'Nổi bật', icon ngôi sao/quà tặng, nền gradient xanh nhẹ hoặc viền đỏ mảnh."
      */}
      <div className="relative bg-gradient-to-r from-sky-50 via-white to-blue-50/80 border-2 border-red-500/20 hover:border-red-500/40 rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden transition">
        {/* Subtle decorative background shape */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-100 rounded-full blur-2xl pointer-events-none opacity-60" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <Star className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>Nổi bật</span>
            </div>

            <h2 className="text-xl md:text-3xl font-extrabold text-[#003B70] tracking-tight">
              Sản phẩm dịch vụ nổi bật
            </h2>

            <p className="text-slate-600 text-xs md:text-sm max-w-xl leading-relaxed">
              Khám phá các sản phẩm, ưu đãi và tiện ích VietinBank đang được giới thiệu tại chi nhánh.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'carousel' ? 'list' : 'carousel')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sky-200 bg-white hover:bg-sky-50 text-sky-900 text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              <Layers className="w-4 h-4 text-[#003B70]" />
              <span>{viewMode === 'carousel' ? 'Xem danh sách vuốt dọc' : 'Xem dạng Carousel'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-2 py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCarouselIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#003B70] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-[#003B70] hover:border-sky-300'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Content Rendering: Carousel or List View */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500">
          Không có sản phẩm nào trong danh mục này.
        </div>
      ) : viewMode === 'carousel' ? (
        /* Poster Dạng Carousel (As explicitly suggested in PDF) */
        <div className="relative bg-white border border-slate-200 rounded-3xl p-4 md:p-8 shadow-xs">
          {/* Active Product Slide */}
          {filteredProducts[carouselIndex] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Poster Image */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-900/5">
                  <img
                    src={filteredProducts[carouselIndex].imageUrl}
                    alt={filteredProducts[carouselIndex].title}
                    className="w-full h-auto max-h-[460px] object-cover transition duration-300 group-hover:scale-102"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden h-80 w-full flex-col items-center justify-center p-6 text-center text-slate-400">
                    <Sparkles className="w-12 h-12 text-[#003B70] mb-2" />
                    <span className="font-bold text-slate-700">{filteredProducts[carouselIndex].title}</span>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#003B70] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {filteredProducts[carouselIndex].categoryLabel}
                  </span>
                </div>
              </div>

              {/* Poster Info & Action */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                  <Gift className="w-3.5 h-3.5 text-amber-600" />
                  <span>{filteredProducts[carouselIndex].tag}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-[#003B70]">
                  {filteredProducts[carouselIndex].title}
                </h3>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {filteredProducts[carouselIndex].description}
                </p>

                {/* Nút "Tôi quan tâm" as required */}
                <div className="pt-3">
                  <button
                    onClick={() => handleOpenInterestModal(filteredProducts[carouselIndex])}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-sm md:text-base shadow-md hover:shadow-red-500/20 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                    <span>Tôi quan tâm</span>
                  </button>
                </div>

                {/* Carousel Indicator Dots */}
                <div className="flex items-center gap-2 pt-4">
                  {filteredProducts.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCarouselIndex(dotIdx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === carouselIndex ? 'w-8 bg-[#003B70]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {filteredProducts.length > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevSlide}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#003B70] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Trước</span>
              </button>

              <span className="text-xs text-slate-500 font-medium">
                {carouselIndex + 1} / {filteredProducts.length}
              </span>

              <button
                onClick={handleNextSlide}
                className="p-3 rounded-2xl bg-[#003B70] hover:bg-sky-900 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Tiếp</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Poster Vuốt Dọc (Vertical feed) - Tối ưu mobile */
        <div className="space-y-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-full md:w-56 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="w-full h-64 md:h-52 object-cover"
                />
              </div>

              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-[#003B70]">
                    {prod.categoryLabel}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {prod.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#003B70]">
                  {prod.title}
                </h3>

                <p className="text-slate-600 text-xs md:text-sm">
                  {prod.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => handleOpenInterestModal(prod)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs md:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Tôi quan tâm</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POPUP MODAL KHI KHÁCH BẤM "TÔI QUAN TÂM" (As required in PDF) */}
      {interestedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setInterestedProduct(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 text-center shadow-2xl space-y-4 animate-scaleUp relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInterestedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-red-600 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Ghi Nhận Sự Quan Tâm
              </span>
              <h3 className="text-lg md:text-xl font-bold text-[#003B70]">
                {interestedProduct.title}
              </h3>
            </div>

            {/* Exact required text from PDF */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs md:text-sm text-slate-700 text-left leading-relaxed space-y-2">
              <p className="font-medium">
                “Cảm ơn Quý khách đã quan tâm đến sản phẩm/dịch vụ này. Quý khách vui lòng liên hệ cán bộ VietinBank tại quầy để được tư vấn chi tiết.”
              </p>
              <div className="pt-2 border-t border-sky-200/60 font-semibold text-[#003B70]">
                Hoặc liên hệ Chuyên viên tư vấn:
                <div className="text-red-700 font-bold text-sm mt-0.5">
                  {CONSULTANTS.hiep.name} - {CONSULTANTS.hiep.phone}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={`tel:${CONSULTANTS.hiep.phone.replace(/[^0-9]/g, '')}`}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Chuyên viên Lê Hoàng Hiệp</span>
              </a>

              <button
                onClick={() => {
                  setConsultationSubmitted(true);
                  setTimeout(() => setInterestedProduct(null), 1500);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                {consultationSubmitted ? '✓ Đã thông báo tới GDV quầy' : 'Thông báo tới Giao dịch viên tại quầy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
