/**
 * Migration script to upload all existing images from /public/uploads to Vercel Blob Storage
 * 
 * Usage:
 * 1. Set BLOB_READ_WRITE_TOKEN in your .env.local file
 * 2. Run: npx tsx scripts/migrate-images.ts
 */

import { put } from "@vercel/blob";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { readDataFile, writeDataFile } from "../lib/dataManager";

interface ImageMapping {
  oldPath: string;
  newUrl: string;
}

async function migrateImages() {
  const uploadsDir = join(process.cwd(), "public", "uploads");
  
  try {
    // Read all files from uploads directory
    const files = await readdir(uploadsDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to migrate...`);

    const mappings: ImageMapping[] = [];

    // Upload each image to Vercel Blob
    for (const file of imageFiles) {
      try {
        const filePath = join(uploadsDir, file);
        const buffer = await readFile(filePath);
        const blobPath = `uploads/${file}`;

        console.log(`Uploading ${file}...`);
        
        const blob = await put(blobPath, buffer, {
          access: "public",
          contentType: "image/jpeg",
        });

        mappings.push({
          oldPath: `/uploads/${file}`,
          newUrl: blob.url,
        });

        console.log(`✓ Uploaded ${file} -> ${blob.url}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error);
      }
    }

    console.log(`\nSuccessfully migrated ${mappings.length} images.`);
    console.log("\nUpdating data files...");

    // Update menuData.ts
    try {
      const menuData = await readDataFile<any>("menuData.ts");
      let updated = false;

      if (menuData.menuItems) {
        menuData.menuItems = menuData.menuItems.map((item: any) => {
          const mapping = mappings.find(m => m.oldPath === item.image);
          if (mapping) {
            item.image = mapping.newUrl;
            updated = true;
          }

          // Update images array if it exists
          if (item.images && Array.isArray(item.images)) {
            item.images = item.images.map((img: string) => {
              const imgMapping = mappings.find(m => m.oldPath === img);
              return imgMapping ? imgMapping.newUrl : img;
            });
            updated = true;
          }

          return item;
        });
      }

      if (updated) {
        // Note: We'll need to manually update menuData.ts export structure
        console.log("✓ Menu items updated (manual file update may be needed)");
      }
    } catch (error) {
      console.error("Error updating menuData:", error);
    }

    // Update restaurantData.ts
    try {
      const restaurantData = await readDataFile<any>("restaurantData.ts");
      let updated = false;

      // Update gallery images
      if (restaurantData.galleryImages) {
        restaurantData.galleryImages = restaurantData.galleryImages.map((img: any) => {
          const mapping = mappings.find(m => m.oldPath === img.url);
          if (mapping) {
            updated = true;
            return { ...img, url: mapping.newUrl };
          }
          return img;
        });
      }

      // Update about images
      if (restaurantData.aboutImages) {
        restaurantData.aboutImages = restaurantData.aboutImages.map((img: any) => {
          const mapping = mappings.find(m => m.oldPath === img.url);
          if (mapping) {
            updated = true;
            return { ...img, url: mapping.newUrl };
          }
          return img;
        });
      }

      // Update interior images
      if (restaurantData.interiorImages) {
        restaurantData.interiorImages = restaurantData.interiorImages.map((img: any) => {
          const mapping = mappings.find(m => m.oldPath === img.url);
          if (mapping) {
            updated = true;
            return { ...img, url: mapping.newUrl };
          }
          return img;
        });
      }

      if (updated) {
        await writeDataFile(
          "restaurantData.ts",
          restaurantData,
          "{ restaurantInfo, galleryImages, aboutImages, interiorImages }"
        );
        console.log("✓ Restaurant data updated");
      }
    } catch (error) {
      console.error("Error updating restaurantData:", error);
    }

    // Save mapping for reference
    const mappingFile = join(process.cwd(), "image-migration-mapping.json");
    await import("fs/promises").then(fs => 
      fs.writeFile(mappingFile, JSON.stringify(mappings, null, 2))
    );
    console.log(`\n✓ Migration mapping saved to: image-migration-mapping.json`);
    console.log("\nMigration complete! Review the changes and commit if everything looks good.");

  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run migration
migrateImages().catch(console.error);


