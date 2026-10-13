/** Green showcase panel shown beside the login / sign-up forms (desktop only). */
export default function AuthPanel({
    badgeIcon,
    badgeText,
    heading,
    body,
    cardTitle,
    stat,
    checklist = [],
    minHeight = 'min-h-[560px]',
    className = '',
}) {
    return (
        <div className={`relative hidden lg:block ${className}`}>
            <div className={`gradient-panel relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-10 shadow-2xl ${minHeight}`}>
                <div className="relative z-10">
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        <i className={badgeIcon}></i>
                        {badgeText}
                    </span>
                    <h2 className="mb-3 text-3xl font-extrabold leading-tight text-white">{heading}</h2>
                    <p className="max-w-sm text-sm leading-relaxed text-forest-100">{body}</p>
                </div>

                {/* Floating preview card */}
                <div className="relative z-10 mt-10">
                    <div className="max-w-sm animate-floaty rounded-2xl bg-white p-5 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{cardTitle}</p>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-50">
                                <i className="fa-solid fa-store text-xs text-forest-600"></i>
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between rounded-lg bg-forest-50 px-3 py-2.5">
                                <span className="text-xs font-bold text-slate-900">🍎 Apples</span>
                                <span className="rounded-full bg-forest-100 px-2 py-0.5 text-[10px] font-bold text-forest-700">Fresh</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2.5">
                                <span className="text-xs font-bold text-slate-900">🍅 Tomatoes</span>
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">2 Days Left</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute -bottom-6 -right-4 w-40 animate-floaty rounded-xl bg-white px-4 py-3 shadow-xl"
                        style={{ animationDelay: '1.2s' }}
                    >
                        <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">{stat.label}</p>
                        <p className="text-xl font-extrabold text-forest-600">{stat.value}</p>
                    </div>
                </div>

                {checklist.length > 0 && (
                    <div className="relative z-10 mt-14 space-y-4">
                        {checklist.map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                                    <i className="fa-solid fa-check text-xs text-white"></i>
                                </span>
                                <p className="text-sm font-medium text-white">{item}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl"></div>
            </div>

            <div className="mt-6 flex items-center gap-3 px-2">
                <span className="text-sm tracking-tight text-coral-500">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                    ))}
                </span>
                <p className="text-sm font-semibold text-slate-600">Trusted by 500+ Local Market Vendors &amp; Fresh Sellers</p>
            </div>
        </div>
    );
}
