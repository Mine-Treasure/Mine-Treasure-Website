import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { StatData } from '@/types/types';
import { RowDataPacket } from 'mysql2';

export async function GET() {
    if (!pool) {
        return NextResponse.json({ error: true });
    }

    try {
        const [results] = await pool.query<(StatData & RowDataPacket)[]>(
            'SELECT * FROM (SELECT downloads, mrdownloads, views, date, id FROM stats ORDER BY id DESC LIMIT 30) as stats ORDER BY id ASC'
        );

        const formattedResults = results.map(result => {
            const d = new Date(result.date);
            return {
                ...result,
                date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
            };
        });

        return NextResponse.json(formattedResults);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
