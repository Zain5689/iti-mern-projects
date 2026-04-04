import { NextResponse } from "next/server";
import { API } from "../../api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const res = await fetch(`${API}recipes/${id}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Recipe not found in external API" },
        { status: 404 },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
