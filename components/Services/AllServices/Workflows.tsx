import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../lib/ThemeContext";
import {
  Scissors,
  ImageIcon,
  Maximize2,
  Bot,
  Video,
  Wand2,
} from "lucide-react";
import { StoreWorkflowAnim } from "./animations/StoreWorkflowAnim";
import { ContentWorkflowAnim } from "./animations/ContentWorkflowAnim";

const WorkflowStep = ({
  step,
  index,
  color,
  isLast,
}: {
  step: { icon: any; title: string; desc: string };
  index: number;
  color: string;
  isLast?: boolean;
}) => (
  <div
    className="relative flex gap-6 group"
    style={{ "--hover-color": color } as React.CSSProperties}
  >
    {/* Timeline Line */}
    {!isLast && (
      <div className="absolute top-10 right-[23px] bottom-[-24px] w-0.5 bg-zinc-200 dark:bg-white/5 overflow-hidden">
        <motion.div
          initial={{ height: "0%" }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.5 + index * 0.3,
            ease: "easeInOut",
          }}
          className="w-full bg-gradient-to-b"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`,
          }}
        />
      </div>
    )}

    {/* Icon */}
    <div className="relative z-10 shrink-0">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2 + index * 0.2,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-zinc-350 dark:group-hover:border-white/20 transition-all shadow-lg"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ backgroundColor: color }}
        />
        <step.icon
          size={20}
          className="relative z-10 text-zinc-500 dark:text-gray-400 group-hover:text-zinc-850 dark:group-hover:text-white transition-colors"
        />
      </motion.div>
    </div>

    {/* Text */}
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.2 }}
      className="pb-10 pt-1"
    >
      <h4 className="text-zinc-850 dark:text-white font-bold text-base mb-1.5 transition-colors duration-300 group-hover:text-[var(--hover-color)]">
        {step.title}
      </h4>
      <p className="text-sm text-zinc-500 dark:text-gray-500 font-medium leading-relaxed max-w-xs group-hover:text-zinc-700 dark:group-hover:text-gray-400 transition-colors">
        {step.desc}
      </p>
    </motion.div>
  </div>
);

export const Workflows: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#050505] border-t border-zinc-150 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      {/* Center Line Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-200 dark:via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-[#111] text-xs font-bold text-zinc-650 dark:text-gray-300 mb-6"
          >
            قدرت ترکیب
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-6 transition-colors">
            جریان‌های کاری هوشمند
          </h2>
          <p className="text-zinc-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed transition-colors">
            سرویس‌های لوما وقتی با هم ترکیب می‌شوند، قدرتی چند برابر پیدا
            می‌کنند.
            <br className="hidden md:block" />
            اینجا چند نمونه از نحوه استفاده حرفه‌ای‌ها را ببینید.
          </p>
        </div>

        <div className="space-y-32">
          {/* Workflow 1: Store */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative perspective-1000 group">
              {/* Image Container */}
              <div className="absolute inset-0 bg-luma-pink/10 blur-[120px] rounded-full opacity-60" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-2xl z-10 bg-[#060606] dark:bg-[#0a0a0a] h-[380px] sm:h-auto sm:aspect-[4/3] transition-all duration-300"
              >
                <StoreWorkflowAnim />
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
                  فروشگاه خود را{" "}
                  <span className="text-luma-pink">متحول کنید</span>
                </h3>
                <p className="text-zinc-500 dark:text-gray-400 text-lg mb-12 leading-loose border-r-2 border-zinc-200 dark:border-white/10 pr-6 transition-colors duration-300">
                  از عکس‌های ساده محصول، تصاویر تبلیغاتی خیره‌کننده بسازید. بدون
                  نیاز به استودیو، نورپردازی یا مدل واقعی، فروش خود را چند برابر
                  کنید.
                </p>
              </motion.div>

              <div className="space-y-2">
                <WorkflowStep
                  index={0}
                  color="#FF6482"
                  step={{
                    icon: Scissors,
                    title: "حذف خودکار پس‌زمینه",
                    desc: "جداسازی محصول از پس‌زمینه با دقت مو.",
                  }}
                />
                <WorkflowStep
                  index={1}
                  color="#FF6482"
                  step={{
                    icon: ImageIcon,
                    title: "تولید محیط استودیویی",
                    desc: "قرار دادن محصول در دکورهای حرفه‌ای و متنوع.",
                  }}
                />
                <WorkflowStep
                  index={2}
                  color="#FF6482"
                  isLast
                  step={{
                    icon: Maximize2,
                    title: "افزایش کیفیت تا 4K",
                    desc: "خروجی نهایی با جزئیات خیره‌کننده برای چاپ.",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Workflow 2: Content Creation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
                  تولید محتوا با{" "}
                  <span className="text-luma-purple">سرعت نور</span>
                </h3>
                <p className="text-zinc-500 dark:text-gray-400 text-lg mb-12 leading-loose border-r-2 border-zinc-200 dark:border-white/10 pr-6 transition-colors duration-300">
                  ایده‌های خود را در چند دقیقه به ویدیوهای جذاب تبدیل کنید.
                  مناسب برای اینستاگرام، یوتیوب و تیک‌تاک با کیفیت سینمایی.
                </p>
              </motion.div>

              <div className="space-y-2">
                <WorkflowStep
                  index={0}
                  color="#DA8FFF"
                  step={{
                    icon: Bot,
                    title: "سناریو نویسی هوشمند",
                    desc: "تولید ایده‌های خلاقانه و متن ویدیو.",
                  }}
                />
                <WorkflowStep
                  index={1}
                  color="#DA8FFF"
                  step={{
                    icon: Video,
                    title: "تبدیل متن به ویدیو",
                    desc: "خلق سکانس‌های سینمایی از روی متن.",
                  }}
                />
                <WorkflowStep
                  index={2}
                  color="#DA8FFF"
                  isLast
                  step={{
                    icon: Wand2,
                    title: "اصلاح رنگ و نور",
                    desc: "تنظیمات حرفه‌ای برای ظاهر سینمایی.",
                  }}
                />
              </div>
            </div>

            <div className="order-2 relative perspective-1000 group">
              <div className="absolute inset-0 bg-luma-purple/10 blur-[120px] rounded-full opacity-60" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-2xl z-10 bg-[#060606] dark:bg-[#0a0a0a] h-[380px] sm:h-auto sm:aspect-[4/3] transition-all duration-300"
              >
                <ContentWorkflowAnim />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
