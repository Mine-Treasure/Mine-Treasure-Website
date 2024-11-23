/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = {
            repo_owner: process.env.VERCEL_GIT_REPO_OWNER,
            repo_name: process.env.VERCEL_GIT_REPO_SLUG,
            commit_ref: process.env.VERCEL_GIT_COMMIT_REF,
            commit_sha: process.env.VERCEL_GIT_COMMIT_SHA,
            commit_msg: process.env.VERCEL_GIT_COMMIT_MESSAGE,
        };
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch GitHub data' },
            { status: 500 }
        );
    }
}