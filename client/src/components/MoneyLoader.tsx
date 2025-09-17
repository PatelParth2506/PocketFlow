import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react'; // Using DollarSign as a money-related icon
import { cn } from '@/lib/utils';

export default function MoneyLoader() {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { y: '0%' },
    animate: {
      y: ['0%', '-50%', '0%'],
      transition: {
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex space-x-2"
      >
        <motion.div variants={itemVariants}>
          <DollarSign className="h-8 w-8 text-primary" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DollarSign className="h-8 w-8 text-primary" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <DollarSign className="h-8 w-8 text-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
}
