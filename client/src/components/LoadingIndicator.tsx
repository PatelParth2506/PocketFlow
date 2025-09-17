import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LoadingIndicator() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: isLoading ? '100%' : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed top-0 left-0 h-1 bg-primary z-50',
        isLoading ? 'block' : 'hidden'
      )}
    />
  );
}
