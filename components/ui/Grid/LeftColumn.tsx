import { ReactNode } from "react"

export const LeftColumn = ({ children }: { children: ReactNode }) => {
    return (
        <div className="hidden md:block sm:col-span-3 mr-4 h-[70vh]">
            {children}
        </div>
    )
}