
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, 
  Home, Layers, Zap, Image as ImageIcon, Book, Youtube, FileText, 
  DollarSign, LifeBuoy, ArrowRight, Sun, Moon, BadgeCheck
} from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import Button from './Button';

// Bypass type issues with framer-motion props in current environment
const Motion = motion as any;

// --- Types ---
interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  children?: MenuItem[];
  isMega?: boolean; // For grid layout dropdowns (Desktop only)
  color?: string;       // Text color class for active state
  shadowColor?: string; // Background/Border class for the active pill
  badge?: string;
}

// --- Menu Data Configuration ---
const MENU_STRUCTURE: MenuItem[] = [
  { 
    id: 'home', 
    label: 'خانه', 
    path: '/', 
    icon: Home,
    color: 'text-luma-pink',
    shadowColor: 'bg-luma-pink/10 border-luma-pink/20'
  },
  { 
    id: 'services', 
    label: 'سرویس‌ها', 
    path: '/#services', 
    icon: Layers,
    isMega: true,
    color: 'text-luma-purple',
    shadowColor: 'bg-luma-purple/10 border-luma-purple/20',
    children: [
      ...SERVICES.map(s => ({
        id: s.id,
        label: s.title,
        path: s.path,
        icon: s.icon,
        badge: s.badge
      }))
    ]
  },
  { 
    id: 'solutions', 
    label: 'راهکارها', 
    path: '/solutions', 
    icon: Zap,
    color: 'text-luma-yellow',
    shadowColor: 'bg-luma-yellow/10 border-luma-yellow/20'
  },
  { 
    id: 'gallery', 
    label: 'گالری', 
    path: '/gallery', 
    icon: ImageIcon,
    color: 'text-luma-pink',
    shadowColor: 'bg-luma-pink/10 border-luma-pink/20'
  },
  { 
    id: 'pricing', 
    label: 'تعرفه ها', 
    path: '/pricing', 
    icon: DollarSign,
    color: 'text-luma-yellow',
    shadowColor: 'bg-luma-yellow/10 border-luma-yellow/20'
  },
  { 
    id: 'subscription', 
    label: 'پلن‌های اشتراک', 
    path: '/subscription', 
    icon: BadgeCheck, 
    color: 'text-luma-purple', 
    shadowColor: 'bg-luma-purple/10 border-luma-purple/20' 
  },
  { 
    id: 'help', 
    label: 'آموزش و پشتیبانی', 
    path: '#', 
    icon: LifeBuoy,
    color: 'text-luma-purple',
    shadowColor: 'bg-luma-purple/10 border-luma-purple/20',
    children: [
      { id: 'docs', label: 'مستندات فنی', path: '/docs', icon: FileText },
      { id: 'tutorials', label: 'مرکز آموزش', path: '/tutorials', icon: Youtube },
      { id: 'blog', label: 'وبلاگ', path: '/blog', icon: Book },
    ]
  },
];

