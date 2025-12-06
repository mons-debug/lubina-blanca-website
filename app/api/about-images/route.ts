import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { readDataFile, writeDataFile } from "@/lib/dataManager";

export async function GET() {
  try {
    const data = await readDataFile<{ aboutImages: any[] }>("restaurantData.ts");
    // Ensure we always return an array
    const images = Array.isArray(data.aboutImages) ? data.aboutImages : [];
    // Sort by order
    images.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error reading about images:", error);
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
    
    if (!data.aboutImages) {
      data.aboutImages = [];
    }

    const maxId = Math.max(...data.aboutImages.map((img: any) => img.id), 0);
    const maxOrder = Math.max(...data.aboutImages.map((img: any) => img.order || 0), 0);
    
    newImage.id = maxId + 1;
    newImage.order = newImage.order || maxOrder + 1;

    data.aboutImages.push(newImage);
    await writeDataFile("restaurantData.ts", data, "{ restaurantInfo, galleryImages, aboutImages }");

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error("Error adding about image:", error);
    return NextResponse.json({ error: "Failed to add about image" }, { status: 500 });
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
    data.aboutImages = data.aboutImages.filter((img: any) => img.id !== parseInt(id));
    await writeDataFile("restaurantData.ts", data, "{ restaurantInfo, galleryImages, aboutImages }");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting about image:", error);
    return NextResponse.json({ error: "Failed to delete about image" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await request.json();
    const data = await readDataFile<any>("restaurantData.ts");
    
    if (!data.aboutImages) {
      return NextResponse.json({ error: "No about images found" }, { status: 404 });
    }

    // Update images with new data (e.g., order changes)
    data.aboutImages = data.aboutImages.map((img: any) => {
      const update = updates.find((u: any) => u.id === img.id);
      return update ? { ...img, ...update } : img;
    });

    await writeDataFile("restaurantData.ts", data, "{ restaurantInfo, galleryImages, aboutImages }");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating about images:", error);
    return NextResponse.json({ error: "Failed to update about images" }, { status: 500 });
  }
}

