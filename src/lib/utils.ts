import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function statusLabel(status: 'normal' | 'warning' | 'risk') {
  return {
    normal: '平稳',
    warning: '预警',
    risk: '需处理',
  }[status]
}

export function statusTone(status: 'normal' | 'warning' | 'risk') {
  return {
    normal: 'border-lake/30 bg-lake/8 text-lake',
    warning: 'border-warning/30 bg-warning/10 text-warning',
    risk: 'border-risk/30 bg-risk/10 text-risk',
  }[status]
}
