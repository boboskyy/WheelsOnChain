import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type TUserStore = {
    currentAddress: string | null
    setCurrentAddress: (address: string) => void
    clearCurrentAddress: () => void
    wheelsOnChainContract: Object | null
    setWheelsOnChainContract: (contract: Object) => void
    clearWheelsOnChainContract: () => void
}

const useUserStore = create<TUserStore>()(
    devtools(
        persist(
            (set) => ({
                currentAddress: null,
                setCurrentAddress: (address: string) => set(() => ({ currentAddress: address })),
                clearCurrentAddress: () => set(() => ({ currentAddress: null })),
                wheelsOnChainContract: null,
                setWheelsOnChainContract: (contract: Object) => set(() => ({ wheelsOnChainContract: contract })),
                clearWheelsOnChainContract: () => set(() => ({ wheelsOnChainContract: null })),
            }),
            {
                name: 'user-storage',
            },
        ),
    ),
)

export default useUserStore