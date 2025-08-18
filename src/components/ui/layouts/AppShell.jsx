export default function AppShell({ children }) {
    return (
        <div className="min-h-screen flex flex-col">

            {/* Header  */}
            <header className="p-4 bg-slate-800 text-white">
                <h1 className="text-xl font-bold">ChatApp</h1>
            </header>

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="p-4 bg-slate-900 text-white text-center">
                <p>© {new Date().getFullYear()} ChatApp. All rights reserved.</p>
            </footer>

        </div>
    )
}