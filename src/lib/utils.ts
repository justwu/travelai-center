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
    normal: 'border-lake/25 bg-mint text-lake',
    warning: 'border-warning/25 bg-butter text-warning',
    risk: 'border-risk/25 bg-peach text-risk',
  }[status]
}
