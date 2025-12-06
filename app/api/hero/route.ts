import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/dataManager";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  mediaType?: "image" | "video";
  active: boolean;
  order: number;
}

export async function GET() {
  try {
    const slides = await readJSON<HeroSlide[]>("heroData.json");
    return NextResponse.json(slides);
  } catch (error) {
    console.error("Error reading hero data:", error);
    return NextResponse.json({ error: "Failed to read hero data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newSlide = await request.json();
    const slides = await readJSON<HeroSlide[]>("heroData.json");
    
    const maxId = Math.max(...slides.map((slide) => parseInt(slide.id)), 0);
    newSlide.id = String(maxId + 1);
    newSlide.order = slides.length + 1;

    slides.push(newSlide);
    await writeJSON("heroData.json", slides);

    return NextResponse.json(newSlide, { status: 201 });
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedSlide = await request.json();
    const slides = await readJSON<HeroSlide[]>("heroData.json");

    const index = slides.findIndex((slide) => slide.id === updatedSlide.id);
    if (index === -1) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }

    slides[index] = updatedSlide;
    await writeJSON("heroData.json", slides);

    return NextResponse.json(updatedSlide);
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    let slides = await readJSON<HeroSlide[]>("heroData.json");
    slides = slides.filter((slide) => slide.id !== id);
    await writeJSON("heroData.json", slides);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
  }
}


