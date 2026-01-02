import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, 
  Home, Layers, Zap, Image as ImageIcon, Book, Youtube, FileText, 
  LayoutGrid, DollarSign, LifeBuoy, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import Button from './Button';

// --- Types ---
interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  children?: MenuItem[];
  isMega?: boolean; // For grid layout dropdowns
  color?: string;       // Text color class for active state
  shadowColor?: string; // Background/Border class for the active pill (repurposed from shadowColor)
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
      { id: 'all', label: 'همه سرویس‌ها', path: '/services', icon: LayoutGrid },
      ...SERVICES.map(s => ({
        id: s.id,
        label: s.title,
        path: s.path,
        icon: s.icon
      }))
    ]
  },
  { 
    id: 'solutions', 
    label: 'راهکارها', 
    path: '/#solutions', 
    icon: Zap,
    color: 'text-luma-yellow',
    shadowColor: 'bg-luma-yellow/10 border-luma-yellow/20'
  },
  { 
    id: 'gallery', 
    label: 'گالری', 
    path: '/#gallery', 
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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper: Check if an item (or its children) is active
  const isActive = (item: MenuItem) => {
    if (item.path === '/' && location.pathname === '/') return true;
    if (item.path !== '/' && item.path.startsWith('/') && !item.path.includes('#') && location.pathname.startsWith(item.path)) return true;
    
    // Check children for active state (e.g. /service/img-gen should highlight Services)
    if (item.children) {
      return item.children.some(child => {
         // Handle hash links by checking if we are on home + matching hash (simplified logic)
         if (child.path.includes('/service/')) {
            return location.pathname.startsWith(child.path);
         }
         return location.pathname === child.path;
      });
    }
    return false;
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(2); // Remove '/#'
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

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled || isOpen 
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/5 shadow-2xl' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2 group" 
            onClick={() => handleLinkClick('/#')}
          >
            <img 
              src="https://lumai.ir/logo-en.svg" 
              alt="Luma AI" 
              className="h-8 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" 
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
                    className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 z-10 hover:bg-white/5"
                  >
                    {/* Active Floating Pill Background */}
                    {active && (
                      <motion.div
                        layoutId="navbar-pill"
                        className={`absolute inset-0 border rounded-lg transition-all duration-500 ${item.shadowColor}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Content */}
                    <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-300 ${active ? item.color : 'text-gray-400 group-hover:text-gray-200'}`}>
                      <item.icon size={16} />
                      {item.label}
                      {item.children && (
                        <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredItem === item.id ? 'rotate-180' : ''}`} />
                      )}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hoveredItem === item.id && item.children && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(8px)" }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className={`
                          absolute top-full right-0 mt-2 p-2 rounded-2xl 
                          bg-[#0a0a0a] 
                          border border-white/10 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.8)] 
                          overflow-hidden ring-1 ring-white/5 z-50
                          ${item.isMega ? 'w-[600px] grid grid-cols-2 gap-2' : 'w-64 flex flex-col gap-1'}
                        `}
                      >
                          {item.children.map((child, idx) => (
                             <div key={child.id} onClick={() => handleLinkClick(child.path)} className="cursor-pointer">
                               <div className={`
                                  flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group/item relative overflow-hidden
                                  ${location.pathname === child.path ? 'bg-white/10' : 'hover:bg-white/5'}
                               `}>
                                  {/* Icon Box */}
                                  <div className={`
                                    w-10 h-10 rounded-lg flex items-center justify-center transition-colors border border-white/5
                                    ${location.pathname === child.path ? 'bg-luma-pink text-black' : 'bg-white/5 text-gray-400 group-hover/item:text-white group-hover/item:border-white/20'}
                                  `}>
                                     <child.icon size={20} />
                                  </div>
                                  
                                  <div className="flex flex-col">
                                     <span className={`text-sm font-bold transition-colors ${location.pathname === child.path ? 'text-white' : 'text-gray-300 group-hover/item:text-white'}`}>
                                        {child.label}
                                     </span>
                                  </div>
                                  
                                  {location.pathname === child.path && (
                                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-luma-pink rounded-l-full" />
                                  )}
                               </div>
                             </div>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          
          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
             <a 
               href="https://lumai.ir/dashboard" 
               className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
             >
               ورود
             </a>
             <Button
               externalHref="https://lumai.ir/dashboard"
               variant="primary"
               className="px-6 py-2.5 text-sm shadow-lg shadow-luma-purple/20 hover:shadow-luma-purple/40"
             >
               شروع کنید
             </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#0a0a0a] fixed inset-0 top-20 z-40 overflow-y-auto border-t border-white/10"
          >
            <div className="px-4 pt-6 pb-20 space-y-2">
              {MENU_STRUCTURE.map((item, idx) => (
                <div key={item.id} className="border-b border-white/5 last:border-0 pb-2">
                   {/* Parent Item */}
                   <div 
                      className="flex items-center justify-between p-3 rounded-xl active:bg-white/5"
                      onClick={() => {
                        if (item.children) {
                           setMobileExpanded(mobileExpanded === item.id ? null : item.id);
                        } else {
                           handleLinkClick(item.path);
                        }
                      }}
                   >
                      <div className={`flex items-center gap-3 ${isActive(item) ? 'text-luma-pink' : 'text-gray-200'}`}>
                         <item.icon size={20} />
                         <span className="font-bold text-lg">{item.label}</span>
                      </div>
                      {item.children && (
                         <ChevronDown 
                            size={18} 
                            className={`text-gray-500 transition-transform duration-300 ${mobileExpanded === item.id ? 'rotate-180' : ''}`} 
                         />
                      )}
                   </div>

                   {/* Mobile Submenu */}
                   <AnimatePresence>
                      {item.children && mobileExpanded === item.id && (
                         <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white/5 rounded-xl mx-2"
                         >
                            <div className="p-2 space-y-1">
                               {item.children.map((child) => (
                                  <button
                                     key={child.id}
                                     onClick={() => handleLinkClick(child.path)}
                                     className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-right transition-colors"
                                  >
                                     <div className="w-1 h-1 bg-gray-600 rounded-full" />
                                     <span className="text-sm">{child.label}</span>
                                     {child.path.includes('#') ? null : <ChevronRight size={14} className="mr-auto opacity-50 rotate-180" />}
                                  </button>
                               ))}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))}

              <div className="pt-8 space-y-4 px-2">
                 <Button
                   externalHref="https://lumai.ir/dashboard"
                   variant="secondary"
                   className="w-full justify-center"
                 >
                   ورود به حساب
                 </Button>
                 <Button
                   externalHref="https://lumai.ir/dashboard"
                   variant="primary"
                   className="w-full justify-center"
                 >
                   ثبت نام رایگان
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;