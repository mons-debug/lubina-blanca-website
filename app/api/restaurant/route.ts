import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { readDataFile, writeDataFile } from "@/lib/dataManager";

export async function GET() {
  try {
    const data = await readDataFile<{ restaurantInfo: any }>("restaurantData.ts");
    return NextResponse.json(data.restaurantInfo);
  } catch (error) {
    console.error("Error reading restaurant data:", error);
    return NextResponse.json({ error: "Failed to read restaurant data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedInfo = await request.json();
    const data = await readDataFile<any>("restaurantData.ts");
    
    data.restaurantInfo = updatedInfo;
    await writeDataFile("restaurantData.ts", data, "{ restaurantInfo, galleryImages }");

    return NextResponse.json(updatedInfo);
  } catch (error) {
    console.error("Error updating restaurant data:", error);
    return NextResponse.json({ error: "Failed to update restaurant data" }, { status: 500 });
  }
}




