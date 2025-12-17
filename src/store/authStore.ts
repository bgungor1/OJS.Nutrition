import { create } from 'zustand'
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware'
import type { User } from '@/types/auth'

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    setAuth: (user: User, accessToken: string, refreshToken: string) => void
    logout: () => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    clearError: () => void
    updateTokens: (accessToken: string, refreshToken?: string) => void
}


const authStorage: PersistStorage<AuthState> = {
    getItem: (name) => {
        try {
            const str = localStorage.getItem(name)
            if (!str) return null
            return JSON.parse(str) as StorageValue<AuthState>
        } catch (error) {
            console.error('Auth storage okuma hatası:', error)
            return null
        }
    },
    setItem: (name, value) => {
        try {
            localStorage.setItem(name, JSON.stringify(value))
        } catch (error) {
            console.error('Auth storage yazma hatası:', error)
        }
    },
    removeItem: (name) => {
        try {
            localStorage.removeItem(name)
        } catch (error) {
            console.error('Auth storage silme hatası:', error)
        }
    },
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,



            /**
             * @param user - API'den gelen kullanıcı bilgileri
             * @param accessToken - JWT access token
             * @param refreshToken - JWT refresh token
             */
            setAuth: (user, accessToken, refreshToken) => set({
                user,
                accessToken,
                refreshToken,
                isAuthenticated: true,
                error: null
            }),


            logout: () => set({
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                error: null
            }),


            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),

            /**
             * @param accessToken - Yeni access token
             * @param refreshToken - Opsiyonel: Yeni refresh token (bazı sistemler ikisini de yeniler)
             */
            updateTokens: (accessToken, refreshToken) => set((state) => ({
                accessToken,
                // Yeni refresh token geldiyse güncelle, gelmediyse eskisini koru
                refreshToken: refreshToken ?? state.refreshToken
            }))
        }),
        {
            name: 'auth-storage',
            storage: authStorage,


            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                isLoading: false,
                error: null,
            } as AuthState)
        }
    )
)

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useCurrentUser = () => useAuthStore((state) => state.user)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)