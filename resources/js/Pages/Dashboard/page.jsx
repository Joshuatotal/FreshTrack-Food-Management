import DashboardLayout from '@/Layouts/DashboardLayout';
import { CATEGORY_ICONS, daysUntil, formatDate, formatMoney, getStatus, productValue } from '@/lib/freshness';
import { Head, Link } from '@inertiajs/react';
import { useMemo } from 'react';

const ctaClasses =
    'inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600';

export default function Dashboard({ products = [] }) {
    const hasProducts = products.length > 0;

    // Everything on this page is derived from the user's real products.
    const { totalValue, attention, atRisk, wasteLoss, soonest } = useMemo(() => {
        const withStatus = products.map((p) => ({ ...p, status: getStatus(p.expiry_date), value: productValue(p) }));
        const needsAttention = withStatus.filter((p) => p.status.key === 'near' || p.status.key === 'risk');
        const risk = withStatus.filter((p) => p.status.key === 'risk');

        return {
            totalValue: withStatus.reduce((sum, p) => sum + p.value, 0),
            attention: needsAttention.sort((a, b) => daysUntil(a.expiry_date) - daysUntil(b.expiry_date)),
            atRisk: risk.length,
            wasteLoss: risk.reduce((sum, p) => sum + p.value, 0),
            // soonest-expiring first; products with no expiry date go last
            soonest: [...withStatus]
                .sort((a, b) => (daysUntil(a.expiry_date) ?? Infinity) - (daysUntil(b.expiry_date) ?? Infinity))
                .slice(0, 5),
        };
    }, [products]);

    const metrics = [
        {
            label: 'Total Inventory Value',
            value: formatMoney(totalValue),
            note: hasProducts ? `Across ${products.length} ${products.length === 1 ? 'product' : 'products'}` : 'No stock logged yet',
            icon: 'fa-solid fa-sack-dollar',
            active: hasProducts,
            tone: 'forest',
        },
        {
            label: 'Expiring Today / Soon',
            value: `${attention.length} ${attention.length === 1 ? 'item' : 'items'}`,
            note: attention.length ? `${atRisk} expired or expiring today` : 'Nothing to flag right now',
            icon: 'fa-solid fa-triangle-exclamation',
            active: attention.length > 0,
            tone: 'amber',
        },
        {
            label: 'Est. Daily Waste Loss',
            value: formatMoney(wasteLoss),
            note: wasteLoss > 0 ? 'Value of expired / expiring-today stock' : 'No stock at risk today',
            icon: 'fa-solid fa-trash-can',
            active: wasteLoss > 0,
            tone: 'red',
        },
        {
            label: 'Net Profit Today',
            value: '$0.00',
            note: 'Starts once you log sales',
            icon: 'fa-solid fa-chart-simple',
            active: false,
            tone: 'forest',
        },
    ];

    const tones = {
        forest: { box: 'bg-forest-50', icon: 'text-forest-600' },
        amber: { box: 'bg-amber-50', icon: 'text-amber-500' },
        red: { box: 'bg-red-50', icon: 'text-red-500' },
    };

    return (
        <DashboardLayout
            title="Welcome to FreshTrack 👋"
            search={{ placeholder: 'Search inventory...', disabled: true }}
            action={
                <Link href={route('products')} className={`hidden px-5 py-2.5 text-sm sm:inline-flex ${ctaClasses}`}>
                    <i className="fa-solid fa-plus text-xs"></i> {hasProducts ? 'Add Product' : 'Log Your First Stock'}
                </Link>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* ============ BANNER ============ */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-700 to-forest-800 px-7 py-9 shadow-2xl sm:px-10">
                    <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                        <div className="max-w-xl">
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                                <i className="fa-solid fa-seedling"></i>
                                {hasProducts ? 'Your stall at a glance' : 'Your stall is empty'}
                            </span>
                            <h2 className="mb-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                                {hasProducts
                                    ? attention.length > 0
                                        ? `${attention.length} ${attention.length === 1 ? 'item needs' : 'items need'} your attention today.`
                                        : 'Everything on your stall is fresh.'
                                    : "Let's log your first batch of stock."}
                            </h2>
                            <p className="text-sm leading-relaxed text-forest-100 sm:text-base">
                                {hasProducts
                                    ? `You're tracking ${products.length} ${products.length === 1 ? 'product' : 'products'} worth ${formatMoney(totalValue)}. Keep your inventory up to date to get accurate freshness alerts.`
                                    : "You haven't added any produce yet. Once you log your first item, FreshTrack will start tracking its freshness and showing you real-time metrics right here."}
                            </p>
                        </div>
                        <Link href={route('products')} className={`whitespace-nowrap px-7 py-3.5 text-sm ${ctaClasses}`}>
                            <i className={`fa-solid ${hasProducts ? 'fa-boxes-stacked' : 'fa-plus'} text-xs`}></i>{' '}
                            {hasProducts ? 'Manage Products' : 'Add First Item'}
                        </Link>
                    </div>
                </section>

                {/* ============ SYSTEM OVERVIEW ============ */}
                <section>
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900">System Overview</h2>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                            <span className={`h-1.5 w-1.5 rounded-full ${hasProducts ? 'bg-forest-600' : 'bg-slate-300'}`}></span>
                            {hasProducts ? 'Live data' : 'No data yet'}
                        </span>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {metrics.map((m) => (
                            <div key={m.label} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
                                <div className="mb-5 flex items-center justify-between">
                                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${m.active ? tones[m.tone].box : 'bg-slate-50'}`}>
                                        <i className={`${m.icon} text-lg ${m.active ? tones[m.tone].icon : 'text-slate-300'}`}></i>
                                    </span>
                                </div>
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{m.label}</p>
                                <p className={`text-2xl font-extrabold sm:text-3xl ${m.active ? 'text-slate-900' : 'text-slate-300'}`}>{m.value}</p>
                                <p className="mt-2 text-xs text-slate-400">{m.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ============ ANALYTICS PLACEHOLDER + ALERTS ============ */}
                <section className="grid gap-6 lg:grid-cols-3">
                    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-10 text-center lg:col-span-2">
                        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-50">
                            <i className="fa-solid fa-chart-column text-2xl text-forest-600"></i>
                        </span>
                        <h3 className="mb-2 text-base font-bold text-slate-900">No analytics yet</h3>
                        <p className="max-w-sm text-sm text-slate-500">
                            Once you start logging and selling stock, your waste-vs-profit trends will appear here automatically.
                        </p>
                    </div>

                    {attention.length > 0 ? (
                        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                                    <i className="fa-solid fa-bell text-amber-500"></i>
                                </span>
                                <h3 className="text-base font-bold text-slate-900">Freshness Alerts</h3>
                            </div>
                            <ul className="space-y-3">
                                {attention.slice(0, 5).map((p) => (
                                    <li key={p.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                                        <span className="truncate text-sm font-semibold text-slate-800">
                                            {CATEGORY_ICONS[p.category] || '📦'} {p.product}
                                        </span>
                                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${p.status.className}`}>
                                            {p.status.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center">
                            <span className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${hasProducts ? 'bg-forest-50' : 'bg-amber-50'}`}>
                                <i className={`text-2xl ${hasProducts ? 'fa-solid fa-circle-check text-forest-600' : 'fa-solid fa-bell text-amber-500'}`}></i>
                            </span>
                            <h3 className="mb-2 text-base font-bold text-slate-900">{hasProducts ? 'No alerts right now' : 'No alerts yet'}</h3>
                            <p className="text-sm text-slate-500">
                                {hasProducts
                                    ? 'All your stock is fresh. Alerts will appear here when items get close to expiry.'
                                    : 'Freshness alerts will show up here as soon as you log your first batch of stock.'}
                            </p>
                        </div>
                    )}
                </section>

                {/* ============ LIVE INVENTORY ============ */}
                <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-7">
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Live Stall Inventory</h3>
                            <p className="mt-1 text-xs text-slate-500">
                                {hasProducts ? 'Closest to expiry first' : 'Your logged stock batches will appear here'}
                            </p>
                        </div>
                        <Link href={route('products')} className="text-xs font-bold text-forest-600 hover:text-forest-700">
                            Go to Product Management →
                        </Link>
                    </div>

                    {hasProducts ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                                        <th className="pb-3 pr-4">Product</th>
                                        <th className="pb-3 pr-4">Batch ID</th>
                                        <th className="pb-3 pr-4">Quantity</th>
                                        <th className="pb-3 pr-4">Stock Value</th>
                                        <th className="pb-3 pr-4">Expiry Date</th>
                                        <th className="pb-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {soonest.map((p) => (
                                        <tr key={p.id} className="transition-colors hover:bg-slate-50/60">
                                            <td className="py-4 pr-4 font-semibold text-slate-800">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-50 text-sm">
                                                        {CATEGORY_ICONS[p.category] || '📦'}
                                                    </span>
                                                    {p.product}
                                                </div>
                                            </td>
                                            <td className="py-4 pr-4 text-slate-500">{p.batch_id || '—'}</td>
                                            <td className="py-4 pr-4 font-semibold text-slate-700">{p.quantity || '—'}</td>
                                            <td className="py-4 pr-4 font-semibold text-slate-700">{formatMoney(p.value)}</td>
                                            <td className="py-4 pr-4 text-slate-500">{formatDate(p.expiry_date)}</td>
                                            <td className="py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-bold ${p.status.className}`}>{p.status.label}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
                            <span className="mb-5 flex h-16 w-16 animate-floaty-sm items-center justify-center rounded-2xl bg-forest-50">
                                <i className="fa-solid fa-box-open text-2xl text-forest-600"></i>
                            </span>
                            <h3 className="mb-2 text-lg font-bold text-slate-900">Your inventory is empty</h3>
                            <p className="mb-6 max-w-sm text-sm text-slate-500">
                                Start by logging your first batch of fruits, vegetables, meats, or dairy — it only takes a few seconds.
                            </p>
                            <Link href={route('products')} className={`px-7 py-3.5 text-sm ${ctaClasses}`}>
                                <i className="fa-solid fa-plus text-xs"></i> Log Your First Stock
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </DashboardLayout>
    );
}
