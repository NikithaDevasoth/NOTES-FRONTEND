import { motion } from "framer-motion";

const AnimatedFooterText = () => {
  return (
    <div className="overflow-hidden">
      <motion.p
        className="text-2xl md:text-3xl font-extrabold 
        bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 
        bg-clip-text text-transparent tracking-wide whitespace-nowrap"
        animate={{ x: ["0%", "100%"] }}   // starts immediately at left
        transition={{
          repeat: Infinity,               // loop forever
          repeatType: "loop",
          duration: 12,                   // slower, smooth speed
          ease: "linear",
        }}
      >
        ✨ Nikitha&apos;s Note Taking App ✨
      </motion.p>
    </div>
  );
};

export default AnimatedFooterText;
