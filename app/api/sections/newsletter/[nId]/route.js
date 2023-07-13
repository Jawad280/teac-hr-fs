import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const { nId } = params;

    const sections = await db.section.findMany({
        where: {
            nId: nId
        }
    });
    return NextResponse.json(sections);
}