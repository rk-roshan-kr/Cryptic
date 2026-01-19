import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDashboardStore } from '../store/dashboardStore'
import { ArrowRight, BarChart3, Shield, Zap, Wallet, TrendingUp, Lock } from 'lucide-react'

// Animations
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 }
}

export default function Landing() {
  const navigate = useNavigate()
  const { deposit } = useDashboardStore()

  const handleStartSimulation = () => {
    // Mock Money Faucet Logic (Demo Liquidity for MVP)
    deposit('usdt', 100000)
    deposit('btc', 1.5)
    deposit('usd', 25000)

    // Add a small delay for effect then navigate
    setTimeout(() => {
      navigate('/app/overview')
    }, 500)
  }

  return (
    <div className="bg-[#0b0c10] text-slate-200 min-h-screen font-sans overflow-x-hidden selection:bg-purple-500/30">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-mono mb-6 text-purple-400">
              v1.0 MVP · EARLY ACCESS
            </span>
            <h1 className="text-6xl md:text-8xl font-black font-metal tracking-tighter text-white mb-6">
              CRYPTIC
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The next generation of DAO treasury management.
              <span className="text-white font-bold ml-2">Live on Beta.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartSimulation}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-bold text-lg shadow-xl shadow-purple-900/20 hover:shadow-purple-700/40 transition-all flex items-center gap-2 group"
              >
                <Wallet size={20} />
                Initialize Wallet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Dashboard Preview Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 mx-auto max-w-5xl rounded-xl border border-white/10 shadow-2xl shadow-blue-900/10 bg-[#151926] p-2 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-900 to-black rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="text-center">
                <BarChart3 size={64} className="mx-auto text-slate-700 mb-4" />
                <span className="text-slate-600 font-mono text-sm">Active Trading Dashboard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* --- PROBLEM / SOLUTION --- */}
      <section className="py-24 bg-[#0a0a0b] relative">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for DAOs</h2>
            <p className="text-slate-400 text-lg">
              Institutional-grade tooling for decentralized organizations.
              Manage liquidity, execute trades, and track performance with precision.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Shield className="w-8 h-8 text-emerald-400" />,
                title: "Secure Execution",
                desc: "Enterprise-ready infrastructure designed for high-value treasury operations."
              },
              {
                icon: <Zap className="w-8 h-8 text-amber-400" />,
                title: "High Performance",
                desc: "Low-latency matching engine capable of handling complex institutional orders."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
                title: "Deep Analytics",
                desc: "Real-time PnL tracking and exposure analysis for data-driven decisions."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-[#151926] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="bg-slate-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- FEATURES SCROLL --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Professional Guide.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Simplified Interface.
                </span>
              </h2>
              <ul className="space-y-6">
                {[
                  "Institutional Order Management",
                  "Advanced Futures & Leverage",
                  "Real-time Portfolio Composition",
                  "Automated Treasury Flows"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-tr from-purple-900/20 to-blue-900/20 border border-white/10 rounded-2xl p-8 min-h-[400px] flex items-center justify-center relative"
            >
              <Lock className="text-white/20 w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="text-center z-10">
                <p className="text-2xl font-bold text-white mb-2 font-metal">DAO TREASURY</p>
                <p className="text-slate-400 font-mono">Secure Environment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* --- CTA FOOTER --- */}
      <section className="py-32 relative text-center">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 font-metal">
              JOIN THE BETA
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Initialize your treasury workspace with demo liquidity and start trading.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartSimulation}
              className="px-10 py-5 bg-white text-black rounded-lg font-bold text-xl shadow-xl hover:shadow-2xl hover:shadow-white/25 transition-all"
            >
              Launch Dashboard
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-24 text-slate-600 text-sm font-mono">
          © 2026 CRYPTIC. ALL RIGHTS RESERVED.
        </div>
      </section>
    </div>
  )
}
