import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    return res.json({
        repo_owner: process.env.VERCEL_GIT_REPO_OWNER,
        repo_name: process.env.VERCEL_GIT_REPO_SLUG,
        commit_ref: process.env.VERCEL_GIT_COMMIT_REF,
        commit_sha: process.env.VERCEL_GIT_COMMIT_SHA,
        commit_msg: process.env.VERCEL_GIT_COMMIT_MESSAGE,
    });
}
