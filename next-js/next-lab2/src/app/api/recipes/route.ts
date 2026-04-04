import { API } from "@/app/api/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${API}recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY || "",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Proxy Fetch Failed" }, { status: 500 });
  }
}
