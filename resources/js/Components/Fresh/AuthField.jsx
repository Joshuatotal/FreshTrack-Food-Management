import { forwardRef, useState } from 'react';
import InputError from '@/Components/InputError';

/**
 * Icon-prefixed input used on the login / sign-up pages.
 * Pass `togglable` on a password field to get the show/hide eye button.
 * `labelAside` renders on the right of the label row (e.g. "Forgot password?").
 */
const AuthField = forwardRef(function AuthField(
    { id, label, icon, error, togglable = false, labelAside = null, type = 'text', children, ...props },
    ref,
) {
    const [visible, setVisible] = useState(false);
    const inputType = togglable && visible ? 'text' : type;

    return (
        <div>
            <div className={labelAside ? 'mb-2 flex items-center justify-between' : ''}>
                <label htmlFor={id} className={`block text-sm font-semibold text-slate-700 ${labelAside ? '' : 'mb-2'}`}>
                    {label}
                </label>
                {labelAside}
            </div>

            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <i className={`${icon} text-sm`}></i>
                </span>

                <input
                    {...props}
                    ref={ref}
                    id={id}
                    type={inputType}
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 text-sm font-medium text-slate-900 placeholder-slate-400 transition-colors focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-100 ${
                        togglable ? 'pr-11' : 'pr-4'
                    } ${error ? 'border-red-300' : 'border-slate-200'}`}
                />

                {togglable && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        aria-label={visible ? 'Hide password' : 'Show password'}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                    >
                        <i className={`${visible ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} text-sm`}></i>
                    </button>
                )}
            </div>

            {children}
            <InputError message={error} className="mt-2" />
        </div>
    );
});

export default AuthField;
