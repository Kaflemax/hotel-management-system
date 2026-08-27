export type ReportRecord = {
  id: string
  title: string
  type: string
  generatedAt: string
  status: string
  size: string
}

export type ReportListResponse = {
  results: ReportRecord[]
  count: number
  summary: {
    totalReports: number
    readyCount: number
    processingCount: number
    downloadsThisMonth: number
  }
}
