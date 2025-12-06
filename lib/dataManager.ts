import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readDataFile<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  const fileContent = await fs.readFile(filePath, "utf-8");
  
  const result: any = {};
  
  // For menuData.ts
  // Extract menuCategories - simpler pattern for arrays
  const categoriesMatch = fileContent.match(/export\s+const\s+menuCategories\s*=\s*(\[[\s\S]*?\]);/);
  if (categoriesMatch) {
    try {
      result.menuCategories = new Function(`return ${categoriesMatch[1]}`)();
    } catch (error) {
      console.error('Error parsing menuCategories:', error);
    }
  }
  
  // Extract menuItems - match the full array including all items
  const itemsMatch = fileContent.match(/export\s+const\s+menuItems:\s*MenuItem\[\]\s*=\s*(\[[\s\S]*\]);/);
  if (itemsMatch) {
    try {
      result.menuItems = new Function(`return ${itemsMatch[1]}`)();
    } catch (error) {
      console.error('Error parsing menuItems:', error);
    }
  }
  
  // For restaurantData.ts
  // Extract restaurantInfo
  const restaurantInfoMatch = fileContent.match(/export\s+const\s+restaurantInfo\s*=\s*(\{[\s\S]*?\n\};)/);
  if (restaurantInfoMatch) {
    try {
      result.restaurantInfo = new Function(`return ${restaurantInfoMatch[1]}`)();
    } catch (error) {
      console.error('Error parsing restaurantInfo:', error);
    }
  }
  
  // Extract galleryImages
  const galleryMatch = fileContent.match(/export\s+const\s+galleryImages\s*=\s*(\[[\s\S]*?\n\]);/);
  if (galleryMatch) {
    try {
      result.galleryImages = new Function(`return ${galleryMatch[1]}`)();
    } catch (error) {
      console.error('Error parsing galleryImages:', error);
    }
  }
  
  // Extract aboutImages
  const aboutImagesMatch = fileContent.match(/export\s+const\s+aboutImages\s*=\s*(\[[\s\S]*?\n\]);/);
  if (aboutImagesMatch) {
    try {
      result.aboutImages = new Function(`return ${aboutImagesMatch[1]}`)();
    } catch (error) {
      console.error('Error parsing aboutImages:', error);
    }
  }
  
  // Extract interiorImages
  const interiorImagesMatch = fileContent.match(/export\s+const\s+interiorImages\s*=\s*(\[[\s\S]*?\n\]);/);
  if (interiorImagesMatch) {
    try {
      result.interiorImages = new Function(`return ${interiorImagesMatch[1]}`)();
    } catch (error) {
      console.error('Error parsing interiorImages:', error);
    }
  }
  
  return result as T;
}

export async function writeDataFile(filename: string, data: any, exportName: string): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  
  // Create backup
  try {
    const backup = await fs.readFile(filePath, "utf-8");
    await fs.writeFile(`${filePath}.backup`, backup, "utf-8");
  } catch {
    // No backup needed if file doesn't exist
  }

  let content = "";

  // Handle menuData.ts
  if (filename === "menuData.ts") {
    content = `export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  images?: string[]; // Multiple images for gallery view
  preparationOptions?: string; // e.g., "Available: Grilled, Tagine, Plancha, Fried"
  imagePosition?: { x: number; y: number; zoom: number }; // Main image positioning
  imagesPositions?: Array<{ x: number; y: number; zoom: number }>; // Gallery images positioning
}

`;

    // Add menuCategories
    if (data.menuCategories) {
      content += `export const menuCategories = ${JSON.stringify(data.menuCategories, null, 2)};\n\n`;
    }

    // Add menuItems with type annotation
    if (data.menuItems) {
      content += `export const menuItems: MenuItem[] = ${JSON.stringify(data.menuItems, null, 2)};\n`;
    }
  }
  
  // Handle restaurantData.ts
  else if (filename === "restaurantData.ts") {
    if (data.restaurantInfo) {
      content += `export const restaurantInfo = ${JSON.stringify(data.restaurantInfo, null, 2)};\n\n`;
    }
    
    if (data.galleryImages) {
      content += `export const galleryImages = ${JSON.stringify(data.galleryImages, null, 2)};\n\n`;
    }
    
    if (data.aboutImages) {
      content += `export const aboutImages = ${JSON.stringify(data.aboutImages, null, 2)};\n\n`;
    }
    
    if (data.interiorImages) {
      content += `export const interiorImages = ${JSON.stringify(data.interiorImages, null, 2)};\n`;
    }
  }

  await fs.writeFile(filePath, content, "utf-8");
}

// Simpler JSON-based storage for hero slides (new feature)
export async function readJSON<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [] as T;
  }
}

export async function writeJSON(filename: string, data: any): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
