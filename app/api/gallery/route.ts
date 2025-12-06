import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { readDataFile, writeDataFile } from "@/lib/dataManager";

export async function GET() {
  try {
    const data = await readDataFile<{ galleryImages: any[] }>("restaurantData.ts");
    // Ensure we always return an array
    const images = Array.isArray(data.galleryImages) ? data.galleryImages : [];
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error reading gallery data:", error);
    // Return empty array instead of error to prevent frontend crash
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newImage = await request.json();
    const data = await readDataFile<any>("restaurantData.ts");
    
    const maxId = Math.max(...data.galleryImages.map((img: any) => img.id), 0);
    newImage.id = maxId + 1;

    data.galleryImages.push(newImage);
    await writeDataFile("restaurantData.ts", data, "{ restaurantInfo, galleryImages }");

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error("Error adding gallery image:", error);
    return NextResponse.json({ error: "Failed to add gallery image" }, { status: 500 });
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

    const data = await readDataFile<any>("restaurantData.ts");
    data.galleryImages = data.galleryImages.filter((img: any) => img.id !== parseInt(id));
    await writeDataFile("restaurantData.ts", data, "{ restaurantInfo, galleryImages }");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}




