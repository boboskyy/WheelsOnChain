import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type TAdmin = {
  id: string
  email: string
  token: string
}

type TAdminStore = {
  admin: TAdmin | null
  setAdminAuth: (admin: TAdmin) => void
  clearAdminAuth: () => void
}

const useAdminStore = create<TAdminStore>()(
  devtools(
    persist(
      (set) => ({
        admin: null,
        setAdminAuth: (admin: TAdmin) => set(() => ({ admin })),
        clearAdminAuth: () => set(() => ({ admin: null })),
      }),
      {
        name: 'admin-storage',
      },
    ),
  ),
)

export default useAdminStore
