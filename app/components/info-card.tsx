import type { LucideIcon } from "lucide-react"

interface InfoCardProps {
  bgColor: string
  iconBgColor: string
  iconColor: string
  icon: LucideIcon
  text: string
}

export function InfoCard({ bgColor, iconBgColor, iconColor, icon: Icon, text }: InfoCardProps) {
  return (
    <div className={`${bgColor} rounded-xl shadow-sm flex-1 p-4 flex items-start gap-3`}>
      <div className={`${iconBgColor} rounded-full p-2 mt-1`}>
        <Icon className={`${iconColor} w-4 h-4`} />
      </div>
      <div className="text-sm text-gray-700">{text}</div>
    </div>
  )
}

