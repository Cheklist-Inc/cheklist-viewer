import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cheklistSlug = searchParams.get('slug');
    const userEmail = searchParams.get('email');

    if (!cheklistSlug || !userEmail) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const res = await fetch(
        `https://cheklist.io/api/cheklist/${cheklistSlug}/user/${userEmail}`,
        {
            headers: {
                'Authorization': `Bearer ${process.env.CHEKLIST_API_TOKEN}`
            }
        }
    );

    const data = await res.json();
    return NextResponse.json(data);
}