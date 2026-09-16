import { inquiries } from '@/lib/data'
import { InquiriesTable } from '@/components/admin/inquiries-table'

export default function AdminInquiriesPage() {
  const sorted = [...inquiries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
  return (
    <div className="space-y-6">
      <p className="max-w-xl text-sm text-muted-foreground">
        Trip-planning requests submitted through the website. Filter by status to
        stay on top of your pipeline.
      </p>
      <InquiriesTable inquiries={sorted} />
    </div>
  )
}
