"use client";

import { useCheklistContext } from '../context/CheklistContext';

export default function SingleCheklistViewerForm() {
    const {
        setCheklistEntry,
        isLoading,
        setIsLoading,
        error,
        setError
    } = useCheklistContext();

    const getCheklistEntry = async (cheklistSlug: string, userEmail: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `/api/cheklistEntry?slug=${encodeURIComponent(cheklistSlug)}&email=${encodeURIComponent(userEmail)}`
            );

            let data;
            try {
                data = await res.json();
            } catch (parseError) {
                setCheklistEntry(null);
                throw new Error(`invalid cheklist url format: ${parseError}`);
            }

            if (!res.ok || data.error) {
                setCheklistEntry(null);
                throw new Error(data.error || 'failed to fetch cheklist entry');
            }

            return data;
        } catch (err) {
            setCheklistEntry(null);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('an unexpected error occurred');
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const cheklistUrl = formData.get("cheklist-url") as string;
        const cheklistUserEmail = (formData.get("cheklist-user-email") as string)?.toLowerCase();

        // Validate URL format first
        if (!cheklistUrl.includes('cheklist.io/cheklist/')) {
            setCheklistEntry(null);
            setError('invalid cheklist url format');
            return;
        }

        // Extract slug only after /cheklist/
        const cheklistSlug = cheklistUrl.split('/cheklist/').pop()?.trim() || '';

        // Validate the slug is clean (no slashes or spaces)
        if (!cheklistSlug || cheklistSlug.includes('/') || cheklistSlug.includes(' ')) {
            setCheklistEntry(null);
            setError('invalid cheklist slug format');
            return;
        }

        if (!cheklistUserEmail || typeof cheklistUserEmail !== 'string') {
            setCheklistEntry(null);
            setError('please provide a valid email address');
            return;
        }

        getCheklistEntry(cheklistSlug, cheklistUserEmail)
            .then(response => {
                if (response) {
                    console.log('cheklist entry:', response);
                    setCheklistEntry(response.data);
                }
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
                        className="bg-black text-white"
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
                        className="bg-black text-white"
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

                {error && (
                    <div className="pt-4">
                        <div className="pt-4 text-md text-white bg-pink-600 px-6 py-4 rounded-md">
                            {error}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}