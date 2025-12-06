import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

// Dynamic import for heic-convert (ESM module)
const convertHeic = async (buffer: Buffer): Promise<Buffer> => {
  const heicConvertModule = await import("heic-convert");
  // @ts-ignore - heic-convert doesn't have TypeScript definitions
  const heicConvert = heicConvertModule.default;
  return await heicConvert({
    buffer,
    format: "JPEG",
    quality: 0.9,
  });
};

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);
    let finalFilename = file.name.replace(/\s+/g, "-");
    
    // Check if file is HEIC/HEIF format
    const fileExtension = path.extname(file.name).toLowerCase();
    const isHeic = [".heic", ".heif"].includes(fileExtension);

    if (isHeic) {
      console.log("Converting HEIC to JPEG...");
      try {
        // Convert HEIC to JPEG
        const jpegBuffer = await convertHeic(buffer);
        
        // Optimize with sharp
        // @ts-ignore - Buffer type compatibility
        buffer = await sharp(jpegBuffer)
          .jpeg({ quality: 90 })
          .toBuffer();
        
        // Change extension to .jpg
        finalFilename = finalFilename.replace(/\.(heic|heif)$/i, ".jpg");
        console.log("HEIC conversion successful");
      } catch (conversionError) {
        console.error("HEIC conversion failed:", conversionError);
        return NextResponse.json(
          { error: "Failed to convert HEIC image. Please use JPEG or PNG format." },
          { status: 400 }
        );
      }
    } else {
      // For other image formats, optimize with sharp
      try {
        const imageInfo = await sharp(buffer).metadata();
        
        // Convert to JPEG if it's a supported format
        if (["jpeg", "jpg", "png", "webp"].includes(imageInfo.format || "")) {
          // @ts-ignore - Buffer type compatibility
          buffer = await sharp(buffer)
            .jpeg({ quality: 90 })
            .toBuffer();
          
          // Ensure .jpg extension
          if (![".jpg", ".jpeg"].includes(fileExtension)) {
            finalFilename = finalFilename.replace(/\.\w+$/, ".jpg");
          }
        }
      } catch (sharpError) {
        console.log("Sharp optimization skipped, using original file");
      }
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${finalFilename}`;
    const blobPath = `uploads/${filename}`;

    // Try Vercel Blob Storage first (if token is configured)
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (blobToken) {
      try {
        const blob = await put(blobPath, buffer, {
          access: "public",
          contentType: "image/jpeg",
        });

        if (blob.url) {
          return NextResponse.json({ url: blob.url, filename }, { status: 201 });
        }
      } catch (blobError: any) {
        // If Blob storage fails, fall back to local storage
        console.warn("Vercel Blob upload failed, using local storage:", blobError?.message || blobError);
      }
    }

    // Fallback to local file storage
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }
    
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url, filename }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}




