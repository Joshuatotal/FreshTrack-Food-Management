import Logo from '@/Components/Fresh/Logo';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Stall Inventory', href: '#inventory' },
    { label: 'Features', href: '#features' },
    { label: 'Analytics', href: '#analytics' },
];

const trustedBy = [
    { icon: 'fa-carrot', name: 'Harvest Corner' },
    { icon: 'fa-fish', name: 'Bay Fresh Market' },
    { icon: 'fa-wheat-awn', name: 'Grainfield Co.' },
    { icon: 'fa-apple-whole', name: 'Orchard Stand' },
    { icon: 'fa-cow', name: 'Dairy & Meats Co.' },
];

const features = [
    {
        title: 'Log Incoming Stock',
        text: 'Easily record batch dates, categories (fruits, vegetables, meats), and expected shelf-life in seconds — right from your phone at the stall.',
        icon: 'fa-box-open',
        card: 'bg-forest-50 border-forest-100',
        iconBox: 'bg-forest-600 shadow-soft',
    },
    {
        title: 'Smart Freshness Alerts',
        text: 'Track expiry schedules automatically and get notified before goods spoil so you can discount early and recover revenue.',
        icon: 'fa-bell',
        card: 'bg-amber-50 border-amber-100',
        iconBox: 'bg-coral-500 shadow-[0_10px_30px_-8px_rgba(249,115,22,0.4)]',
    },
    {
        title: 'Reduce Waste & Boost Revenue',
        text: 'View real-time reports on spoilage vs. sold inventory to optimize future purchases and keep more profit in your pocket.',
        icon: 'fa-chart-pie',
        card: 'bg-slate-50 border-slate-100',
        iconBox: 'bg-slate-900 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.3)]',
    },
];

const heroItems = [
    { emoji: '🍎', name: 'Apples', batch: '#A-204', tag: 'Fresh', row: 'bg-forest-50', dot: 'bg-forest-600', pill: 'text-forest-700 bg-forest-100' },
    { emoji: '🍅', name: 'Tomatoes', batch: '#T-118', tag: '2 Days Left', row: 'bg-amber-50', dot: 'bg-amber-500', pill: 'text-amber-700 bg-amber-100' },
    { emoji: '🥬', name: 'Lettuce', batch: '#L-077', tag: 'Discount Now', row: 'bg-red-50', dot: 'bg-red-500', pill: 'text-red-700 bg-red-100' },
];

const heroBars = [
    ['40%', 'bg-forest-200'],
    ['65%', 'bg-forest-300'],
    ['50%', 'bg-forest-400'],
    ['85%', 'bg-forest-500'],
    ['70%', 'bg-forest-600'],
    ['95%', 'bg-forest-700'],
];

const inventoryRows = [
    { name: 'Carrots — Batch #C-052', tag: 'Fresh · 6 days', width: '85%', dot: 'bg-forest-600', pill: 'text-forest-700 bg-forest-100', bar: 'bg-forest-600' },
    { name: 'Bananas — Batch #B-091', tag: 'Near Expiry · 2 days', width: '45%', dot: 'bg-amber-500', pill: 'text-amber-700 bg-amber-100', bar: 'bg-amber-500' },
    { name: 'Spinach — Batch #S-013', tag: 'Spoilage Risk', width: '12%', dot: 'bg-red-500', pill: 'text-red-700 bg-red-100', bar: 'bg-red-500' },
];

const legend = [
    ['bg-forest-600', 'Fresh'],
    ['bg-amber-500', 'Near Expiry / Discount'],
    ['bg-red-500', 'Spoilage Warning'],
];

const inventoryPoints = [
    'Automatic shelf-life calculations based on produce category',
    'One-tap status updates as you sell, restock, or discount',
    "Works offline at the market, syncs when you're back online",
];

const stats = [
    { value: '$1,240', label: 'Avg. monthly savings', box: 'bg-forest-50 border-forest-100', color: 'text-forest-700' },
    { value: '41%', label: 'Reduction in food waste', box: 'bg-amber-50 border-amber-100', color: 'text-coral-600' },
    { value: '+27%', label: 'Profit recovery vs. baseline', box: 'bg-slate-50 border-slate-100', color: 'text-slate-900' },
    { value: '500+', label: 'Vendors tracking daily', box: 'bg-forest-50 border-forest-100', color: 'text-forest-700' },
];

