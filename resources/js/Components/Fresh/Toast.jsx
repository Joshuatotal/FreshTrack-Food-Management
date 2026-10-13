/** Top-right toast. Mount it with a changing `key` to replay the in/out animation. */
export default function Toast({ message, type = 'success' }) {
    const danger = type === 'danger';

    return (
        <div
            role="status"
            className="fixed right-6 top-6 z-[60] flex animate-toast items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-2xl"
        >
            <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${danger ? 'bg-red-100' : 'bg-forest-100'}`}
            >
                <i
                    className={`text-sm ${danger ? 'fa-solid fa-trash-can text-red-500' : 'fa-solid fa-check text-forest-600'}`}
                ></i>
            </span>
            <p className="text-sm font-semibold text-slate-800">{message}</p>
        </div>
    );
}
