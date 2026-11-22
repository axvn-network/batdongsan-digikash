"use client";

interface TrendData {
  month: string;
  listings: number;
  views: number;
  inquiries: number;
}

export function TrendChart({ data = [] }: { data: TrendData[] }) {
  if (!data || data.length === 0) return null;

  const maxViews = Math.max(...data.map((d) => d.views));
  const maxListings = Math.max(...data.map((d) => d.listings));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Xu hướng hoạt động toàn sàn</h3>
          <p className="text-xs text-gray-500">Thống kê tin đăng mới và lượt xem trong 6 tháng qua</p>
        </div>
        <div className="flex items-center space-x-4 text-xs font-medium">
          <span className="flex items-center space-x-1.5 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-[#E03C31]" />
            <span>Lượt xem (Views)</span>
          </span>
          <span className="flex items-center space-x-1.5 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Tin đăng mới (Listings)</span>
          </span>
        </div>
      </div>

      {/* SVG Bar & Line Chart */}
      <div className="h-56 w-full relative pt-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
          {/* Horizontal Grid lines */}
          <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />

          {/* Bars for listings */}
          {data.map((item, idx) => {
            const barW = 28;
            const x = idx * (500 / data.length) + (500 / data.length / 2) - barW / 2;
            const barH = (item.listings / maxListings) * 90;
            const y = 130 - barH;
            return (
              <rect
                key={idx}
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx="4"
                fill="#3B82F6"
                opacity="0.85"
              />
            );
          })}

          {/* Views Line overlay */}
          <polyline
            fill="none"
            stroke="#E03C31"
            strokeWidth="3.5"
            strokeLinecap="round"
            points={data
              .map((item, idx) => {
                const x = idx * (500 / data.length) + (500 / data.length / 2);
                const y = 130 - (item.views / maxViews) * 110;
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {data.map((item, idx) => {
            const x = idx * (500 / data.length) + (500 / data.length / 2);
            const y = 130 - (item.views / maxViews) * 110;
            return (
              <circle key={idx} cx={x} cy={y} r="4.5" fill="#ffffff" stroke="#E03C31" strokeWidth="3" />
            );
          })}
        </svg>

        {/* Month labels */}
        <div className="flex justify-around items-center text-xs text-gray-500 pt-3">
          {data.map((d, idx) => (
            <div key={idx} className="text-center">
              <span className="font-semibold text-gray-700">{d.month}</span>
              <p className="text-[10px] text-gray-400">{d.listings} tin</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
