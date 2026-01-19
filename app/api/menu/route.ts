import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { readDataFile, writeDataFile } from "@/lib/dataManager";
import { MenuItem, menuItems as staticMenuItems, menuCategories as staticMenuCategories } from "@/data/menuData";
import * as db from "@/lib/database";

// Check if database is configured
const isDatabaseConfigured = () => {
  return !!process.env.POSTGRES_URL;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    // Try database first if configured
    if (isDatabaseConfigured()) {
      try {
        const menuItems = await db.getMenuItems();
        const menuCategories = await db.getCategories();

        // If database has data, use it
        if (menuItems.length > 0) {
          if (action === "categories") {
            return NextResponse.json({ menuCategories });
          }
          return NextResponse.json({ menuItems, menuCategories });
        }
      } catch (dbError) {
        console.log("Database not available, falling back to file");
      }
    }

    // Fallback to file-based data
    try {
      const data = await readDataFile<{ menuItems: MenuItem[]; menuCategories: string[] }>("menuData.ts");
      if (action === "categories") {
        return NextResponse.json({ menuCategories: data.menuCategories });
      }
      return NextResponse.json(data);
    } catch (fileError) {
      // Last resort: use static imports
      if (action === "categories") {
        return NextResponse.json({ menuCategories: staticMenuCategories });
      }
      return NextResponse.json({ menuItems: staticMenuItems, menuCategories: staticMenuCategories });
    }
  } catch (error) {
    console.error("Error reading menu data:", error);
    return NextResponse.json({ error: "Failed to read menu data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const body = await request.json();

    // Use database if configured
    if (isDatabaseConfigured()) {
      try {
        if (action === "add-category") {
          const { category } = body;
          if (!category || category.trim() === "") {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
          }
          const success = await db.addCategory(category);
          if (success) {
            const categories = await db.getCategories();
            return NextResponse.json({ menuCategories: categories }, { status: 201 });
          }
          return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
        }

        if (action === "reorder") {
          const { items } = body;
          const success = await db.updateSortOrder(items);
          if (success) {
            return NextResponse.json({ success: true }, { status: 200 });
          }
          return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
        }

        // Default: add new menu item
        const newItem = await db.addMenuItem(body);
        if (newItem) {
          return NextResponse.json(newItem, { status: 201 });
        }
        return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
      } catch (dbError) {
        console.error("Database error, falling back to file:", dbError);
      }
    }

    // Fallback to file-based operations
    const data = await readDataFile<any>("menuData.ts");

    if (action === "add-category") {
      const { category } = body;
      if (!category || category.trim() === "") {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
      }
      if (data.menuCategories.includes(category)) {
        return NextResponse.json({ error: "Category already exists" }, { status: 400 });
      }
      const allIndex = data.menuCategories.indexOf("All");
      if (allIndex !== -1) {
        data.menuCategories.splice(allIndex, 0, category);
      } else {
        data.menuCategories.push(category);
      }
      await writeDataFile("menuData.ts", { menuCategories: data.menuCategories, menuItems: data.menuItems }, "{ menuCategories, menuItems }");
      return NextResponse.json({ menuCategories: data.menuCategories }, { status: 201 });
    }

    if (action === "reorder") {
      const { items } = body;
      for (const orderItem of items) {
        const menuItem = data.menuItems.find((item: MenuItem) => item.id === orderItem.id);
        if (menuItem) {
          menuItem.sortOrder = orderItem.sortOrder;
        }
      }
      await writeDataFile("menuData.ts", { menuCategories: data.menuCategories, menuItems: data.menuItems }, "{ menuCategories, menuItems }");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Default: add new menu item
    const newItem = body;
    const maxId = Math.max(...data.menuItems.map((item: MenuItem) => parseInt(item.id)), 0);
    newItem.id = String(maxId + 1);
    data.menuItems.push(newItem);
    await writeDataFile("menuData.ts", { menuCategories: data.menuCategories, menuItems: data.menuItems }, "{ menuCategories, menuItems }");
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error in menu POST:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isProduction = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

  try {
    const updatedItem = await request.json();

    // Use database if configured
    if (isDatabaseConfigured()) {
      try {
        const success = await db.updateMenuItem(updatedItem);
        if (success) {
          return NextResponse.json(updatedItem);
        }
        // If update returns false, the item might not exist
        return NextResponse.json({ error: "Failed to update item in database" }, { status: 500 });
      } catch (dbError) {
        console.error("Database error:", dbError);

        // In production, don't fall back to file storage
        if (isProduction) {
          return NextResponse.json({ error: "Database error. Please try again." }, { status: 500 });
        }

        console.warn("Database error, falling back to file storage");
      }
    } else if (isProduction) {
      // In production, database must be configured
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    // Fallback to file-based (only in development)
    const data = await readDataFile<any>("menuData.ts");
    const index = data.menuItems.findIndex((item: MenuItem) => item.id === updatedItem.id);
    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    data.menuItems[index] = updatedItem;
    await writeDataFile("menuData.ts", { menuCategories: data.menuCategories, menuItems: data.menuItems }, "{ menuCategories, menuItems }");
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    // Use database if configured
    if (isDatabaseConfigured()) {
      try {
        if (action === "delete-category") {
          const category = searchParams.get("category");
          if (!category) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
          }
          if (category === "All") {
            return NextResponse.json({ error: "Cannot delete 'All' category" }, { status: 400 });
          }
          const success = await db.deleteCategory(category);
          if (success) {
            const categories = await db.getCategories();
            return NextResponse.json({ menuCategories: categories });
          }
        } else {
          const id = searchParams.get("id");
          if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
          }
          const success = await db.deleteMenuItem(id);
          if (success) {
            return NextResponse.json({ success: true });
          }
        }
      } catch (dbError) {
        console.error("Database error, falling back to file:", dbError);
      }
    }

    // Fallback to file-based
    const data = await readDataFile<any>("menuData.ts");

    if (action === "delete-category") {
      const category = searchParams.get("category");
      if (!category) {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
      }
      if (category === "All") {
        return NextResponse.json({ error: "Cannot delete 'All' category" }, { status: 400 });
      }
      const itemsInCategory = data.menuItems.filter((item: MenuItem) => item.category === category);
      if (itemsInCategory.length > 0) {
        return NextResponse.json({ error: `Cannot delete category. ${itemsInCategory.length} menu item(s) are using this category.` }, { status: 400 });
      }
      data.menuCategories = data.menuCategories.filter((cat: string) => cat !== category);
      await writeDataFile("menuData.ts", { menuCategories: data.menuCategories, menuItems: data.menuItems }, "{ menuCategories, menuItems }");
      return NextResponse.json({ menuCategories: data.menuCategories });
    }

    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    data.menuItems = data.menuItems.filter((item: MenuItem) => item.id !== id);
    await writeDataFile("menuData.ts", { menuCategories: data.menuCategories, menuItems: data.menuItems }, "{ menuCategories, menuItems }");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
