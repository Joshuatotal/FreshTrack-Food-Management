import Logo from '@/Components/Fresh/Logo';
import { todayLabel } from '@/lib/freshness';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const mainNav = [
    { label: 'Dashboard Overview', icon: 'fa-solid fa-chart-pie', routeName: 'dashboard' },
    { label: 'Product Management', icon: 'fa-solid fa-boxes-stacked', routeName: 'products' },
    { label: 'Freshness Alerts', icon: 'fa-solid fa-bell' },
    { label: 'Spoilage Analytics', icon: 'fa-solid fa-chart-line' },
    { label: 'Stall Profile', icon: 'fa-solid fa-store' },
];

const accountNav = [
    { label: 'Settings', icon: 'fa-solid fa-gear', routeName: 'profile.edit' },
    { label: 'Help & Support', icon: 'fa-regular fa-circle-question' },
];

function NavItem({ item }) {
    const active = item.routeName ? route().current(item.routeName) : false;

    const classes = `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors hover:bg-forest-50 hover:text-forest-700 ${
        active ? 'bg-forest-50 text-forest-700' : 'text-slate-600'
    }`;

    const content = (
        <>
            <i className={`${item.icon} w-5 text-center ${active ? 'text-forest-600' : 'text-slate-400'}`}></i>
            {item.label}
        </>
    );

    // Pages that don't exist yet stay as "#" placeholders.
    return item.routeName ? (
        <Link href={route(item.routeName)} className={classes}>
            {content}
        </Link>
    ) : (
        <a href="#" className={classes}>
            {content}
        </a>
    );
}

/**
 * Shared dashboard shell (sidebar + sticky topbar). Pages render their content as children.
 *
 * Props
 *  - title:  heading shown in the topbar
 *  - search: optional { value, onChange, placeholder, disabled } for the topbar search box
 *  - action: optional node rendered at the far right of the topbar (e.g. a CTA button)
 */
export default function DashboardLayout({ title, search, action, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAF9] text-slate-900 antialiased">
            <div className="flex min-h-screen">
                {/* ============ SIDEBAR ============ */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-100 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-20 items-center border-b border-slate-100 px-6">
                        <Logo href={route('dashboard')} />
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close menu"
                            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6" onClick={() => setSidebarOpen(false)}>
                        <p className="mb-2 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">Main</p>
                        {mainNav.map((item) => (
                            <NavItem key={item.label} item={item} />
                        ))}

                        <p className="mb-2 mt-7 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">Account</p>
                        {accountNav.map((item) => (
                            <NavItem key={item.label} item={item} />
                        ))}
                    </nav>

                    <div className="border-t border-slate-100 p-4">
                        <div className="flex items-center gap-3 rounded-2xl bg-forest-50 p-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-600 text-sm font-bold text-white">
                                <i className="fa-solid fa-user text-sm"></i>
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
                                <p className="truncate text-xs text-slate-500">{user.stall_name || 'Set up your stall profile'}</p>
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                title="Log out"
                                className="ml-auto text-slate-400 transition-colors hover:text-coral-500"
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
                )}

                {/* ============ MAIN CONTENT ============ */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-slate-100 bg-white/80 px-6 backdrop-blur-md lg:px-10">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open menu"
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 lg:hidden"
                        >
                            <i className="fa-solid fa-bars text-xl"></i>
                        </button>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Today, {todayLabel()}</p>
                            <h1 className="text-lg font-extrabold text-slate-900 sm:text-xl">{title}</h1>
                        </div>

                        <div className="ml-auto flex items-center gap-4">
                            {search && (
                                <div className="relative hidden md:block">
                                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>
                                    <input
                                        type="text"
                                        value={search.value ?? ''}
                                        onChange={search.onChange}
                                        placeholder={search.placeholder}
                                        disabled={search.disabled}
                                        className={`w-64 rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm font-medium placeholder-slate-400 transition-colors focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-100 ${
                                            search.disabled ? 'cursor-not-allowed' : ''
                                        }`}
                                    />
                                </div>
                            )}
                            <button
                                type="button"
                                aria-label="Notifications"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100"
                            >
                                <i className="fa-regular fa-bell"></i>
                            </button>
                            {action}
                        </div>
                    </header>

                    <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
                </div>
            </div>
        </div>
    );
}
