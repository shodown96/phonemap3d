import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Details {
    title: string,
    description: string,
    iphoneLink: string,
    androidLink: string,
}
interface State {
    files: File[],
    details: Details
}

interface Actions {
    setFiles: (uploadedFiles: File[]) => void;
    setDetails: (details: Details) => void;
    reset: () => void;
}

export const initialDetailValues = { title: "", description: "", iphoneLink: "", androidLink: "" }
// Not being used anymore for authentication
export const usePhoneStore = create(
    persist<Actions & State>(
        (set, get) => ({
            files: [],
            details: initialDetailValues,
            setDetails: (details) => set({ details }),
            setFiles: (files) => set({ files }),
            reset: () => set({ files: [], details: initialDetailValues }),
        }),
        {
            name: "phone-storage",
            skipHydration: true, // Requires the useStoreHydration usage
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
