import AuthField from '@/Components/Fresh/AuthField';
import AuthPanel from '@/Components/Fresh/AuthPanel';
import FreshAuthLayout from '@/Layouts/FreshAuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <FreshAuthLayout
            navPrompt="Don't have an account?"
            navAction={
                <Link
                    href={route('register')}
                    className="inline-flex items-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-700 hover:shadow-lg"
                >
                    Create Free Account
                </Link>
            }
        >
            <Head title="Login" />

            {/* Left: login form */}
            <div className="mx-auto w-full max-w-md lg:mx-0">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest-700 shadow-card">
                    <i className="fa-solid fa-seedling text-forest-600"></i>
                    Vendor Login
                </span>

                <h1 className="mb-3 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
                    Welcome back to your <span className="text-forest-600">fresh stall.</span>
                </h1>
                <p className="mb-8 leading-relaxed text-slate-600">
                    Log in to check today's freshness alerts, update your inventory, and keep every sale profitable.
                </p>

                {status && (
                    <div className="mb-4 rounded-xl bg-forest-50 px-4 py-3 text-sm font-medium text-forest-700">{status}</div>
                )}

                <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-card sm:p-9">
                    <form onSubmit={submit} className="space-y-5">
                        <AuthField
                            id="email"
                            label="Email address"
                            icon="fa-regular fa-envelope"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="you@yourstall.com"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                        />

                        <AuthField
                            id="password"
                            label="Password"
                            icon="fa-solid fa-lock"
                            type="password"
                            togglable
                            name="password"
                            value={data.password}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            labelAside={
                                canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-bold text-forest-600 transition-colors hover:text-forest-700"
                                    >
                                        Forgot password?
                                    </Link>
                                )
                            }
                        />

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex cursor-pointer select-none items-center gap-2.5">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-forest-500"
                                />
                                <span className="text-sm font-medium text-slate-600">Keep me signed in</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral-500 px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600 hover:shadow-[0_15px_35px_-8px_rgba(249,115,22,0.6)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            Log In to Your Stall
                            <i className="fa-solid fa-arrow-right text-sm"></i>
                        </button>

                        <div className="flex items-center gap-4 py-2">
                            <span className="h-px flex-1 bg-slate-200"></span>
                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Or continue with</span>
                            <span className="h-px flex-1 bg-slate-200"></span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                <i className="fa-brands fa-google text-coral-500"></i> Google
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                <i className="fa-brands fa-apple text-slate-900"></i> Apple
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-slate-500">
                    New to FreshTrack?{' '}
                    <Link href={route('register')} className="font-bold text-forest-600 transition-colors hover:text-forest-700">
                        Create your free account
                    </Link>
                </p>
            </div>

            {/* Right: visual panel */}
            <AuthPanel
                badgeIcon="fa-solid fa-chart-line"
                badgeText="Your Daily Freshness Snapshot"
                heading="Every login starts with a clear picture of what's fresh, what's not."
                body="Jump straight into your dashboard and pick up right where you left off at the stall."
                cardTitle="Stall Overview"
                stat={{ label: 'Waste Reduced', value: '38.5%' }}
            />
        </FreshAuthLayout>
    );
}
