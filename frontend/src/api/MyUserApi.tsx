import { User } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Represents the request body for creating a user.
 */
type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

/**
 * Custom hook to get the current user.
 * @returns An object containing the current user, loading state, and error state.
 */
export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    /**
     * Fetches the current user from the API.
     * @returns A promise that resolves to the current user.
     * @throws An error if the API request fails.
     */
    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("Failed to fetch user")
        }
        return response.json()
    }

    const { data, isLoading, error } = useQuery('myUser', getMyUserRequest)

    if (error) {
        toast.error(error.toString());
    }

    return {
        currentUser: data,
        isLoading,
    }
}

/**
 * Custom hook to create a new user.
 * @returns An object containing the create user function, loading state, error state, and success state.
 */
export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    /**
     * Sends a request to create a new user.
     * @param user - The user data to create.
     * @throws An error if the API request fails.
     */
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    };

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest)

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
}

/**
 * Represents the request body for updating a user.
 */
type UpdateUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

/**
 * Custom hook to update the current user.
 * @returns An object containing the update user function, loading state, error state, success state, and reset function.
 */
export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    /**
     * Sends a request to update the current user.
     * @param user - The updated user data.
     * @returns A promise that resolves to the updated user.
     * @throws An error if the API request fails.
     */
    const updateMyUserRequest = async (user: UpdateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        return response.json();
    };

    const { mutateAsync: updateUser, isLoading, error, isSuccess, reset } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User profile updated")
    }

    if (error) {
        toast.error(error.toString())
        reset();
    }

    return {
        updateUser,
        isLoading,
        isSuccess,
        reset
    };
};

