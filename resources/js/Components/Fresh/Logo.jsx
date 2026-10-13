import { Link } from '@inertiajs/react';

export default function Logo({ href = '/', className = '', animated = false }) {
    return (
        <Link href={href} className={`group flex items-center gap-2.5 ${className}`}>
            <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-forest-600 to-forest-800 shadow-soft ${
                    animated ? 'transition-transform group-hover:scale-105' : ''
                }`}
            >
                <i className="fa-solid fa-leaf text-lg text-white"></i>
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Fresh<span className="text-forest-600">Track</span>
            </span>
        </Link>
    );
}
