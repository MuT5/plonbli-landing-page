import {
  BadgeInfo,
  CalendarCheck,
  HeartHandshake,
  Leaf,
  MapPin,
  MessageCircle,
  Search,
  Sprout,
  type LucideIcon,
} from "lucide-react";

import type { LandingIconName } from "@/types/landing";

const icons: Record<LandingIconName, LucideIcon> = {
  "map-pin": MapPin,
  search: Search,
  "message-circle": MessageCircle,
  "calendar-check": CalendarCheck,
  sprout: Sprout,
  leaf: Leaf,
  "heart-handshake": HeartHandshake,
  "badge-info": BadgeInfo,
};

interface LandingIconProps {
  name: LandingIconName;
  className?: string;
}

export default function LandingIcon({ name, className }: LandingIconProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.8} />;
}
