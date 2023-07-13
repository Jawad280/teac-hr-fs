import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const { nId, teacherId } = params;

    const sections = await db.section.findMany({
        where: {
            nId: nId,
            teacherId: teacherId
        }
    });
    return NextResponse.json(sections);
}