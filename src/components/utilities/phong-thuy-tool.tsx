"use client";

import { useState, useMemo } from "react";
import { Compass, CheckCircle2, XCircle, Sparkles, HelpCircle } from "lucide-react";

interface PhongThuyResult {
  canChi: string;
  menhNguHanh: string;
  quaiSo: number;
  cungMenh: string;
  nhom: "Đông Tứ Mệnh" | "Tây Tứ Mệnh";
  huongTot: { huong: string; yNghia: string; batTrach: string }[];
  huongXau: { huong: string; yNghia: string; batTrach: string }[];
}

// Bát trạch calculation
const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export function PhongThuyTool() {
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [gender, setGender] = useState<"nam" | "nu">("nam");

  const result: PhongThuyResult = useMemo(() => {
    // Can Chi
    const can = CAN[(birthYear - 4) % 10];
    const chi = CHI[(birthYear - 4) % 12];
    const canChi = `${can} ${chi}`;

    // Calculate Quái số
    // Sum digits of year, reduce to single digit
    let sum = birthYear
      .toString()
      .split("")
      .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    while (sum > 9) {
      sum = sum
        .toString()
        .split("")
        .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }

    let quaiSo = 1;
    if (gender === "nam") {
      quaiSo = 11 - sum;
      while (quaiSo > 9) quaiSo -= 9;
      if (quaiSo === 5) quaiSo = 2; // Nam quy về Cấn (hoặc Khôn)
    } else {
      quaiSo = 4 + sum;
      while (quaiSo > 9) quaiSo -= 9;
      if (quaiSo === 5) quaiSo = 8; // Nữ quy về Cấn
    }

    // Mapping Quái số to Cung & Nhóm
    // 1: Khảm (Thủy - Đông Tứ), 2: Khôn (Thổ - Tây Tứ), 3: Chấn (Mộc - Đông Tứ), 4: Tốn (Mộc - Đông Tứ)
    // 6: Càn (Kim - Tây Tứ), 7: Đoài (Kim - Tây Tứ), 8: Cấn (Thổ - Tây Tứ), 9: Ly (Hỏa - Đông Tứ)
    const CUNG_MAP: Record<number, { cung: string; hanh: string; nhom: "Đông Tứ Mệnh" | "Tây Tứ Mệnh" }> = {
      1: { cung: "Khảm", hanh: "Thủy", nhom: "Đông Tứ Mệnh" },
      2: { cung: "Khôn", hanh: "Thổ", nhom: "Tây Tứ Mệnh" },
      3: { cung: "Chấn", hanh: "Mộc", nhom: "Đông Tứ Mệnh" },
      4: { cung: "Tốn", hanh: "Mộc", nhom: "Đông Tứ Mệnh" },
      6: { cung: "Càn", hanh: "Kim", nhom: "Tây Tứ Mệnh" },
      7: { cung: "Đoài", hanh: "Kim", nhom: "Tây Tứ Mệnh" },
      8: { cung: "Cấn", hanh: "Thổ", nhom: "Tây Tứ Mệnh" },
      9: { cung: "Ly", hanh: "Hỏa", nhom: "Đông Tứ Mệnh" },
    };

    const info = CUNG_MAP[quaiSo] || CUNG_MAP[1];

    const isDongTu = info.nhom === "Đông Tứ Mệnh";

    const huongTot = isDongTu
      ? [
          { huong: "Đông Nam", batTrach: "Sinh Khí", yNghia: "Thu hút tài lộc, danh tiếng, thăng quan phát tài" },
          { huong: "Đông", batTrach: "Thiên Y", yNghia: "Cải thiện sức khỏe, trường thọ, gia đạo bình an" },
          { huong: "Nam", batTrach: "Diên Niên", yNghia: "Củng cố các mối quan hệ tình cảm, hòa thuận vợ chồng" },
          { huong: "Bắc", batTrach: "Phục Vị", yNghia: "Củng cố sức mạnh tinh thần, may mắn trong thi cử sự nghiệp" },
        ]
      : [
          { huong: "Tây Bắc", batTrach: "Sinh Khí", yNghia: "Thu hút vượng khí, tài lộc dồi dào, thăng tiến sự nghiệp" },
          { huong: "Tây Nam", batTrach: "Thiên Y", yNghia: "Sức khỏe dồi dào, gặp quý nhân phù trợ" },
          { huong: "Đông Bắc", batTrach: "Diên Niên", yNghia: "Gia đạo yên vui, hạnh phúc bền lâu" },
          { huong: "Tây", batTrach: "Phục Vị", yNghia: "Tâm an, củng cố nội lực và may mắn gia chủ" },
        ];

    const huongXau = isDongTu
      ? [
          { huong: "Tây", batTrach: "Tuyệt Mệnh", yNghia: "Tổn hại sức khỏe, tai bay vạ gió, hao tài tán của" },
          { huong: "Đông Bắc", batTrach: "Ngũ Quỷ", yNghia: "Mất việc làm, tranh chấp thị phi, hỏa hoạn" },
          { huong: "Tây Nam", batTrach: "Lục Sát", yNghia: "Xáo trộn quan hệ tình cảm, thù hận, kiện tụng" },
          { huong: "Tây Bắc", batTrach: "Họa Hại", yNghia: "Không may mắn, thị phi, thất bại trong công việc" },
        ]
      : [
          { huong: "Nam", batTrach: "Tuyệt Mệnh", yNghia: "Rất xấu, ảnh hưởng nghiêm trọng sinh khí và tài lộc" },
          { huong: "Bắc", batTrach: "Ngũ Quỷ", yNghia: "Dễ gặp thị phi, tiểu nhân quấy phá" },
          { huong: "Đông", batTrach: "Lục Sát", yNghia: "Bất hòa trong gia đạo, rủi ro pháp lý" },
          { huong: "Đông Nam", batTrach: "Họa Hại", yNghia: "Mệt mỏi, tài chính hao hụt bất ngờ" },
        ];

    return {
      canChi,
      menhNguHanh: info.hanh,
      quaiSo,
      cungMenh: info.cung,
      nhom: info.nhom,
      huongTot,
      huongXau,
    };
  }, [birthYear, gender]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-8">
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Tra cứu phong thủy hướng nhà Bát Trạch</h3>
          <p className="text-xs text-gray-500">Xem hướng nhà hợp tuổi, cung mệnh gia chủ theo năm sinh</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Năm sinh gia chủ (Dương lịch)</label>
            <input
              type="number"
              min={1940}
              max={2030}
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-xl text-sm font-bold focus:outline-none focus:border-[#E03C31]"
            />
            <span className="text-[11px] text-gray-500 mt-1 block">
              Năm âm lịch tương ứng: <strong>{result.canChi}</strong>
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Giới tính gia chủ</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("nam")}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  gender === "nam"
                    ? "bg-[#E03C31] text-white border-[#E03C31] shadow-xs"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Nam mạng
              </button>
              <button
                type="button"
                onClick={() => setGender("nu")}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  gender === "nu"
                    ? "bg-[#E03C31] text-white border-[#E03C31] shadow-xs"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Nữ mạng
              </button>
            </div>
          </div>

          {/* Cung mệnh badge card */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Kết quả bản mệnh gia chủ</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-gray-500">Can chi: </span>
                <strong className="text-gray-900">{result.canChi}</strong>
              </div>
              <div>
                <span className="text-gray-500">Cung mệnh: </span>
                <strong className="text-gray-900">{result.cungMenh} ({result.menhNguHanh})</strong>
              </div>
              <div className="col-span-2 pt-1 border-t border-amber-200/60">
                <span className="text-gray-500">Thuộc nhóm: </span>
                <strong className="text-[#E03C31] text-sm">{result.nhom}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Results Direction Tables */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hướng tốt */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-emerald-700 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4 Hướng tốt nên chọn (Hợp gia chủ)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {result.huongTot.map((h, i) => (
                <div key={i} className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-900 text-sm">Hướng {h.huong}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">
                      {h.batTrach}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{h.yNghia}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hướng xấu */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-sm text-red-600 flex items-center space-x-1.5">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>4 Hướng xấu cần tránh (Kỵ gia chủ)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {result.huongXau.map((h, i) => (
                <div key={i} className="p-3 bg-red-50/40 border border-red-200/70 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-900 text-sm">Hướng {h.huong}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-200/70 text-red-800">
                      {h.batTrach}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{h.yNghia}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
