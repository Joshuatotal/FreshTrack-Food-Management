import FreshModal from '@/Components/Fresh/Modal';
import Toast from '@/Components/Fresh/Toast';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { CATEGORIES, CATEGORY_ICONS, formatDate, getStatus } from '@/lib/freshness';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const EMPTY_FORM = { product: '', batch_id: '', category: CATEGORIES[0], quantity: '', price: '', expiry_date: '' };

const inputClasses =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-colors focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-100';

// Small axios wrapper (axios sends the session cookie + CSRF token automatically).
// Throws { errors } on a Laravel 422; reloads the page if the session has expired.
async function api(url, { method = 'GET', data } = {}) {
    try {
        const response = await axios({ url, method, data, headers: { Accept: 'application/json' } });
        return response.data || null;
    } catch (error) {
        const status = error.response?.status;
        if (status === 422) {
            throw { errors: error.response.data.errors ?? {} };
        }
        if (status === 401 || status === 419) {
            window.location.reload(); // session expired -> back to login
        }
        throw error;
    }
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
            {children}
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // filters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    // add / edit modal
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    // delete modal
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // toast
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => setToast({ id: Date.now(), message, type });

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    useEffect(() => {
        api('/api/products')
            .then(setProducts)
            .catch(() => showToast('Could not load products.', 'danger'))
            .finally(() => setLoading(false));
    }, []);

    // ---------- derived data ----------
    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        return products.filter((p) => {
            const matchesSearch =
                (p.product ?? '').toLowerCase().includes(term) || (p.batch_id ?? '').toLowerCase().includes(term);
            const matchesCategory = category === 'all' || p.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    const stats = useMemo(() => {
        const keys = products.map((p) => getStatus(p.expiry_date).key);
        return {
            total: products.length,
            near: keys.filter((k) => k === 'near').length,
            risk: keys.filter((k) => k === 'risk').length,
        };
    }, [products]);

    // ---------- add / edit ----------
    const openAddModal = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setErrors({});
        setModalOpen(true);
    };

    const openEditModal = (p) => {
        setEditingId(p.id);
        setForm({
            product: p.product ?? '',
            batch_id: p.batch_id ?? '',
            category: p.category ?? CATEGORIES[0],
            quantity: p.quantity ?? '',
            price: p.price ?? '',
            expiry_date: p.expiry_date ?? '',
        });
        setErrors({});
        setModalOpen(true);
    };

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            if (editingId) {
                const updated = await api(`/api/products/${editingId}`, { method: 'PUT', data: form });
                setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
                showToast('Product updated successfully.');
            } else {
                const created = await api('/api/products', { method: 'POST', data: form });
                setProducts((prev) => [created, ...prev]);
                showToast('Product added successfully.');
            }
            setModalOpen(false);
        } catch (err) {
            if (err.errors) {
                // Laravel returns { field: ['message', ...] }
                setErrors(Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v[0]])));
            } else {
                showToast('Something went wrong. Please try again.', 'danger');
            }
        } finally {
            setSaving(false);
        }
    };

    // ---------- delete ----------
    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await api(`/api/products/${deleteTarget.id}`, { method: 'DELETE' });
            setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
            showToast('Product deleted.', 'danger');
            setDeleteTarget(null);
        } catch {
            showToast('Could not delete product.', 'danger');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <DashboardLayout
            title="Product Management"
            search={{
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: 'Search products...',
            }}
        >
            <Head title="Products" />

            <div className="space-y-6">
                {/* ============ PAGE HEADER + ADD BUTTON ============ */}
                <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Your Products</h2>
                        <p className="mt-1 text-sm text-slate-500">Add, edit, and manage every item in your stall inventory.</p>
                    </div>
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-coral-500 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600"
                    >
                        <i className="fa-solid fa-plus text-xs"></i> Add New Product
                    </button>
                </section>

                {/* ============ SUMMARY CHIPS ============ */}
                <section className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Products', value: stats.total, icon: 'fa-solid fa-boxes-stacked text-forest-600', bg: 'bg-forest-50' },
                        { label: 'Near Expiry', value: stats.near, icon: 'fa-solid fa-triangle-exclamation text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Spoilage Risk', value: stats.risk, icon: 'fa-solid fa-trash-can text-red-500', bg: 'bg-red-50' },
                    ].map((chip) => (
                        <div key={chip.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
                            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${chip.bg}`}>
                                <i className={chip.icon}></i>
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{chip.label}</p>
                                <p className="text-xl font-extrabold text-slate-900">{chip.value}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* ============ PRODUCT TABLE ============ */}
                <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-7">
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <h3 className="text-base font-bold text-slate-900">Product List</h3>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-full border border-slate-200 bg-white py-2 pl-4 pr-9 text-xs font-semibold text-slate-600 focus:border-forest-500 focus:outline-none focus:ring-0"
                        >
                            <option value="all">All Categories</option>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filtered.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                                        <th className="pb-3 pr-4">Product</th>
                                        <th className="pb-3 pr-4">Batch ID</th>
                                        <th className="pb-3 pr-4">Category</th>
                                        <th className="pb-3 pr-4">Quantity</th>
                                        <th className="pb-3 pr-4">Unit Price</th>
                                        <th className="pb-3 pr-4">Expiry Date</th>
                                        <th className="pb-3 pr-4">Status</th>
                                        <th className="pb-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filtered.map((p) => {
                                        const status = getStatus(p.expiry_date);
                                        return (
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
                                                <td className="py-4 pr-4 text-slate-500">{p.category || '—'}</td>
                                                <td className="py-4 pr-4 font-semibold text-slate-700">{p.quantity || '—'}</td>
                                                <td className="py-4 pr-4 font-semibold text-slate-700">${Number(p.price).toFixed(2)}</td>
                                                <td className="py-4 pr-4 text-slate-500">{formatDate(p.expiry_date)}</td>
                                                <td className="py-4 pr-4">
                                                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${status.className}`}>
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap py-4 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(p)}
                                                        aria-label={`Edit ${p.product}`}
                                                        className="mr-1 h-8 w-8 rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-forest-600"
                                                    >
                                                        <i className="fa-solid fa-pen text-xs"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteTarget(p)}
                                                        aria-label={`Delete ${p.product}`}
                                                        className="h-8 w-8 rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-500"
                                                    >
                                                        <i className="fa-solid fa-trash-can text-xs"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && filtered.length === 0 && (
                        <div className="mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
                            <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-50">
                                <i className="fa-solid fa-box-open text-2xl text-forest-600"></i>
                            </span>
                            <h3 className="mb-2 text-lg font-bold text-slate-900">No products found</h3>
                            <p className="mb-6 max-w-sm text-sm text-slate-500">
                                Try adjusting your search or filters, or add a new product to your stall inventory.
                            </p>
                            <button
                                type="button"
                                onClick={openAddModal}
                                className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-600"
                            >
                                <i className="fa-solid fa-plus text-xs"></i> Add New Product
                            </button>
                        </div>
                    )}

                    {loading && <p className="py-10 text-center text-sm text-slate-400">Loading products…</p>}
                </section>
            </div>

            {/* ============ ADD / EDIT PRODUCT MODAL ============ */}
            <FreshModal show={modalOpen} onClose={() => !saving && setModalOpen(false)}>
                <div className="p-7 sm:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            aria-label="Close"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Field label="Product name" error={errors.product}>
                            <input
                                type="text"
                                name="product"
                                value={form.product}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Tomatoes"
                                className={inputClasses}
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Batch ID" error={errors.batch_id}>
                                <input
                                    type="text"
                                    name="batch_id"
                                    value={form.batch_id}
                                    onChange={handleChange}
                                    required
                                    placeholder="#T-118"
                                    className={inputClasses}
                                />
                            </Field>
                            <Field label="Category" error={errors.category}>
                                <select name="category" value={form.category} onChange={handleChange} required className={inputClasses}>
                                    {CATEGORIES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Quantity" error={errors.quantity}>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={form.quantity}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. 32 kg"
                                    className={inputClasses}
                                />
                            </Field>
                            <Field label="Unit price ($)" error={errors.price}>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="2.70"
                                    className={inputClasses}
                                />
                            </Field>
                        </div>

                        <Field label="Expiry date" error={errors.expiry_date}>
                            <input
                                type="date"
                                name="expiry_date"
                                value={form.expiry_date}
                                onChange={handleChange}
                                required
                                className={inputClasses}
                            />
                        </Field>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="flex-1 rounded-full border border-slate-200 py-3 text-center text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-forest-600 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <i className="fa-solid fa-check text-xs"></i>
                                {saving ? 'Saving…' : editingId ? 'Update Product' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </FreshModal>

            {/* ============ DELETE CONFIRMATION MODAL ============ */}
            <FreshModal show={deleteTarget !== null} onClose={() => !deleting && setDeleteTarget(null)} maxWidth="max-w-sm">
                <div className="p-7 text-center sm:p-8">
                    <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                        <i className="fa-solid fa-trash-can text-xl text-red-500"></i>
                    </span>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">Delete this product?</h3>
                    <p className="mb-7 text-sm text-slate-500">
                        This will permanently remove{' '}
                        <span className="font-semibold text-slate-700">{deleteTarget?.product ?? 'this item'}</span> from your stall
                        inventory. This action cannot be undone.
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setDeleteTarget(null)}
                            className="flex-1 rounded-full border border-slate-200 py-3 text-center text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            disabled={deleting}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-500 py-3 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:opacity-60"
                        >
                            <i className="fa-solid fa-trash-can text-xs"></i> Delete
                        </button>
                    </div>
                </div>
            </FreshModal>

            {toast && <Toast key={toast.id} message={toast.message} type={toast.type} />}
        </DashboardLayout>
    );
}