// --- Mobile Nav Item Component (Redesigned) ---
const MobileNavItem = ({ item, isActive, handleLinkClick, variants }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { theme } = useTheme();
    
    return (
        <Motion.div variants={variants} className="overflow-hidden mb-2">
            <div 
                onClick={() => item.children ? setIsExpanded(!isExpanded) : handleLinkClick(item.path)}
                className={`
                    flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-200 select-none border
                    ${isActive 
                        ? 'bg-black/5 dark:bg-white/10 border-black/5 dark:border-white/10 text-zinc-900 dark:text-white' 
                        : 'border-transparent hover:bg-black/[0.02] dark:hover:bg-white/5 text-zinc-600 dark:text-gray-300'
                    }
                `}
            >
                <div className="flex items-center gap-4">
                    <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                        ${isActive ? item.color + ' bg-black/5 dark:bg-white/10' : 'text-zinc-400 dark:text-gray-500 bg-black/[0.02] dark:bg-white/5'}
                    `}>
                        <item.icon size={20} />
                    </div>
                    <span className={`text-base font-bold ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-gray-200'}`}>{item.label}</span>
                </div>
                {item.children && (
                    <ChevronDown size={18} className={`text-zinc-400 dark:text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-zinc-900 dark:text-white' : ''}`} />
                )}
            </div>
            
            {/* Submenu - Cleaner Block Style */}
            <AnimatePresence>
                {isExpanded && item.children && (
                    <Motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="bg-black/[0.02] dark:bg-white/[0.03] rounded-2xl mt-2 py-2 mx-2 border border-black/5 dark:border-white/5">
                            {item.children.map((child: any) => (
                                <div 
                                    key={child.id}
                                    onClick={() => handleLinkClick(child.path)}
                                    className="flex items-center gap-3 py-3 px-4 mx-2 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors cursor-pointer group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-luma-pink transition-colors" />
                                    <span className="text-sm text-zinc-600 dark:text-gray-400 group-hover:text-zinc-900 group-hover:dark:text-white transition-colors font-medium flex-1 flex items-center gap-1.5">
                                      <span>{child.label}</span>
                                      {child.badge && (
                                        <span className="px-1.5 py-0.5 rounded-full bg-luma-purple text-black text-[8px] font-black leading-none animate-pulse">
                                          {child.badge}
                                        </span>
                                      )}
                                    </span>
                                    <ArrowRight size={14} className="text-zinc-400 dark:text-gray-600 group-hover:text-zinc-900 group-hover:dark:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all rotate-180" />
                                </div>
                            ))}
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </Motion.div>
    )
}

// --- Main Navbar Component ---
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (item: MenuItem) => {
    if (item.path === '/' && location.pathname === '/') return true;
    if (item.path !== '/' && item.path.startsWith('/') && !item.path.includes('#') && location.pathname.startsWith(item.path)) return true;
    if (item.children) {
      return item.children.some(child => {
         if (child.path.includes('/service/')) return location.pathname.startsWith(child.path);
         return location.pathname === child.path;
      });
    }
    return false;
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path !== '#') {
       navigate(path);
       window.scrollTo(0,0);
    }
  };

  // Mobile Menu Variants - Full Screen Slide
  const containerVariants = {
    closed: { 
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: { 
      y: "0%",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" } 
    }
  };
  
  const listVariants = {
    closed: { opacity: 0 },
    open: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-black/5 dark:border-white/5 shadow-md dark:shadow-2xl' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo (Visible on Navbar) */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-2 group relative z-50" 
              onClick={() => handleLinkClick('/#')}
            >
              <img 
                src="https://lumai.ir/logo-en.svg" 
                alt="لوما" 
                className="h-8 w-auto opacity-90 dark:brightness-0 dark:invert group-hover:opacity-100 transition-all duration-300" 
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 space-x-reverse relative">
              {MENU_STRUCTURE.map((item) => {
                const active = isActive(item);
                return (
                  <div 
                    key={item.id}
                    className="relative px-2 py-4 group"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => !item.children && handleLinkClick(item.path)}
                      className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      {active && (
                        <Motion.div
                          layoutId="navbar-pill"
                          className={`absolute inset-0 border rounded-lg transition-all duration-500 ${item.shadowColor}`}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-300 ${active ? item.color : 'text-zinc-600 dark:text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-gray-200'}`}>
                        <item.icon size={16} />
                        {item.label}
                        {item.children && (
                          <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredItem === item.id ? 'rotate-180' : ''}`} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence>
                      {hoveredItem === item.id && item.children && (
                        <Motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(12px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(8px)" }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className={`
                            absolute top-full right-0 mt-2 p-2 rounded-2xl 
                            bg-white dark:bg-[#0a0a0a] 
                            border border-black/5 dark:border-white/10 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.8)] 
                            overflow-hidden ring-1 ring-black/5 dark:ring-white/5 z-50
                            ${item.isMega ? 'w-[600px] grid grid-cols-2 gap-2' : 'w-64 flex flex-col gap-1'}
                          `}
                        >
                            {item.children.map((child) => (
                              <div key={child.id} onClick={() => handleLinkClick(child.path)} className="cursor-pointer">
                                <div className={`
                                    flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group/item relative overflow-hidden
                                    ${location.pathname === child.path ? 'bg-black/5 dark:bg-white/10' : 'hover:bg-black/[0.02] dark:hover:bg-white/5'}
                                `}>
                                    <div className={`
                                      w-10 h-10 rounded-lg flex items-center justify-center transition-colors border border-black/5 dark:border-white/5
                                      ${location.pathname === child.path ? 'bg-luma-pink text-white' : 'bg-black/5 dark:bg-white/5 text-zinc-500 dark:text-gray-400 group-hover/item:text-zinc-900 group-hover/item:dark:text-white group-hover/item:border-black/10 group-hover/item:dark:border-white/20'}
                                    `}>
                                      <child.icon size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-1.5">
                                        <span className={`text-sm font-bold transition-colors ${location.pathname === child.path ? 'text-zinc-950 dark:text-white' : 'text-zinc-600 dark:text-gray-300 group-hover/item:text-zinc-950 group-hover/item:dark:text-white'}`}>
                                            {child.label}
                                        </span>
                                        {child.badge && (
                                          <span className="px-1.5 py-0.5 rounded-full bg-luma-purple text-black text-[9px] font-black leading-none animate-pulse shrink-0">
                                            {child.badge}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {location.pathname === child.path && (
                                      <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-luma-pink rounded-l-full" />
                                    )}
                                  </div>
                              </div>
                            ))}
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            
            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="تغییر پوسته"
                className="relative overflow-hidden w-10 h-10 rounded-full flex items-center justify-center p-0 cursor-pointer bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 transition-colors duration-300 group shadow-sm text-zinc-800 dark:text-zinc-200"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <Motion.div
                      key="sun"
                      initial={{ rotate: -90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Sun size={20} className="text-luma-yellow" />
                    </Motion.div>
                  ) : (
                    <Motion.div
                      key="moon"
                      initial={{ rotate: -90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Moon size={20} className="text-luma-purple" />
                    </Motion.div>
                  )}
                </AnimatePresence>
              </button>

              <a 
                href="https://dash.lumai.ir/" 
                className="text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                ورود
              </a>
              <Button
                externalHref="https://dash.lumai.ir/"
                variant="primary"
                className="px-6 py-2.5 text-sm shadow-lg shadow-luma-purple/20 hover:shadow-luma-purple/40"
              >
                شروع کنید
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex lg:hidden relative z-50">
              {!isOpen && (
                  <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center p-2 rounded-xl text-zinc-600 dark:text-gray-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
                  >
                  <Menu className="h-6 w-6" />
                  </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Panel - Full Screen Overlay - MOVED OUTSIDE NAV */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0a] flex flex-col lg:hidden transition-colors duration-300"
          >
            {/* Fixed Close Button (Top Left for RTL) */}
            <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  aria-label="تغییر پوسته"
                  className="p-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-800 dark:text-white transition-all border border-black/5 dark:border-white/5 shadow-sm"
                >
                  {theme === 'dark' ? <Sun size={18} className="text-luma-yellow" /> : <Moon size={18} className="text-luma-purple" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-800 dark:text-white transition-all border border-black/5 dark:border-white/5 shadow-sm"
                >
                  <X size={20} />
                </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-6 pt-12 pb-12 flex flex-col min-h-full">
                    
                    {/* Logo in Scrollable Area */}
                    <div className="flex justify-center mb-10">
                         <img 
                          src="https://lumai.ir/logo-en.svg" 
                          alt="لوما" 
                          className="h-12 w-auto dark:brightness-0 dark:invert opacity-100 transition-all duration-300" 
                        />
                    </div>

                    <Motion.div variants={listVariants} className="space-y-3 flex-1">
                        {MENU_STRUCTURE.map((item) => (
                            <MobileNavItem 
                                key={item.id} 
                                item={item} 
                                isActive={isActive(item)} 
                                handleLinkClick={handleLinkClick} 
                                variants={itemVariants}
                            />
                        ))}
                    </Motion.div>
                    
                    {/* Actions */}
                    <Motion.div 
                        variants={itemVariants} 
                        className="mt-10 pt-8 border-t border-black/5 dark:border-white/10 grid grid-cols-2 gap-4"
                    >
                        <Button variant="secondary" externalHref="https://dash.lumai.ir/login" className="justify-center h-14 text-base bg-black/[0.02] dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-800 dark:text-white">ورود</Button>
                        <Button variant="primary" externalHref="https://dash.lumai.ir/register" className="justify-center shadow-luma-purple/20 h-14 text-base border-0">ثبت نام</Button>
                    </Motion.div>
                </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
