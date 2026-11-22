"use client";

import { useState, useMemo } from "react";
import { formatPrice } from "@/lib/utils";
import { Calculator, DollarSign, Calendar, Percent, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

export function LoanCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(3500000000); // 3.5 tỷ
  const [loanPercent, setLoanPercent] = useState<number>(70); // 70%
  const [loanYears, setLoanYears] = useState<number>(20); // 20 năm
  const [interestRate, setInterestRate] = useState<number>(7.5); // 7.5%/năm
  const [paymentType, setPaymentType] = useState<"reducing" | "fixed">("reducing");

  const loanAmount = useMemo(() => {
    return Math.round((propertyPrice * loanPercent) / 100);
  }, [propertyPrice, loanPercent]);

  const upfrontAmount = useMemo(() => {
    return propertyPrice - loanAmount;
  }, [propertyPrice, loanAmount]);

  // Calculation
  const calculation = useMemo(() => {
    const totalMonths = loanYears * 12;
    const monthlyRate = interestRate / 100 / 12;
    const principalMonthly = loanAmount / totalMonths;

    if (paymentType === "reducing") {
      // Dư nợ giảm dần
      const firstMonthInterest = loanAmount * monthlyRate;
      const firstMonthPayment = principalMonthly + firstMonthInterest;
      
      // Total interest under reducing balance: loanAmount * monthlyRate * (totalMonths + 1) / 2
      const totalInterest = (loanAmount * monthlyRate * (totalMonths + 1)) / 2;
      const totalPayment = loanAmount + totalInterest;

      // Sample first 6 months schedule
      const schedule = [];
      let currentBalance = loanAmount;
      for (let m = 1; m <= Math.min(6, totalMonths); m++) {
        const interest = currentBalance * monthlyRate;
        const total = principalMonthly + interest;
        currentBalance -= principalMonthly;
        schedule.push({
          month: m,
          principal: Math.round(principalMonthly),
          interest: Math.round(interest),
          total: Math.round(total),
          remaining: Math.max(0, Math.round(currentBalance)),
        });
      }

      return {
        firstMonthPayment: Math.round(firstMonthPayment),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        schedule,
      };
    } else {
      // Trả đều hàng tháng (Fixed payment)
      // monthly = loanAmount * [r * (1 + r)^n] / [(1 + r)^n - 1]
      const r = monthlyRate;
      const n = totalMonths;
      const monthlyPayment = (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - loanAmount;

      const schedule = [];
      let currentBalance = loanAmount;
      for (let m = 1; m <= Math.min(6, totalMonths); m++) {
        const interest = currentBalance * monthlyRate;
        const principal = monthlyPayment - interest;
        currentBalance -= principal;
        schedule.push({
          month: m,
          principal: Math.round(principal),
          interest: Math.round(interest),
          total: Math.round(monthlyPayment),
          remaining: Math.max(0, Math.round(currentBalance)),
        });
      }

      return {
        firstMonthPayment: Math.round(monthlyPayment),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        schedule,
      };
    }
  }, [loanAmount, loanYears, interestRate, paymentType]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E03C31] flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Bảng tính lãi suất vay mua nhà</h3>
            <p className="text-xs text-gray-500">Dự tính chính xác dòng tiền và lịch trả nợ ngân hàng</p>
          </div>
        </div>

        {/* Payment type switch */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setPaymentType("reducing")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              paymentType === "reducing"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Dư nợ giảm dần (Khuyên dùng)
          </button>
          <button
            onClick={() => setPaymentType("fixed")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              paymentType === "fixed"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Trả góp đều hàng tháng
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-gray-700">Giá trị bất động sản</label>
              <span className="font-extrabold text-[#E03C31] text-sm">
                {formatPrice(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={500000000}
              max={20000000000}
              step={100000000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#E03C31] h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>500 triệu</span>
              <span>10 tỷ</span>
              <span>20 tỷ</span>
            </div>
          </div>

          {/* Loan Ratio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-gray-700">Tỷ lệ vay ngân hàng</label>
              <span className="font-bold text-gray-900 text-sm">
                {loanPercent}% ({formatPrice(loanAmount)})
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={85}
              step={5}
              value={loanPercent}
              onChange={(e) => setLoanPercent(Number(e.target.value))}
              className="w-full accent-[#E03C31] h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>10%</span>
              <span>50%</span>
              <span>70% (Phổ biến)</span>
              <span>85%</span>
            </div>
          </div>

          {/* Duration & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-gray-700">Thời hạn vay</label>
                <span className="font-bold text-gray-900">{loanYears} năm ({loanYears * 12} tháng)</span>
              </div>
              <select
                value={loanYears}
                onChange={(e) => setLoanYears(Number(e.target.value))}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#E03C31]"
              >
                {[5, 10, 15, 20, 25, 30, 35].map((y) => (
                  <option key={y} value={y}>{y} năm</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-gray-700">Lãi suất ưu đãi</label>
                <span className="font-bold text-gray-900">{interestRate}% / năm</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="3"
                max="18"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#E03C31]"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start space-x-3 text-xs text-gray-600">
            <HelpCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Mức lãi suất <strong>{interestRate}%/năm</strong> thường áp dụng ưu đãi trong 1-2 năm đầu. Sau đó lãi suất thả nổi thường bằng lãi suất huy động 12 tháng + biên độ 3.5% - 4.5%.
            </p>
          </div>
        </div>

        {/* Results Summary Column (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Kết quả dự tính</p>

            <div className="space-y-1">
              <span className="text-xs text-gray-300">Số tiền trả tháng đầu tiên</span>
              <p className="text-3xl font-black text-amber-400">
                {formatPrice(calculation.firstMonthPayment)}
              </p>
              <span className="text-[11px] text-gray-400">
                (Gốc: {formatPrice(Math.round(loanAmount / (loanYears * 12)))} + Lãi: {formatPrice(Math.round(calculation.firstMonthPayment - (loanAmount / (loanYears * 12))))})
              </span>
            </div>

            <div className="border-t border-gray-700/80 pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-gray-300">
                <span>Vốn tự có cần chuẩn bị:</span>
                <strong className="text-white text-sm">{formatPrice(upfrontAmount)}</strong>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Số tiền gốc cần vay:</span>
                <strong className="text-white text-sm">{formatPrice(loanAmount)}</strong>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Tổng tiền lãi phải trả:</span>
                <strong className="text-amber-300 text-sm">{formatPrice(calculation.totalInterest)}</strong>
              </div>
              <div className="flex justify-between items-center text-gray-300 pt-2 border-t border-gray-700/40">
                <span>Tổng số tiền gốc + lãi:</span>
                <strong className="text-emerald-400 text-base">{formatPrice(calculation.totalPayment)}</strong>
              </div>
            </div>
          </div>

          <a
            href="/bat-dong-san"
            className="w-full py-3 bg-[#E03C31] hover:bg-[#B8281F] text-white rounded-xl text-center text-xs font-bold transition-all shadow-md"
          >
            Tìm nhà phù hợp hạn mức vay này →
          </a>
        </div>
      </div>

      {/* Schedule Table Preview */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <h4 className="font-bold text-sm text-gray-900">Lịch trả nợ tham khảo (6 tháng đầu tiên)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
              <tr>
                <th className="py-2.5 px-3">Kỳ (Tháng)</th>
                <th className="py-2.5 px-3">Tiền gốc</th>
                <th className="py-2.5 px-3">Tiền lãi</th>
                <th className="py-2.5 px-3">Tổng tiền trả</th>
                <th className="py-2.5 px-3">Dư nợ còn lại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {calculation.schedule.map((row) => (
                <tr key={row.month} className="hover:bg-gray-50/50">
                  <td className="py-2.5 px-3 font-bold text-gray-700">Tháng {row.month}</td>
                  <td className="py-2.5 px-3 font-medium text-gray-600">{formatPrice(row.principal)}</td>
                  <td className="py-2.5 px-3 text-[#E03C31] font-semibold">{formatPrice(row.interest)}</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">{formatPrice(row.total)}</td>
                  <td className="py-2.5 px-3 text-gray-500">{formatPrice(row.remaining)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
