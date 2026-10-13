// Helpers for expiry / freshness status used by the Products page.

export const CATEGORIES = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Leafy Greens'];

export const CATEGORY_ICONS = {
    Fruits: '🍎',
    Vegetables: '🥕',
    Dairy: '🥛',
    Meat: '🥩',
    'Leafy Greens': '🥬',
};

// "2026-10-18" -> local Date (avoids the UTC off-by-one you get from new Date('2026-10-18'))
export function parseLocalDate(value) {
    if (!value) return null;
    const [y, m, d] = String(value).slice(0, 10).split('-').map(Number);
    return new Date(y, m - 1, d);
}

export function daysUntil(expiry) {
    const exp = parseLocalDate(expiry);
    if (!exp) return null;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((exp - today) / 86400000);
}

// key: 'risk' (expires today / expired) | 'near' (<= 2 days) | 'fresh' | 'unknown'
export function getStatus(expiry) {
    const days = daysUntil(expiry);
    if (days === null) return { key: 'unknown', label: 'No expiry', className: 'text-slate-600 bg-slate-100' };
    if (days < 0) return { key: 'risk', label: 'Expired', className: 'text-red-700 bg-red-100' };
    if (days === 0) return { key: 'risk', label: 'Expires Today', className: 'text-red-700 bg-red-100' };
    if (days <= 2) return { key: 'near', label: `${days} ${days === 1 ? 'Day' : 'Days'} Left`, className: 'text-amber-700 bg-amber-100' };
    return { key: 'fresh', label: 'Fresh', className: 'text-forest-700 bg-forest-100' };
}

export function formatDate(value) {
    const d = parseLocalDate(value);
    return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
}

export function todayLabel() {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// "23" -> 23, "32 kg" -> 32, "a few" -> 0
export function parseQuantity(value) {
    const n = parseFloat(String(value ?? '').replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
}

// Stock value of one product line = unit price x quantity
export function productValue(product) {
    return (Number(product.price) || 0) * parseQuantity(product.quantity);
}

export function formatMoney(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
