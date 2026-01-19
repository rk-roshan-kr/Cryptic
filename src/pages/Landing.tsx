import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDashboardStore } from '../store/dashboardStore'
import { ArrowRight, BarChart3, Shield, Zap, Wallet, TrendingUp, Lock, Sparkles, Users, Globe, CheckCircle2, Activity, Layers } from 'lucide-react'

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
  transition: { staggerChildren: 0.15 }
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
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-48 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" style={{ clipPath: 'inset(0)' }}>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px]" />
        </div>

        {/* Floating Icons Background - ENHANCED */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { Icon: Zap, color: 'text-yellow-400/50', glow: 'drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]', size: 56, top: '18%', left: '12%', delay: 0 },
            { Icon: Shield, color: 'text-emerald-400/50', glow: 'drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]', size: 72, top: '12%', right: '18%', delay: 0.8 },
            { Icon: TrendingUp, color: 'text-blue-400/50', glow: 'drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]', size: 64, bottom: '22%', left: '8%', delay: 1.5 },
            { Icon: Lock, color: 'text-purple-400/50', glow: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]', size: 48, bottom: '28%', right: '12%', delay: 0.3 },
            { Icon: BarChart3, color: 'text-pink-400/50', glow: 'drop-shadow-[0_0_15px_rgba(244,114,182,0.3)]', size: 80, top: '38%', right: '6%', delay: 1.2 },
            { Icon: Wallet, color: 'text-cyan-400/50', glow: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]', size: 60, top: '55%', left: '82%', delay: 2 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`absolute ${item.color} ${item.glow}`}
              style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 8, -8, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              }}
            >
              <item.Icon size={item.size} strokeWidth={1.5} />
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
              className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm text-xs font-mono mb-8 text-purple-300 shadow-lg shadow-purple-900/20"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              v1.0 MVP · EARLY ACCESS
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black font-metal tracking-tight text-white mb-8 drop-shadow-2xl">
              CRYPTIC
            </h1>

            <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              The next generation of DAO treasury management. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold">
                Live on Beta.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartSimulation}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white font-bold text-xl shadow-2xl shadow-purple-900/40 hover:shadow-purple-700/60 transition-all flex items-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Wallet size={24} className="relative z-10" />
                <span className="relative z-10">Initialize Wallet</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>
            </div>
          </motion.div>

          {/* Dashboard Preview - ENHANCED */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-6xl rounded-2xl border border-white/20 shadow-2xl shadow-blue-900/30 bg-gradient-to-br from-[#1a1e2e] to-[#151926] p-4 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-xl flex items-center justify-center relative overflow-hidden group">
              {/* Animated Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Glowing Scanner Lines */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating Mini Charts */}
              <div className="absolute top-8 left-8 opacity-30">
                <div className="flex gap-1 items-end h-12">
                  {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                      style={{ height: `${h}%` }}
                      animate={{ height: [`${h}%`, `${h * 0.8}%`, `${h}%`] }}
                      transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center relative z-10 transition-transform group-hover:scale-110 duration-500">
                <BarChart3 size={80} className="mx-auto text-blue-500/60 mb-6" strokeWidth={1.5} />
                <span className="text-slate-400 font-mono text-base tracking-widest uppercase">Active Trading Dashboard</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* --- HOW IT WORKS --- */}
      <section className="py-32 bg-gradient-to-b from-[#0b0c10] to-[#0a0a0b] relative">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">How It Works</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Get started in three simple steps</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto"
          >
            {[
              { num: '01', icon: <Wallet className="w-12 h-12" />, title: 'Initialize Your Wallet', desc: 'Claim demo funds and set up your treasury workspace in seconds.' },
              { num: '02', icon: <Activity className="w-12 h-12" />, title: 'Execute Trades', desc: 'Use our institutional-grade tools to manage positions across spot and futures markets.' },
              { num: '03', icon: <BarChart3 className="w-12 h-12" />, title: 'Track Performance', desc: 'Monitor PnL, analyze exposure, and optimize your treasury strategy in real-time.' }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative">
                <div className="text-8xl font-black text-slate-800/30 absolute -top-8 -left-4 font-metal">{step.num}</div>
                <div className="relative bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
                  <div className="text-purple-400 mb-6">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- BUILT FOR DAOS --- */}
      <section className="py-32 bg-[#0a0a0b] relative">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Built for DAOs</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
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
                className="p-10 rounded-3xl bg-[#151926] border border-white/5 hover:border-purple-500/20 transition-all group"
              >
                <div className="bg-slate-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-800 transition-colors group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- USE CASES --- */}
      <section className="py-32 bg-gradient-to-b from-[#0a0a0b] to-[#0b0c10] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.05),transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Who Uses Cryptic?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Trusted by forward-thinking DAOs and treasury managers</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {[
              { icon: <Users className="w-8 h-8" />, title: 'Protocol DAOs', desc: 'Manage native token liquidity and treasury diversification strategies.' },
              { icon: <Globe className="w-8 h-8" />, title: 'Investment DAOs', desc: 'Execute multi-sig trading strategies with real-time position tracking.' },
              { icon: <Layers className="w-8 h-8" />, title: 'DeFi Protocols', desc: 'Monitor treasury health and optimize capital efficiency across markets.' },
              { icon: <Sparkles className="w-8 h-8" />, title: 'Treasury Managers', desc: 'Practice advanced strategies risk-free before deploying real capital.' },
            ].map((useCase, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex gap-6 p-8 rounded-2xl bg-slate-900/30 border border-white/5 hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20">
                  {useCase.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-slate-400">{useCase.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- STATS SECTION --- */}
      <section className="py-32 bg-[#0b0c10] relative">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {[
              { value: '24/7', label: 'Market Access' },
              { value: '<10ms', label: 'Order Latency' },
              { value: '100+', label: 'Trading Pairs' },
              { value: '∞', label: 'Demo Capital' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/5"
              >
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 font-metal">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- TRUST & SECURITY --- */}
      <section className="py-32 bg-gradient-to-b from-[#0b0c10] to-[#0a0a0b] relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono mb-6">
                <Shield size={16} />
                Enterprise Security
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Built on Trust</h2>
              <p className="text-xl text-slate-300">Your security is our priority. Every feature is designed with institutional-grade standards.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                { icon: <Lock />, title: 'End-to-End Encryption', desc: 'All data encrypted at rest and in transit' },
                { icon: <Shield />, title: 'Secure Infrastructure', desc: 'Enterprise-grade cloud architecture' },
                { icon: <CheckCircle2 />, title: 'Regular Audits', desc: 'Continuous security assessments' },
                { icon: <Activity />, title: 'Real-Time Monitoring', desc: '24/7 system health tracking' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-6 rounded-xl bg-slate-900/30 border border-white/5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* --- CTA FOOTER --- */}
      <section className="py-40 relative text-center bg-gradient-to-b from-[#0a0a0b] to-[#0b0c10]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 font-metal tracking-wider">
              JOIN THE BETA
            </h2>
            <p className="text-2xl text-slate-300 mb-16 font-light max-w-3xl mx-auto">
              Initialize your treasury workspace with demo liquidity and start trading.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartSimulation}
              className="px-12 py-6 bg-white text-black rounded-xl font-bold text-2xl shadow-2xl hover:shadow-white/30 transition-all"
            >
              Launch Dashboard
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-32 text-slate-600 text-base font-mono uppercase tracking-widest">
          © 2026 Cryptic. All Rights Reserved.
        </div>
      </section>
    </div>
  )
}
