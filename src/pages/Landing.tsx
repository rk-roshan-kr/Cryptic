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
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
          {[
            { Icon: Zap, color: 'text-yellow-500/30', size: 48, top: '20%', left: '15%', delay: 0 },
            { Icon: Shield, color: 'text-emerald-500/30', size: 64, top: '15%', right: '20%', delay: 1 },
            { Icon: TrendingUp, color: 'text-blue-500/30', size: 56, bottom: '25%', left: '10%', delay: 2 },
            { Icon: Lock, color: 'text-purple-500/30', size: 40, bottom: '30%', right: '15%', delay: 0.5 },
            { Icon: BarChart3, color: 'text-pink-500/30', size: 72, top: '40%', right: '5%', delay: 1.5 },
            { Icon: Wallet, color: 'text-cyan-500/30', size: 50, top: '60%', left: '80%', delay: 2.5 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`absolute ${item.color}`}
              style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              }}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm text-xs font-mono mb-8 text-purple-400 shadow-lg shadow-purple-900/10"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              v1.0 MVP · EARLY ACCESS
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black font-metal tracking-tighter text-white mb-8 drop-shadow-2xl">
              CRYPTIC
            </h1>

            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              The next generation of DAO treasury management. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                Live on Beta.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartSimulation}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-xl shadow-2xl shadow-purple-900/30 hover:shadow-purple-700/50 transition-all flex items-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Wallet size={24} />
                Initialize Wallet
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Dashboard Preview Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-6xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-900/20 bg-[#151926] p-3 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-900 to-black rounded-xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Animated scanner line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 blur-sm animate-[scan_4s_ease-in-out_infinite]" />

              <div className="text-center relative z-10 transition-transform group-hover:scale-110 duration-500">
                <BarChart3 size={80} className="mx-auto text-slate-700 mb-6" />
                <span className="text-slate-500 font-mono text-base tracking-widest uppercase">Active Trading Dashboard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* --- PROBLEM / SOLUTION --- */}
      <section className="py-32 bg-[#0a0a0b] relative">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Built for DAOs</h2>
            <p className="text-slate-400 text-xl leading-relaxed">
              Institutional-grade tooling for decentralized organizations.
              Manage liquidity, execute trades, and track performance with precision.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                icon: <Shield className="w-10 h-10 text-emerald-400" />,
                title: "Secure Execution",
                desc: "Enterprise-ready infrastructure designed for high-value treasury operations."
              },
              {
                icon: <Zap className="w-10 h-10 text-amber-400" />,
                title: "High Performance",
                desc: "Low-latency matching engine capable of handling complex institutional orders."
              },
              {
                icon: <TrendingUp className="w-10 h-10 text-blue-400" />,
                title: "Deep Analytics",
                desc: "Real-time PnL tracking and exposure analysis for data-driven decisions."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-10 rounded-3xl bg-[#151926] border border-white/5 hover:border-white/10 transition-colors group"
              >
                <div className="bg-slate-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-800 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- FEATURES SCROLL --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10">
                Professional Guide.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Simplified Interface.
                </span>
              </h2>
              <ul className="space-y-8">
                {[
                  "Institutional Order Management",
                  "Advanced Futures & Leverage",
                  "Real-time Portfolio Composition",
                  "Automated Treasury Flows"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-xl text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_purple]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-tr from-purple-900/20 to-blue-900/20 border border-white/10 rounded-3xl p-10 min-h-[500px] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]" />
              <Lock className="text-white/20 w-40 h-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              <div className="text-center z-10">
                <p className="text-3xl font-bold text-white mb-3 font-metal tracking-widest">DAO TREASURY</p>
                <p className="text-slate-400 font-mono text-lg">Secure Environment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* --- CTA FOOTER --- */}
      <section className="py-40 relative text-center">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 font-metal tracking-tighter">
              JOIN THE BETA
            </h2>
            <p className="text-2xl text-slate-400 mb-16 font-light">
              Initialize your treasury workspace with demo liquidity and start trading.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartSimulation}
              className="px-12 py-6 bg-white text-black rounded-xl font-bold text-2xl shadow-2xl hover:shadow-white/25 transition-all"
            >
              Launch Dashboard
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-32 text-slate-700 text-sm font-mono uppercase tracking-widest">
          © 2026 Cryptic. All Rights Reserved.
        </div>
      </section>
    </div>
  )
}
