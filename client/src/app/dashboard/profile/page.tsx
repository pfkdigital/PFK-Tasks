

import ProfileCard from '@/components/profile-page/profile-card'
import EditProfileForm from '@/components/profile-page/edit-profile-form'

function ProfilePage() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="grid gap-6 grid-rows-1 md:grid-cols-2">
                <ProfileCard/>
                <EditProfileForm/>
            </div>
        </div>
    )
}


export default ProfilePage