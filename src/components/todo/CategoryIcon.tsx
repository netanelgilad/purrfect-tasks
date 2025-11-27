import { Category } from '@/types/todo';
import { cn } from '@/lib/utils';
import { Briefcase, User, ShoppingCart, Heart } from 'lucide-react';

interface CategoryIconProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
}

const categoryConfig = {
  work: {
    icon: Briefcase,
    bg: 'bg-category-work/10',
    text: 'text-category-work',
  },
  personal: {
    icon: User,
    bg: 'bg-category-personal/10',
    text: 'text-category-personal',
  },
  shopping: {
    icon: ShoppingCart,
    bg: 'bg-category-shopping/10',
    text: 'text-category-shopping',
  },
  health: {
    icon: Heart,
    bg: 'bg-category-health/10',
    text: 'text-category-health',
  },
};

const sizeConfig = {
  sm: { container: 'w-7 h-7', icon: 'w-3.5 h-3.5' },
  md: { container: 'w-9 h-9', icon: 'w-4 h-4' },
  lg: { container: 'w-11 h-11', icon: 'w-5 h-5' },
};

export function CategoryIcon({ category, size = 'md' }: CategoryIconProps) {
  const config = categoryConfig[category];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-lg flex items-center justify-center transition-task',
        config.bg,
        sizes.container
      )}
    >
      <Icon className={cn(config.text, sizes.icon)} />
    </div>
  );
}
