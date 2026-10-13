import AuthField from '@/Components/Fresh/AuthField';
import AuthPanel from '@/Components/Fresh/AuthPanel';
import InputError from '@/Components/InputError';
import FreshAuthLayout from '@/Layouts/FreshAuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// 0–4 score for the strength bar under the password field
function passwordStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Za-z]/.test(pw) && /\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        stall_name: '',
        email: '',
        password: '',
        password_confirmation: '', // the design has one password field; it is mirrored here
        terms: false,
    });

    const strength = passwordStrength(data.password);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <FreshAuthLayout
            innerClassName="lg:py-16"
            navPrompt="Already have an account?"
            navAction={
                <Link
                    href={route('login')}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-forest-300 hover:text-forest-700"
                >
                    Log In
                </Link>
            }
        >
            <Head title="Create Account" />

            {/* Left: visual panel */}
            <AuthPanel
                className="order-2 lg:order-1"
                minHeight="min-h-[640px]"
                badgeIcon="fa-solid fa-seedling"
                badgeText="Join 500+ Market Vendors"
                heading="Start turning potential waste into real profit, today."
                body="Create your free account in under two minutes and log your very first batch of stock before you even leave the stall."
                cardTitle="New Account Setup"
                stat={{ label: 'Setup Time', value: '< 2 min' }}
                checklist={[
                    'Free forever plan, no credit card required',
                    'Set up your stall inventory in minutes',
                    'Get smart freshness alerts from day one',
                ]}
            />

            {/* Right: sign-up form */}
            <div className="order-1 mx-auto w-full max-w-md lg:order-2">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest-700 shadow-card">
                    <i className="fa-solid fa-user-plus text-forest-600"></i>
                    Create Your Account
                </span>

                <h1 className="mb-3 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
                    Set up your <span className="text-forest-600">fresh stall</span> in minutes.
                </h1>
                <p className="mb-8 leading-relaxed text-slate-600">
                    Start tracking freshness, cutting waste, and protecting your profit — completely free to get started.
                </p>

                <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-card sm:p-9">
                    <form onSubmit={submit} className="space-y-5">
                        <AuthField
                            id="name"
                            label="Full name"
                            icon="fa-regular fa-user"
                            name="name"
                            value={data.name}
                            placeholder="Jane Appleseed"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />

                        <AuthField
                            id="stall_name"
                            label="Stall / business name"
                            icon="fa-solid fa-store"
                            name="stall_name"
                            value={data.stall_name}
                            placeholder="Green Valley Produce"
                            autoComplete="organization"
                            onChange={(e) => setData('stall_name', e.target.value)}
                            error={errors.stall_name}
                            required
                        />

                        <AuthField
                            id="email"
                            label="Email address"
                            icon="fa-regular fa-envelope"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="you@yourstall.com"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            required
                        />

                        <AuthField
                            id="password"
                            label="Password"
                            icon="fa-solid fa-lock"
                            type="password"
                            togglable
                            name="password"
                            value={data.password}
                            placeholder="Create a secure password"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                    password_confirmation: e.target.value,
                                }))
                            }
                            error={errors.password}
                            required
                        >
                            <div className="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
                                {[0, 1, 2, 3].map((i) => (
                                    <span
                                        key={i}
                                        className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength ? 'bg-forest-600' : 'bg-slate-200'}`}
                                    ></span>
                                ))}
                            </div>
                            <p className="mt-1.5 text-xs text-slate-400">Use 8+ characters with a mix of letters &amp; numbers</p>
                        </AuthField>

                        <div className="pt-1">
                            <label className="flex cursor-pointer select-none items-start gap-2.5">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={data.terms}
                                    onChange={(e) => setData('terms', e.target.checked)}
                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-forest-500"
                                    required
                                />
                                <span className="text-sm leading-relaxed text-slate-600">
                                    I agree to FreshTrack's{' '}
                                    <a href="#" className="font-bold text-forest-600 transition-colors hover:text-forest-700">Terms of Service</a>{' '}
                                    and{' '}
                                    <a href="#" className="font-bold text-forest-600 transition-colors hover:text-forest-700">Privacy Policy</a>
                                </span>
                            </label>
                            <InputError message={errors.terms} className="mt-2" />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral-500 px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600 hover:shadow-[0_15px_35px_-8px_rgba(249,115,22,0.6)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            Create Free Account
                            <i className="fa-solid fa-arrow-right text-sm"></i>
                        </button>

                        <div className="flex items-center gap-4 py-2">
                            <span className="h-px flex-1 bg-slate-200"></span>
                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Or sign up with</span>
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
                    Already tracking with FreshTrack?{' '}
                    <Link href={route('login')} className="font-bold text-forest-600 transition-colors hover:text-forest-700">
                        Log in to your account
                    </Link>
                </p>
            </div>
        </FreshAuthLayout>
    );
}
