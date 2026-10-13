import Logo from '@/Components/Fresh/Logo';

/** Shared shell for the login & sign-up pages: sticky navbar, gradient hero area, mini footer. */
export default function FreshAuthLayout({ navPrompt, navAction, innerClassName = 'lg:py-20', children }) {
    return (
        <div className="min-h-screen bg-white text-slate-900 antialiased">
            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Logo animated />
                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm text-slate-500 sm:inline">{navPrompt}</span>
                        {navAction}
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className="gradient-hero relative min-h-[calc(100vh-80px)] overflow-hidden">
                <div
                    className={`relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 py-14 lg:grid-cols-2 lg:px-8 ${innerClassName}`}
                >
                    {children}
                </div>

                <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-forest-200/40 blur-3xl"></div>
                <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-coral-100/60 blur-3xl"></div>
            </section>

            {/* Mini footer */}
            <footer className="border-t border-slate-100 bg-white py-6">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-500 sm:flex-row lg:px-8">
                    <p>&copy; 2026 FreshTrack Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="transition-colors hover:text-forest-600">Terms of Service</a>
                        <a href="#" className="transition-colors hover:text-forest-600">Privacy Policy</a>
                        <a href="#" className="transition-colors hover:text-forest-600">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
