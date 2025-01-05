"use client";

import { useCheklistContext } from '../context/CheklistContext';
import Link from 'next/link';

export default function CheklistViewer() {
    const { cheklistEntry, isLoading } = useCheklistContext();

    if (isLoading) {
        return (
            <div className="py-4">
                <div className="grid">
                    <span className="text-sm text-gray-400">
                        cheklist
                    </span>
                    <div className="px-6 py-4 rounded-md bg-zinc-900">
                        <div className="h-7 w-2/3 bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-full bg-zinc-800 rounded mt-2 animate-pulse" />
                        <div className="h-4 w-1/3 bg-zinc-800 rounded mt-4 animate-pulse" />
                    </div>

                    <div className="pt-8 pb-4">
                        <div className="h-4 w-1/4 bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-1/3 bg-zinc-800 rounded mt-2 animate-pulse" />
                    </div>

                    <div className="grid gap-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-4 w-1/4 bg-zinc-800 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!cheklistEntry) {
        return null;
    }

    return (
        <div className="py-4">
            <div className="grid">

                <span className="text-sm text-gray-400">
                    cheklist
                </span>
                <div
                    className="px-6 py-4 rounded-md bg-zinc-900"
                >
                    <Link
                        href={`${cheklistEntry.cheklist_url}`}
                        target="_blank"
                        className="text-xl font-bold hover:text-pink-500"
                    >
                        {cheklistEntry.cheklist_name}
                    </Link>
                    <p className="text-sm text-gray-400">{cheklistEntry.cheklist_description}</p>

                    <div className="text-sm pt-4">
                        <span className="text-gray-400">
                            by{' '}
                        </span>
                        <Link
                            href={`${cheklistEntry.cheklist_author_url}`}
                            target="_blank"
                            className="hover:text-pink-500"
                        >
                            {cheklistEntry.cheklist_author_name}
                        </Link>
                    </div>
                </div>

                <div className="text-sm pt-8 pb-4">
                    <span className="text-gray-400">entry by user</span>
                    <br />
                    <span>{cheklistEntry.user_email}</span>
                </div>

                <div className="grid gap-2">
                    {Object.entries(cheklistEntry.fields).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={value}
                                readOnly
                                className="h-4 w-4 accent-pink-500"
                            />
                            <span>{key}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}