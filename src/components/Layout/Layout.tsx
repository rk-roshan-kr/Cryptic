import { ReactNode, useState, useEffect } from 'react'
import { Box, Drawer, Typography, IconButton, CssBaseline, useMediaQuery, useTheme } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import PieChartIcon from '@mui/icons-material/PieChart'
import SettingsIcon from '@mui/icons-material/Settings'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ScienceIcon from '@mui/icons-material/Science'
import PersonIcon from '@mui/icons-material/Person'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUIStore } from '../../state/uiStore'

import ShowChartIcon from '@mui/icons-material/ShowChart'

const drawerWidth = 200
const collapsedDrawerWidth = 64

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { showGradients, enableAnimations } = useUIStore()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Auto-collapse sidebar when on investment-related routes
  useEffect(() => {
    const isInvestmentRoute = location.pathname.includes('/app/investment') ||
      location.pathname.includes('/app/crypto-fund') ||
      location.pathname.includes('/app/portfolio') ||
      location.pathname.includes('/app/wallets')

    if (isInvestmentRoute) {
      setCollapsed(true)
    }
  }, [location.pathname])

  const navItems = [
    { to: '/app/overview', icon: <DashboardIcon sx={{ color: 'primary.main' }} />, label: 'Overview' },
    { to: '/app/wallets', icon: <AccountBalanceWalletIcon sx={{ color: 'primary.main' }} />, label: 'Wallets' },
    { to: '/app/portfolio', icon: <PieChartIcon sx={{ color: 'primary.main' }} />, label: 'Portfolio' },
    { to: '/app/investment', icon: <TrendingUpIcon sx={{ color: 'primary.main' }} />, label: 'Invest' },
    { to: '/app/investment-portfolio', icon: <ShowChartIcon sx={{ color: 'primary.main' }} />, label: 'Active Invs.' },
    { to: '/app/crypto-test', icon: <ScienceIcon sx={{ color: 'primary.main' }} />, label: 'Crypto Test' },
  ] as const

  const drawer = (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#13141b] to-[#0b0c10] backdrop-blur-md transition-colors border-r border-white/5">
      <div className={`px-6 py-6 transition-all duration-300 ${collapsed ? 'px-2' : ''}`}>
        {!collapsed && (
          <>
            <Typography variant="h6" className="text-[var(--accent)] font-bold">CRYPTIC</Typography>
            <Typography variant="body2" className="text-slate-300">Tagline bata do bhai!</Typography>
          </>
        )}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            color: 'white',
            position: 'absolute',
            right: collapsed ? 8 : 16,
            top: 16,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <nav className={`p-4 space-y-2 flex-1 transition-all duration-300 ${collapsed ? 'px-2' : ''}`}>
        {navItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${isActive ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'hover:bg-[#121214] text-slate-300'}`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          </motion.div>
        ))}
      </nav>
      <div className={`p-4 transition-all duration-300 border-t border-white/5 flex items-center ${collapsed ? 'flex-col gap-4 justify-center' : 'justify-between'}`}>
        <div className={`flex items-center ${collapsed ? 'flex-col gap-4' : 'gap-3'}`}>
          <NavLink to="/app/settings" className="text-slate-400 hover:text-white transition-colors" title="Settings">
            <SettingsIcon sx={{ fontSize: 20 }} />
          </NavLink>
          <IconButton size="small" sx={{ color: 'rgb(148, 163, 184)', '&:hover': { color: 'white' }, p: 0 }} title="Profile">
            <PersonIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </div>
        {!collapsed && <div className="text-[10px] text-slate-500 font-mono tracking-widest">v0.1</div>}
      </div>
    </div>
  )

  const currentDrawerWidth = collapsed ? collapsedDrawerWidth : drawerWidth
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', height: '100vh' }} className={`${showGradients ? 'theme-gradients' : ''} ${!enableAnimations ? 'disable-animations' : ''}`}>
      <CssBaseline />
      {isMobile ? (
        <Box
          component="nav"
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.appBar + 10,
            height: '80px',
            backgroundColor: 'rgba(15, 15, 16, 0.9)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            px: 2,
            pb: 'max(8px, env(safe-area-inset-bottom))'
          }}
        >
          {navItems.filter(i => i.label !== 'Crypto Test').map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-[var(--accent)]' : 'text-slate-400 hover:text-white'}`}
            >
              <div className="bg-transparent p-1 rounded-full">
                {React.cloneElement(item.icon, { sx: { fontSize: 22, color: 'inherit' } })}
              </div>
              <span className="text-[10px] font-medium tracking-wide">
                {item.label === 'Overview' ? 'Home' : item.label}
              </span>
            </NavLink>
          ))}
        </Box>
      ) : (
        <Box component="nav" sx={{ width: { sm: currentDrawerWidth }, flexShrink: { sm: 0 }, position: 'fixed', height: '100vh', zIndex: (theme) => theme.zIndex.appBar - 1 }} aria-label="mailbox folders">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: 'none',
                backgroundColor: 'transparent',
                backgroundImage: 'none'
              },
              '& .MuiBackdrop-root': { backgroundColor: 'transparent' }
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-sizing',
                width: currentDrawerWidth,
                borderRight: 'none',
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                transition: 'width 0.3s ease'
              }
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          minWidth: 0,
          ml: { sm: isMobile ? 0 : `${currentDrawerWidth}px` },
          transition: 'margin-left 0.3s ease',
          pb: isMobile ? '120px' : '0',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
}
