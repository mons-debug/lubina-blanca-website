import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import {
    initializeDatabase,
    getMenuItems,
    getCategories,
    importData,
    exportData
} from "@/lib/database";
import { menuItems as fileMenuItems, menuCategories as fileMenuCategories } from "@/data/menuData";

// Initialize database and optionally migrate data from file
export async function POST(request: NextRequest) {
    const session = await getSessionFromCookie(request.headers.get("cookie"));
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { action } = await request.json();

        if (action === "init") {
            // Initialize database tables
            const success = await initializeDatabase();
            if (success) {
                return NextResponse.json({ message: "Database initialized successfully" });
            }
            return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 });
        }

        if (action === "migrate") {
            // First initialize tables
            const initResult = await initializeDatabase();
            console.log("Init result:", initResult);

            // Then migrate data from file
            console.log("Migrating items:", fileMenuItems.length, "categories:", fileMenuCategories.length);

            const success = await importData({
                menuItems: fileMenuItems,
                menuCategories: fileMenuCategories
            });

            if (success) {
                // Verify the migration
                const items = await getMenuItems();
                const categories = await getCategories();
                return NextResponse.json({
                    message: "Data migrated successfully",
                    itemCount: items.length,
                    categoryCount: categories.length
                });
            }
            return NextResponse.json({ error: "Failed to migrate data" }, { status: 500 });
        }

        if (action === "export") {
            // Export data for backup
            const data = await exportData();
            return NextResponse.json(data);
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Database setup error:", error);
        return NextResponse.json({
            error: "Database operation failed",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

// Get database status
export async function GET(request: NextRequest) {
    try {
        const items = await getMenuItems();
        const categories = await getCategories();

        return NextResponse.json({
            status: "connected",
            itemCount: items.length,
            categoryCount: categories.length
        });
    } catch (error) {
        return NextResponse.json({
            status: "disconnected",
            error: "Database not configured or connection failed"
        }, { status: 500 });
    }
}
