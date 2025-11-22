import { LucideIcon } from "lucide-react";

interface ActionResultCardProps {
  icon: LucideIcon;
  iconColor?: string;
  label: string;
  value?: string;
}

export function ActionResultCard({ icon: Icon, iconColor = "text-primary", label, value }: ActionResultCardProps) {
  return (
    <div className="flex items-center gap-2 p-3 my-2 rounded-lg bg-card border border-border text-sm text-muted-foreground">
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <span>
        {label} {value && <span className="font-medium text-foreground">{value}</span>}
      </span>
    </div>
  );
}
