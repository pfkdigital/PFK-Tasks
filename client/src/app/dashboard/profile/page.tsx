import {Suspense} from 'react'

import ProfileCard from '@/components/profile-page/profile-card'
import ProfileSkeleton from '@/components/profile-page/profile-skeleton'
import EditProfileForm from '@/components/profile-page/edit-profile-form'

async function ProfilePage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <EditProfileForm/>
                <div>
                    <Suspense fallback={<ProfileSkeleton/>}>
                        <ProfileCard/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}


export default ProfilePage