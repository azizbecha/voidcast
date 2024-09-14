import { ReactNode } from "react"

export const MiddleColumn = ({ children }: { children: ReactNode }) => {
    return (
        <div className="col-span-1 sm:col-span-6 px-2 sm:p-0">
            {children}
        </div>
    )
}