export const GridProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
            {children}
        </div>
    )
}