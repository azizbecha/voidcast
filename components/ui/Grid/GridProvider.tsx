export const GridProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 h-screen sm:px-4 md:px-6 lg:px-8 text-white">
            {children}
        </div>
    )
}