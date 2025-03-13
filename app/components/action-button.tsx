import type { LucideIcon } from "lucide-react"

interface ActionButtonProps {
  icon: LucideIcon
}

export function ActionButton({ icon: Icon }: ActionButtonProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm flex-1 p-6 flex justify-center items-center">
      <div className="bg-red-400 rounded-full p-4">
        <Icon className="text-white w-6 h-6" />
      </div>
    </div>
  )
}