const chartBars = [
    ['30%', 'bg-slate-700'],
    ['45%', 'bg-slate-600'],
    ['55%', 'bg-forest-700'],
    ['70%', 'bg-forest-600'],
    ['85%', 'bg-forest-500'],
    ['100%', 'bg-coral-500'],
];

const footerColumns = [
    { title: 'Quick Links', links: navLinks },
    {
        title: 'Legal',
        links: [
            { label: 'Terms of Service', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Cookie Policy', href: '#' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Contact Us', href: '#' },
            { label: 'Help Center', href: '#' },
            { label: 'FAQs', href: '#' },
        ],
    },
];

const coralButton =
    'inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600';

export default function Welcome() {
    const user = usePage().props.auth?.user;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Track Freshness, Reduce Waste, Maximize Earnings" />

            <div className="bg-white text-slate-900 antialiased">
                {/* ============ NAVBAR ============ */}
                <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                    <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                        <Logo animated />

                        <div className="hidden items-center gap-10 md:flex">
                            {navLinks.map((l, i) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    className={`text-sm font-semibold transition-colors hover:text-forest-600 ${i === 0 ? 'text-slate-900' : 'text-slate-600'}`}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>

                        <div className="hidden items-center gap-4 md:flex">
                            {user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-700 hover:shadow-lg"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-semibold text-slate-700 transition-colors hover:text-forest-600">
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-700 hover:shadow-lg"
                                    >
                                        Login / Sign Up
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Toggle menu"
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
                        >
                            <i className="fa-solid fa-bars text-xl"></i>
                        </button>
                    </nav>

                    {menuOpen && (
                        <div className="space-y-3 border-t border-slate-100 bg-white px-6 py-4 md:hidden">
                            {navLinks.map((l, i) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`block py-1 text-sm font-semibold ${i === 0 ? 'text-slate-900' : 'text-slate-600'}`}
                                >
                                    {l.label}
                                </a>
                            ))}
                            <div className="flex flex-col gap-3 pt-3">
                                {user ? (
                                    <Link href={route('dashboard')} className="rounded-full bg-forest-600 px-6 py-2.5 text-center text-sm font-bold text-white">
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="rounded-full border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700">
                                            Login
                                        </Link>
                                        <Link href={route('register')} className="rounded-full bg-forest-600 px-6 py-2.5 text-center text-sm font-bold text-white">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                {/* ============ HERO ============ */}
                <section className="gradient-hero relative overflow-hidden">
                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-24">
                        <div className="relative z-10">
                            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest-700 shadow-card">
                                <i className="fa-solid fa-seedling text-forest-600"></i>
                                Built for Market Vendors
                            </span>

                            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
                                Stop Throwing Away Profit:{' '}
                                <span className="relative inline-block text-forest-600">Track Freshness,</span>{' '}
                                <span className="relative inline-block text-forest-600">Reduce Waste,</span> Maximize Earnings.
                            </h1>

                            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
                                The easy-to-use inventory dashboard built specifically for market vendors and fresh produce sellers. Log stock,
                                monitor shelf-life, and turn potential waste into profit.
                            </p>

                            <div className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                                <Link href={route('register')} className={`${coralButton} hover:shadow-[0_15px_35px_-8px_rgba(249,115,22,0.6)]`}>
                                    Start Tracking Free
                                    <i className="fa-solid fa-arrow-right text-sm"></i>
                                </Link>
                                <a href="#features" className="inline-flex items-center gap-2 text-base font-semibold text-slate-700 transition-colors hover:text-forest-600">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-card">
                                        <i className="fa-solid fa-play text-xs text-forest-600"></i>
                                    </span>
                                    See how it works
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm tracking-tight text-coral-500">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fa-solid fa-star"></i>
                                    ))}
                                </span>
                                <p className="text-sm font-semibold text-slate-600">Trusted by 500+ Local Market Vendors &amp; Fresh Sellers</p>
                            </div>
                        </div>

                        {/* Dashboard mockup */}
                        <div className="relative z-10">
                            <div className="relative mx-auto max-w-md lg:max-w-none">
                                <div className="animate-floaty rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Today's Stall Overview</p>
                                            <p className="text-lg font-bold text-slate-900">Green Valley Produce</p>
                                        </div>
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50">
                                            <i className="fa-solid fa-store text-forest-600"></i>
                                        </span>
                                    </div>

                                    <div className="mb-5 space-y-3">
                                        {heroItems.map((item) => (
                                            <div key={item.name} className={`flex items-center justify-between rounded-xl px-4 py-3 ${item.row}`}>
                                                <div className="flex items-center gap-3">
                                                    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm text-white ${item.dot}`}>{item.emoji}</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                                                        <p className="text-xs text-slate-500">Batch {item.batch}</p>
                                                    </div>
                                                </div>
                                                <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.pill}`}>{item.tag}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex h-20 items-end justify-between gap-2 rounded-xl bg-slate-50 px-4 pb-2 pt-3">
                                        {heroBars.map(([h, color], i) => (
                                            <div
                                                key={i}
                                                className={`w-full origin-bottom animate-grow rounded-t-md ${color}`}
                                                style={{ height: h, animationDelay: `${(i + 1) / 10}s` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className="absolute -bottom-8 -left-6 w-48 animate-floaty rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl lg:-left-10"
                                    style={{ animationDelay: '1s' }}
                                >
                                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">Waste Reduced</p>
                                    <p className="text-2xl font-extrabold text-forest-600">38.5%</p>
                                    <p className="mt-1 text-[11px] text-slate-500">
                                        <i className="fa-solid fa-arrow-trend-up mr-1 text-forest-600"></i>vs last month
                                    </p>
                                </div>

                                <div
                                    className="absolute -right-4 -top-6 flex animate-floaty items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl lg:-right-8"
                                    style={{ animationDelay: '2s' }}
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-500 text-white">
                                        <i className="fa-solid fa-bell text-sm"></i>
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Freshness Alert</p>
                                        <p className="text-[11px] text-slate-500">3 items expiring soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-forest-200/40 blur-3xl"></div>
                    <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-coral-100/60 blur-3xl"></div>
                </section>

                {/* ============ TRUST BAR ============ */}
                <section className="border-b border-slate-100 bg-white py-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                            Trusted by Local Vendors &amp; Market Stall Owners
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400">
                            {trustedBy.map((t) => (
                                <span key={t.name} className="flex items-center gap-2 text-lg font-bold">
                                    <i className={`fa-solid ${t.icon}`}></i> {t.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ FEATURES ============ */}
                <section id="features" className="bg-white py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto mb-16 max-w-2xl text-center">
                            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-coral-600">How It Works</span>
                            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                                Designed for Daily <span className="text-forest-600">Freshness Management</span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                A simple three-step workflow that fits naturally into your daily stall routine — no spreadsheets, no guesswork.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {features.map((f) => (
                                <div key={f.title} className={`rounded-3xl border p-8 transition-shadow duration-300 hover:shadow-soft ${f.card}`}>
                                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${f.iconBox}`}>
                                        <i className={`fa-solid ${f.icon} text-xl text-white`}></i>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-slate-900">{f.title}</h3>
                                    <p className="leading-relaxed text-slate-600">{f.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ SHOWCASE: INVENTORY ============ */}
                <section id="inventory" className="bg-forest-50/60 py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
                                <p className="mb-5 text-xs font-bold uppercase tracking-wide text-slate-400">Live Stall Inventory</p>
                                <div className="space-y-4">
                                    {inventoryRows.map((r, i) => (
                                        <div key={r.name} className="space-y-4">
                                            <div className={`flex items-center justify-between ${i > 0 ? 'pt-2' : ''}`}>
                                                <div className="flex items-center gap-3">
                                                    <span className={`h-3 w-3 rounded-full ${r.dot}`}></span>
                                                    <span className="text-sm font-semibold text-slate-800">{r.name}</span>
                                                </div>
                                                <span className={`rounded-full px-3 py-1 text-xs font-bold ${r.pill}`}>{r.tag}</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                                <div className={`h-full rounded-full ${r.bar}`} style={{ width: r.width }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-7 flex items-center gap-6 border-t border-slate-100 pt-6">
                                    {legend.map(([dot, label]) => (
                                        <div key={label} className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                            <span className={`h-2.5 w-2.5 rounded-full ${dot}`}></span> {label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-forest-700">Stall Inventory</span>
                            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                                Real-time Expiry &amp; <span className="text-forest-600">Stall Inventory Tracking</span>
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-slate-600">
                                Every item on your stall is color-coded the moment you log it. Green means sell as usual, yellow flags items to
                                discount today, and red warns you before stock turns into a total loss — all updated automatically, all day long.
                            </p>
                            <ul className="space-y-4">
                                {inventoryPoints.map((p) => (
                                    <li key={p} className="flex items-start gap-3">
                                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-100">
                                            <i className="fa-solid fa-check text-xs text-forest-600"></i>
                                        </span>
                                        <span className="text-slate-700">{p}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ============ SHOWCASE: ANALYTICS ============ */}
                <section id="analytics" className="bg-white py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
                        <div>
                            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-coral-600">Analytics</span>
                            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                                Insightful <span className="text-forest-600">Spoilage Analytics</span>
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-slate-600">
                                See exactly where your money is going each month. FreshTrack turns your daily logs into clear, actionable charts so
                                you can buy smarter, price better, and keep more of every sale.
                            </p>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {stats.map((s) => (
                                    <div key={s.label} className={`rounded-2xl border p-5 ${s.box}`}>
                                        <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-600">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-slate-900 p-8 shadow-2xl">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Monthly Waste Reduction</p>
                                    <p className="text-lg font-bold text-white">Last 6 Months</p>
                                </div>
                                <span className="flex items-center gap-1 text-sm font-bold text-forest-400">
                                    <i className="fa-solid fa-arrow-trend-up"></i> +38.5%
                                </span>
                            </div>

                            <div className="mb-4 flex h-40 items-end justify-between gap-3">
                                {chartBars.map(([h, color], i) => (
                                    <div
                                        key={i}
                                        className={`w-full origin-bottom animate-grow rounded-t-lg ${color}`}
                                        style={{ height: h, animationDelay: `${(i + 1) / 10}s` }}
                                    ></div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                                {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m) => (
                                    <span key={m}>{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ CTA BANNER ============ */}
                <section className="bg-forest-50 py-20">
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-700 to-forest-800 px-8 py-14 text-center shadow-2xl sm:px-14 sm:py-16">
                            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
                            <div className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                                    Ready to Stop Losing Money on Spoiled Stock?
                                </h2>
                                <p className="mx-auto mb-8 max-w-xl text-lg text-forest-100">
                                    Create your stall inventory account today and start tracking freshness in minutes — free to get started, no
                                    credit card required.
                                </p>
                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Link href={route('register')} className={coralButton}>
                                        Create Free Account
                                        <i className="fa-solid fa-arrow-right text-sm"></i>
                                    </Link>
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:border-white/60"
                                    >
                                        Talk to Our Team
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ FOOTER ============ */}
                <footer className="bg-slate-900 pb-8 pt-16 text-slate-400">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-12 grid gap-10 md:grid-cols-4">
                            <div className="md:col-span-1">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest-600 to-forest-800">
                                        <i className="fa-solid fa-leaf text-sm text-white"></i>
                                    </span>
                                    <span className="text-lg font-extrabold text-white">
                                        Fresh<span className="text-forest-500">Track</span>
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Crafted for fresh market vendors &amp; local merchants who refuse to let good produce go to waste.
                                </p>
                                <div className="mt-5 flex items-center gap-3">
                                    {['fa-instagram', 'fa-facebook-f', 'fa-x-twitter'].map((icon) => (
                                        <a
                                            key={icon}
                                            href="#"
                                            aria-label={icon.replace('fa-', '')}
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-forest-600"
                                        >
                                            <i className={`fa-brands ${icon} text-sm`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {footerColumns.map((col) => (
                                <div key={col.title}>
                                    <h4 className="mb-5 text-sm font-bold uppercase tracking-wide text-white">{col.title}</h4>
                                    <ul className="space-y-3 text-sm">
                                        {col.links.map((l) => (
                                            <li key={l.label}>
                                                <a href={l.href} className="transition-colors hover:text-forest-500">
                                                    {l.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
                            <p>&copy; 2026 FreshTrack Inc. All rights reserved.</p>
                            <p>Crafted for fresh market vendors &amp; local merchants.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
