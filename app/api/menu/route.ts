import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { readDataFile, writeDataFile } from "@/lib/dataManager";
import { MenuItem } from "@/data/menuData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    const data = await readDataFile<{ menuItems: MenuItem[]; menuCategories: string[] }>("menuData.ts");

    // If requesting only categories
    if (action === "categories") {
      return NextResponse.json({ menuCategories: data.menuCategories });
    }

    return NextResponse.json(data);
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
    const data = await readDataFile<any>("menuData.ts");

    // Read body once at the start
    const body = await request.json();

    // Handle category addition
    if (action === "add-category") {
      const { category } = body;

      if (!category || category.trim() === "") {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
      }

      if (data.menuCategories.includes(category)) {
        return NextResponse.json({ error: "Category already exists" }, { status: 400 });
      }

      // Add new category (insert before "All" if it exists, or at the beginning)
      const allIndex = data.menuCategories.indexOf("All");
      if (allIndex !== -1) {
        data.menuCategories.splice(allIndex, 0, category);
      } else {
        data.menuCategories.push(category);
      }

      const exportContent = {
        menuCategories: data.menuCategories,
        menuItems: data.menuItems,
      };

      await writeDataFile("menuData.ts", exportContent, "{ menuCategories, menuItems }");

      return NextResponse.json({ menuCategories: data.menuCategories }, { status: 201 });
    }

    // Handle reorder action
    if (action === "reorder") {
      const { items } = body;

      // Update sortOrder for each item
      for (const orderItem of items) {
        const menuItem = data.menuItems.find((item: MenuItem) => item.id === orderItem.id);
        if (menuItem) {
          menuItem.sortOrder = orderItem.sortOrder;
        }
      }

      const exportContent = {
        menuCategories: data.menuCategories,
        menuItems: data.menuItems,
      };

      await writeDataFile("menuData.ts", exportContent, "{ menuCategories, menuItems }");

      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Handle menu item creation (default action)
    const newItem = body;

    // Generate new ID
    const maxId = Math.max(...data.menuItems.map((item: MenuItem) => parseInt(item.id)), 0);
    newItem.id = String(maxId + 1);

    data.menuItems.push(newItem);

    // Write back to file
    const exportContent = {
      menuCategories: data.menuCategories,
      menuItems: data.menuItems,
    };

    await writeDataFile("menuData.ts", exportContent, "{ menuCategories, menuItems }");

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

  try {
    const updatedItem = await request.json();
    const data = await readDataFile<any>("menuData.ts");

    const index = data.menuItems.findIndex((item: MenuItem) => item.id === updatedItem.id);
    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    data.menuItems[index] = updatedItem;

    const exportContent = {
      menuCategories: data.menuCategories,
      menuItems: data.menuItems,
    };

    await writeDataFile("menuData.ts", exportContent, "{ menuCategories, menuItems }");

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
    const data = await readDataFile<any>("menuData.ts");

    // Handle category deletion
    if (action === "delete-category") {
      const category = searchParams.get("category");

      if (!category) {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
      }

      // Prevent deleting "All" category
      if (category === "All") {
        return NextResponse.json({ error: "Cannot delete 'All' category" }, { status: 400 });
      }

      // Check if any menu items use this category
      const itemsInCategory = data.menuItems.filter((item: MenuItem) => item.category === category);
      if (itemsInCategory.length > 0) {
        return NextResponse.json({
          error: `Cannot delete category. ${itemsInCategory.length} menu item(s) are using this category.`
        }, { status: 400 });
      }

      data.menuCategories = data.menuCategories.filter((cat: string) => cat !== category);

      const exportContent = {
        menuCategories: data.menuCategories,
        menuItems: data.menuItems,
      };

      await writeDataFile("menuData.ts", exportContent, "{ menuCategories, menuItems }");

      return NextResponse.json({ menuCategories: data.menuCategories });
    }

    // Handle menu item deletion
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    data.menuItems = data.menuItems.filter((item: MenuItem) => item.id !== id);

    const exportContent = {
      menuCategories: data.menuCategories,
      menuItems: data.menuItems,
    };

    await writeDataFile("menuData.ts", exportContent, "{ menuCategories, menuItems }");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}


