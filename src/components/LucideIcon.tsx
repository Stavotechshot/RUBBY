import { 
  Gamepad2, 
  Apple, 
  Coins, 
  CreditCard, 
  ShoppingBag, 
  Store, 
  Tv, 
  MonitorPlay, 
  Coffee, 
  Play,
  Sparkles,
  Zap,
  Shirt,
  Target,
  LucideProps
} from 'lucide-react';

const iconMap = {
  Gamepad2,
  Apple,
  Coins,
  CreditCard,
  ShoppingBag,
  Store,
  Tv,
  MonitorPlay,
  Coffee,
  Play,
  Sparkles,
  Zap,
  Shirt,
  Target
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number | string;
}

export default function LucideIcon({ name, ...props }: LucideIconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap] || CreditCard;
  return <IconComponent {...props} />;
}
