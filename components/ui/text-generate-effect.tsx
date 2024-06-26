'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/utils/cn';

export const TextGenerateEffect = ({
  words,
  className,
  textClassName,
  delayTime
}: {
  words: string;
  className?: string;
  textClassName?: string;
  delayTime: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(' ');
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(
        'span',
        {
          opacity: 1
        },
        {
          duration: 2,
          delay: stagger(delayTime)
        }
      );
    }, delayTime * 1000); // 延迟时间以毫秒为单位，所以乘以1000

    return () => clearTimeout(timer); // 清理函数，组件卸载时清除定时器
  }, [scope.current, delayTime, animate]); // 添加 animate 和 delayTime 作为依赖项

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span key={word + idx} className='opacity-0'>
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className='mt-4'>
        <div className={`${textClassName} text-2xl leading-snug tracking-wide`}>{renderWords()}</div>
      </div>
    </div>
  );
};
