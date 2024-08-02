export const RightColumn = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="hidden md:block sm:col-span-3 ml-4 border">
            {children}
        </div>
    )
}