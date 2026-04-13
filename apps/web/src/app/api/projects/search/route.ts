import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { searchProjects } from "@my-site/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim() === "") {
      return NextResponse.json({ projects: [] });
    }

    const supabase = createServerClient();
    const projects = await searchProjects(supabase, query.trim());

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search projects" },
      { status: 500 }
    );
  }
}
