import { useMemo } from 'react';
import { motion } from 'framer-motion';

const prompts = {
  morning: {
    title: 'प्रातःकाले',
    text: 'प्रातःकाले चित्तशुद्धिः।\nश्वासे मनः स्थापय।',
  },
  midday: {
    title: 'मध्याह्ने',
    text: 'कर्मणि योगं पश्य।\nफलेषु मा स्पृश।',
  },
  evening: {
    title: 'सायंकाले',
    text: 'दिनस्य वृत्तीन् अवलोकय।\nसाक्षी भूत्वा विश्रामं कुरु।',
  },
  night: {
    title: 'रात्रौ',
    text: 'अद्य किं ज्ञातम्,\nतत् हृदि निधाय सुप्तिं गच्छ।',
  },
};

type TimeOfDay = 'morning' | 'midday' | 'evening' | 'night';

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'midday';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

export function SadhanaPrompts() {
  const timeOfDay = useMemo(() => getTimeOfDay(), []);
  const currentPrompt = prompts[timeOfDay];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="text-center py-6 px-4"
    >
      <span className="text-xs tracking-widest text-sandalwood uppercase mb-4 block">
        {currentPrompt.title}
      </span>
      <p className="font-sanskrit text-lg text-earth leading-relaxed whitespace-pre-line max-w-xs mx-auto">
        {currentPrompt.text}
      </p>
    </motion.div>
  );
}
