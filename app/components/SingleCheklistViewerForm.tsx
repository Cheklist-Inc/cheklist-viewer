"use client";

import { useCheklistContext } from '../context/CheklistContext';

export default function SingleCheklistViewerForm() {
    const { setCheklistEntry, isLoading, setIsLoading } = useCheklistContext();

    const getCheklistEntry = async (cheklistSlug: string, userEmail: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `/api/cheklistEntry?slug=${encodeURIComponent(cheklistSlug)}&email=${encodeURIComponent(userEmail)}`
            );

            if (!res.ok) {
                console.log('failed to fetch cheklist entry');
                return;
            }

            return res.json();
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const cheklistUrl = formData.get("cheklist-url") as string;
        const cheklistUserEmail = formData.get("cheklist-user-email");

        const cheklistSlug = cheklistUrl.split('/cheklist/').pop() || '';
        if (!cheklistSlug) {
            console.log('no slug found after /cheklist/');
            return;
        }

        if (!cheklistUserEmail || typeof cheklistUserEmail !== 'string') {
            console.log('no user email found');
            return;
        }

        getCheklistEntry(cheklistSlug, cheklistUserEmail)
            .then(response => {
                console.log('cheklist entry:', response);
                setCheklistEntry(response.data);
            })
            .catch(error => {
                console.error('error fetching cheklist entry:', error);
            });
    }

    return (
        <div className="py-4">
            <form
                onSubmit={handleSubmit}
                className="grid gap-2"
            >
                <div
                    className="form-field-wrapper"
                >
                    <label htmlFor="cheklist-url">
                        cheklist url
                    </label>
                    <input
                        type="text"
                        id="cheklist-url"
                        name="cheklist-url"
                    />
                    <div className="text-sm text-gray-400 pt-1">
                        ex: https://cheklist.io/cheklist/cheklist-viewer-test
                    </div>
                </div>

                <div
                    className="form-field-wrapper"
                >
                    <label htmlFor="cheklist-user-email">
                        user email
                    </label>
                    <input
                        type="text"
                        id="cheklist-user-email"
                        name="cheklist-user-email"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="relative"
                >
                    {isLoading ? (
                        <>
                            <span className="opacity-0">get entry</span>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </div>
                        </>
                    ) : (
                        'get entry'
                    )}
                </button>
            </form>
        </div>
    );
}