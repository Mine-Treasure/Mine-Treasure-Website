/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = {
            repo_owner: process.env.VERCEL_GIT_REPO_OWNER || 'developer',
            repo_name: process.env.VERCEL_GIT_REPO_SLUG || 'Mine-Treasure',
            commit_ref: process.env.VERCEL_GIT_COMMIT_REF || 'main',
            commit_sha: process.env.VERCEL_GIT_COMMIT_SHA || 'lol',
            commit_msg: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'This is a fallback message',
        };
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({
            repo_owner: 'developer',
            repo_name: 'Mine-Treasure',
            commit_ref: 'main',
            commit_sha: 'lol',
            commit_msg: 'This is a fallback message',
        });
    }
}