import { LucideIcon } from "lucide-react";

interface ActionResultCardProps {
  icon: LucideIcon;
  iconColor?: string;
  label: string;
  value?: string;
}

export function ActionResultCard({ icon: Icon, iconColor = "text-blue-500", label, value }: ActionResultCardProps) {
  return (
    <div className="flex items-center gap-2 p-3 my-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-300">
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <span>
        {label} {value && <span className="font-medium text-white">{value}</span>}
      </span>
    </div>
  );
}
