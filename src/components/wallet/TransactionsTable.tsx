import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronDown, Check } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { CopyableHash } from './CopyableHash'
import { formatDateTime, formatCrypto } from '../../utils/format'

interface Transaction {
  id: string
  date: string
  coin: string
  network: string
  qty: number
  fee: number
  gst: number
  deb: number
  recipient: string
  recipientFull: string
  self: boolean
  status: 'Completed' | 'Failed'
  type: 'transfer' | 'auto-sweep' | 'send' | 'receive' | 'investment'
}

interface TransactionsTableProps {
  transactions: Transaction[]
  className?: string
}

const statusFilters = ['All', 'Completed', 'Failed'] as const
const typeFilters = ['All', 'Transfer', 'Send', 'Receive', 'Investment'] as const

// Dropdown Component
const FilterDropdown = ({
  label,
  value,
  options,
  onChange
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (val: any) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${value !== 'All'
          ? 'bg-[#6a7bff]/10 border-[#6a7bff] text-[#6a7bff]'
          : 'bg-[#242655] border-[#2a2c54] text-[#8b90b2] hover:border-[#6a7bff]/50 hover:text-[#e9ecff]'
          }`}
        title={`Filter by ${label}`}
      >
        <span className="text-sm font-medium whitespace-nowrap">{label}: <span className={value !== 'All' ? 'font-bold' : ''}>{value}</span></span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 top-full mt-2 w-48 bg-[#1a1c40] border border-[#2a2c54] rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${value === option
                  ? 'bg-[#6a7bff]/10 text-[#6a7bff] font-medium'
                  : 'text-[#8b90b2] hover:bg-[#242655] hover:text-[#e9ecff]'
                  }`}
              >
                {option}
                {value === option && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const TransactionsTable = ({ transactions, className = '' }: TransactionsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<typeof statusFilters[number]>('All')
  const [typeFilter, setTypeFilter] = useState<string>('All')

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = searchTerm === '' ||
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.recipient.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'All' || tx.status === statusFilter

      const matchesType = typeFilter === 'All' ||
        (typeFilter === 'Transfer' && (tx.type === 'transfer' || tx.type === 'auto-sweep')) ||
        (typeFilter === 'Send' && tx.type === 'send') ||
        (typeFilter === 'Receive' && tx.type === 'receive') ||
        (typeFilter === 'Investment' && tx.type === 'investment')

      return matchesSearch && matchesStatus && matchesType
    })
  }, [transactions, searchTerm, statusFilter, typeFilter])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-[#1b1f4a] border border-[#2a2c54] rounded-2xl shadow-lg overflow-hidden w-full ${className}`}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-[#2a2c54] bg-[#1b1f4a] sticky top-0 z-30">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-[#e9ecff] tracking-wide">Transaction History</h3>
              <span className="px-2 py-1 rounded bg-[#242655] text-xs font-medium text-[#8b90b2]">{filteredTransactions.length}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b90b2] group-focus-within:text-[#6a7bff] transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search ID or Recipient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0f1230] border border-[#2a2c54] text-[#e9ecff] pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#6a7bff] focus:ring-1 focus:ring-[#6a7bff] transition-all placeholder:text-[#5f6485]"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              <FilterDropdown
                label="Type"
                value={typeFilter}
                options={typeFilters}
                onChange={setTypeFilter}
              />
              <FilterDropdown
                label="Status"
                value={statusFilter}
                options={statusFilters}
                onChange={setStatusFilter}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto relative z-0">
        <table className="w-full min-w-full">
          <thead className="bg-[#242655]">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#8b90b2] whitespace-nowrap">Date & Time</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#8b90b2] whitespace-nowrap">Total Qty</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#8b90b2] whitespace-nowrap">Recipient</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#8b90b2] whitespace-nowrap">Network</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#8b90b2] whitespace-nowrap">Self</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#8b90b2] whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-[#8b90b2] whitespace-nowrap">TxID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2c54]">
            <AnimatePresence>
              {filteredTransactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-[#242655]/50 transition-colors"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#e9ecff]">{formatDateTime(tx.date).split(',')[0]}</div>
                    <div className="text-xs text-[#8b90b2]">{formatDateTime(tx.date).split(',')[1] || ''}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-[#e9ecff]">{formatCrypto(tx.qty, tx.coin)}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#e9ecff]">{tx.recipient}</span>
                      <span className="text-xs text-[#8b90b2]">{tx.recipientFull}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="text-sm text-[#e9ecff]">{tx.network}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.self ? 'bg-[#36c390]/20 text-[#36c390]' : 'bg-[#e9ecff]/20 text-[#e9ecff]'
                      }`}>
                      {tx.self ? <Check size={14} /> : '-'}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                    <CopyableHash hash={tx.id} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center text-[#8b90b2]">
            No transactions found confirming your criteria.
          </div>
        )}
      </div>
    </motion.div>
  )
}
