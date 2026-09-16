import Link from 'next/link'
import { Building2, Home, Compass, Inbox, ArrowRight } from 'lucide-react'
import {
  resorts,
  guestHouses,
  experiences,
  inquiries,
} from '@/lib/data'
import {
  StatCard,
  StatusBadge,
  AdminPanel,
  AdminActionLink,
} from '@/components/admin/admin-ui'

export default function AdminDashboard() {
  const openInquiries = inquiries.filter(
    (i) => i.status === 'new' || i.status === 'contacted',
  ).length
  const recent = inquiries.slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Resorts"
          value={resorts.length}
          hint={`${resorts.filter((r) => r.published).length} published`}
          icon={Building2}
        />
        <StatCard
          label="Guest Houses"
          value={guestHouses.length}
          hint={`${guestHouses.filter((g) => g.published).length} published`}
          icon={Home}
        />
        <StatCard
          label="Experiences"
          value={experiences.length}
          hint="Across all islands"
          icon={Compass}
        />
        <StatCard
          label="Open inquiries"
          value={openInquiries}
          hint={`${inquiries.length} total`}
          icon={Inbox}
        />
      </div>

      <AdminPanel
        title="Recent inquiries"
        description="Latest trip-planning requests from the website"
        action={<AdminActionLink href="/admin/inquiries">View all</AdminActionLink>}
      >
        <div className="divide-y divide-border">
          {recent.map((inq) => (
            <div
              key={inq.id}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{inq.name}</span>
                  <StatusBadge status={inq.status} />
                </div>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {inq.propertyName ?? 'General inquiry'} · {inq.travelDates} ·{' '}
                  {inq.guests}
                </p>
              </div>
              <div className="shrink-0 text-sm text-muted-foreground">
                {inq.contact}
              </div>
            </div>
          ))}
        </div>
      </AdminPanel>

      <div className="grid gap-4 md:grid-cols-3">
        <QuickLink
          href="/admin/resorts"
          title="Manage resorts"
          body="Edit descriptions, imagery and publishing"
        />
        <QuickLink
          href="/admin/guest-houses"
          title="Manage guest houses"
          body="Curate local island stays"
        />
        <QuickLink
          href="/admin/experiences"
          title="Manage experiences"
          body="Diving, cruises, sandbanks and more"
        />
      </div>
    </div>
  )
}

function QuickLink({
  href,
  title,
  body,
}: {
  href: string
  title: string
  body: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
    >
      <div>
        <div className="font-serif text-lg text-foreground">{title}</div>
        <p className="text-sm text-muted-foreground">{body}</p>
      </div>
      <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
