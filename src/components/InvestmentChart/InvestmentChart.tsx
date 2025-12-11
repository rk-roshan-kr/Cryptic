import { useState, useCallback } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts'

export type Allocation = {
  symbol: string
  percent: number
  color: string
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)

  // 1. Surface Point
  const sx = cx + (outerRadius) * cos
  const sy = cy + (outerRadius) * sin

  // 2. Elbow Point (slightly out)
  const mx = cx + (outerRadius + 20) * cos
  const my = cy + (outerRadius + 20) * sin

  // 3. Target End Point (Vertical Bands)
  // If in upper half (my < cy), go to Top (Y=40). Else Bottom (Y=320).
  const isTop = my < cy
  const ey = isTop ? 40 : 320

  // 4. Clamp X to safe area (Container is ~360 wide, keep text away from edges)
  // Text is anchored middle, so keep center within [70, 290]
  const ex = Math.max(70, Math.min(290, mx))

  const textAnchor = "middle"

  return (
    <g>
      {/* Active Main Sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0 0 10px ${fill}80)` }}
      />

      {/* Decorative Outer Ring Segment */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 12}
        fill={fill}
        fillOpacity={0.4}
      />

      {/* Connecting Line (Circuit Style) */}
      <path
        d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`}
        stroke={fill}
        strokeWidth={2}
        fill="none"
        opacity={0.8}
      />

      {/* End Dot */}
      <circle cx={ex} cy={ey} r={4} fill={fill} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />

      {/* External Labels Stacked Vertical */}
      {isTop ? (
        <>
          <text x={ex} y={ey} dy={-10} textAnchor={textAnchor} fill="#94a3b8" className="text-sm font-medium">
            {payload.percent}%
          </text>
          <text x={ex} y={ey} dy={-30} textAnchor={textAnchor} fill="#ffffff" className="text-base font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {payload.symbol.length > 12 ? payload.symbol.slice(0, 12) + '...' : payload.symbol}
          </text>
        </>
      ) : (
        <>
          <text x={ex} y={ey} dy={20} textAnchor={textAnchor} fill="#ffffff" className="text-base font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {payload.symbol.length > 12 ? payload.symbol.slice(0, 12) + '...' : payload.symbol}
          </text>
          <text x={ex} y={ey} dy={40} textAnchor={textAnchor} fill="#94a3b8" className="text-sm font-medium">
            {payload.percent}%
          </text>
        </>
      )}
    </g>
  )
}

export default function InvestmentChart({ data }: { data: Allocation[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', minHeight: 320 }}>
      <ResponsiveContainer>
        <PieChart margin={{ top: 0, right: 30, bottom: 0, left: 30 }}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            paddingAngle={3}
            dataKey="percent"
            onMouseEnter={onPieEnter}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                fillOpacity={index === activeIndex ? 1 : 0.6}
                stroke={index === activeIndex ? 'rgba(255,255,255,0.1)' : 'none'}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}


