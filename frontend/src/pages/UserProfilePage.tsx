import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser()
    const { updateUser, isLoading: isUpdatingLoading } = useUpdateMyUser()

    if (isGetLoading) {
        return <span>Loading...</span>
    }

    if (!currentUser) {
        return <span>Unable to fetch user</span>
    }

    return <UserProfileForm onSave={updateUser} currentUser={currentUser} isLoading={isUpdatingLoading} />
}

export default UserProfilePage;