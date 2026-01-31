import { motion } from 'framer-motion';

export function SadhanaDuration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="text-center py-8"
    >
      <p className="font-sanskrit text-sm text-sandalwood-dark leading-relaxed max-w-sm mx-auto">
        एषा साधना षण्मासान् व्याप्नोति।
        <br />
        कालः गुरुर्न भवति। अनुभवः एव।
      </p>
    </motion.div>
  );
}
