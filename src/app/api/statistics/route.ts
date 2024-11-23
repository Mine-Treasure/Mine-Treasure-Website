import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { StatData } from '@/types/types';
import { RowDataPacket } from 'mysql2';

const generateFallbackData = (): StatData[] => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - (29 - i));
        return {
            downloads: 10000 + Math.floor(Math.random() * 5000),
            mrdownloads: 100 + Math.floor(Math.random() * 100),
            views: 9999 + Math.floor(Math.random() * 1000),
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            id: i + 1
        };
    });
};

export async function GET() {
    if (!pool) {
        return NextResponse.json(generateFallbackData());
    }

    try {
        const [results] = await pool.query<(StatData & RowDataPacket)[]>(
            'SELECT * FROM (SELECT downloads, mrdownloads, views, date, id FROM stats ORDER BY id DESC LIMIT 30) as stats ORDER BY id ASC'
        );

        if (!results || results.length === 0) {
            return NextResponse.json(generateFallbackData());
        }

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
        return NextResponse.json(generateFallbackData());
    }
}
