import { Suspense } from 'react'

import ProfileCard from '@/components/profile-card'
import ProfileSkeleton from '@/components/profile-skeleton'
import EditProfileForm from '@/components/edit-profile-form'

async function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileCard />
        </Suspense>
        <EditProfileForm />
      </div>
    </div>
  )
}


export default ProfilePage