export const RightColumn = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="hidden md:block sm:col-span-3 ml-4 h-[70vh]">
            {children}
        </div>
    )
}