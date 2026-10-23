import { experiences } from '@/lib/data'
import { ExperienceManager } from '@/components/admin/experience-manager'

export default function AdminExperiencesPage() {
  return <ExperienceManager initialExperiences={experiences} />
}
