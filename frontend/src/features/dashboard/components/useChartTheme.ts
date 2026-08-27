import { useAppSelector } from '../../../app/hooks'

export function useChartTheme() {
  const theme = useAppSelector((s) => s.ui.theme)
  const isDark = theme === 'dark'

  return {
    isDark,
    grid: isDark ? '#334155' : '#E5E7EB',
    axis: isDark ? '#94A3B8' : '#6B7280',
    tooltipBg: isDark ? '#1E293B' : '#FFFFFF',
    tooltipBorder: isDark ? '#334155' : '#E5E7EB',
    tooltipText: isDark ? '#F8FAFC' : '#1F2937',
    colors: {
      primary: '#2C97AD',
      secondary: '#5BB8CA',
      accent: '#86EFAC',
      warning: '#FB923C',
      danger: '#EF4444',
      purple: '#5BB8CA',
      teal: '#2C97AD',
    },
  }
}
