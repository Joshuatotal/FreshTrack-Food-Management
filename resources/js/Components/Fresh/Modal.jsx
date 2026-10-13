import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

/** Rounded dialog matching the FreshTrack design (backdrop click + Esc close it). */
export default function FreshModal({ show, onClose, maxWidth = 'max-w-lg', children }) {
    return (
        <Transition show={show}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/55" aria-hidden="true" />
                </TransitionChild>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        enter="ease-out duration-250"
                        enterFrom="opacity-0 translate-y-4 scale-95"
                        enterTo="opacity-100 translate-y-0 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0 scale-100"
                        leaveTo="opacity-0 translate-y-4 scale-95"
                    >
                        <DialogPanel className={`max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-white shadow-2xl ${maxWidth}`}>
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
