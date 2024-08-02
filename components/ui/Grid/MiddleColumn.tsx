import { ReactNode } from "react"

export const MiddleColumn = ({ children }: { children: ReactNode }) => {
    return (
        <div className="col-span-1 sm:col-span-6 bg-gray-800 p-4 rounded">
            {children}
        </div>
    )
}