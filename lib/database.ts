import { neon } from '@neondatabase/serverless';
import { MenuItem, MenuItemTranslations } from '@/data/menuData';

// Get database connection
const getSQL = () => {
    const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!databaseUrl) {
        throw new Error('Database URL not configured');
    }
    return neon(databaseUrl);
};

// Initialize database tables
export async function initializeDatabase() {
    try {
        const sql = getSQL();

        // Create menu_items table
        await sql`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price VARCHAR(50) NOT NULL,
        image TEXT,
        category VARCHAR(100) NOT NULL,
        images JSONB DEFAULT '[]',
        preparation_options TEXT,
        image_position JSONB,
        images_positions JSONB,
        name_translations JSONB,
        description_translations JSONB,
        hidden BOOLEAN DEFAULT FALSE,
        sort_order INTEGER DEFAULT 999,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        // Create menu_categories table
        await sql`
      CREATE TABLE IF NOT EXISTS menu_categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        sort_order INTEGER DEFAULT 0
      )
    `;

        console.log('Database tables initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing database:', error);
        return false;
    }
}

// Get all menu items
export async function getMenuItems(): Promise<MenuItem[]> {
    try {
        const sql = getSQL();
        const rows = await sql`
      SELECT * FROM menu_items ORDER BY sort_order ASC, id ASC
    `;

        return rows.map(row => ({
            id: String(row.id),
            name: row.name,
            description: row.description || '',
            price: row.price,
            image: row.image || '',
            category: row.category,
            images: row.images || [],
            preparationOptions: row.preparation_options,
            imagePosition: row.image_position,
            imagesPositions: row.images_positions,
            nameTranslations: row.name_translations as MenuItemTranslations | undefined,
            descriptionTranslations: row.description_translations as MenuItemTranslations | undefined,
            hidden: row.hidden || false,
            sortOrder: row.sort_order || 999,
        }));
    } catch (error) {
        console.error('Error fetching menu items:', error);
        return [];
    }
}

// Get all categories
export async function getCategories(): Promise<string[]> {
    try {
        const sql = getSQL();
        const rows = await sql`
      SELECT name FROM menu_categories ORDER BY sort_order ASC
    `;
        return rows.map(row => row.name);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Add a new menu item
export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem | null> {
    try {
        const sql = getSQL();
        const rows = await sql`
      INSERT INTO menu_items (
        name, description, price, image, category, images,
        preparation_options, image_position, images_positions,
        name_translations, description_translations, hidden, sort_order
      ) VALUES (
        ${item.name},
        ${item.description},
        ${item.price},
        ${item.image},
        ${item.category},
        ${JSON.stringify(item.images || [])},
        ${item.preparationOptions || null},
        ${item.imagePosition ? JSON.stringify(item.imagePosition) : null},
        ${item.imagesPositions ? JSON.stringify(item.imagesPositions) : null},
        ${item.nameTranslations ? JSON.stringify(item.nameTranslations) : null},
        ${item.descriptionTranslations ? JSON.stringify(item.descriptionTranslations) : null},
        ${item.hidden || false},
        ${item.sortOrder || 999}
      )
      RETURNING *
    `;

        const row = rows[0];
        return {
            id: String(row.id),
            name: row.name,
            description: row.description || '',
            price: row.price,
            image: row.image || '',
            category: row.category,
            images: row.images || [],
            preparationOptions: row.preparation_options,
            imagePosition: row.image_position,
            imagesPositions: row.images_positions,
            nameTranslations: row.name_translations,
            descriptionTranslations: row.description_translations,
            hidden: row.hidden || false,
            sortOrder: row.sort_order || 999,
        };
    } catch (error) {
        console.error('Error adding menu item:', error);
        return null;
    }
}

// Update a menu item
export async function updateMenuItem(item: MenuItem): Promise<boolean> {
    try {
        const sql = getSQL();
        await sql`
      UPDATE menu_items SET
        name = ${item.name},
        description = ${item.description},
        price = ${item.price},
        image = ${item.image},
        category = ${item.category},
        images = ${JSON.stringify(item.images || [])},
        preparation_options = ${item.preparationOptions || null},
        image_position = ${item.imagePosition ? JSON.stringify(item.imagePosition) : null},
        images_positions = ${item.imagesPositions ? JSON.stringify(item.imagesPositions) : null},
        name_translations = ${item.nameTranslations ? JSON.stringify(item.nameTranslations) : null},
        description_translations = ${item.descriptionTranslations ? JSON.stringify(item.descriptionTranslations) : null},
        hidden = ${item.hidden || false},
        sort_order = ${item.sortOrder || 999},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(item.id)}
    `;
        return true;
    } catch (error) {
        console.error('Error updating menu item:', error);
        return false;
    }
}

// Delete a menu item
export async function deleteMenuItem(id: string): Promise<boolean> {
    try {
        const sql = getSQL();
        await sql`DELETE FROM menu_items WHERE id = ${parseInt(id)}`;
        return true;
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return false;
    }
}

// Update sort order for multiple items
export async function updateSortOrder(items: { id: string; sortOrder: number }[]): Promise<boolean> {
    try {
        const sql = getSQL();
        for (const item of items) {
            await sql`
        UPDATE menu_items SET sort_order = ${item.sortOrder} WHERE id = ${parseInt(item.id)}
      `;
        }
        return true;
    } catch (error) {
        console.error('Error updating sort order:', error);
        return false;
    }
}

// Add a new category
export async function addCategory(name: string): Promise<boolean> {
    try {
        const sql = getSQL();
        await sql`
      INSERT INTO menu_categories (name, sort_order)
      VALUES (${name}, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM menu_categories))
    `;
        return true;
    } catch (error) {
        console.error('Error adding category:', error);
        return false;
    }
}

// Delete a category
export async function deleteCategory(name: string): Promise<boolean> {
    try {
        const sql = getSQL();
        await sql`DELETE FROM menu_categories WHERE name = ${name}`;
        return true;
    } catch (error) {
        console.error('Error deleting category:', error);
        return false;
    }
}

// Export all data for backup
export async function exportData(): Promise<{ menuItems: MenuItem[]; menuCategories: string[] }> {
    const menuItems = await getMenuItems();
    const menuCategories = await getCategories();
    return { menuItems, menuCategories };
}

// Import data from backup
export async function importData(data: { menuItems: MenuItem[]; menuCategories: string[] }): Promise<boolean> {
    try {
        const sql = getSQL();

        // Clear existing data
        await sql`DELETE FROM menu_items`;
        await sql`DELETE FROM menu_categories`;

        // Import categories
        for (let i = 0; i < data.menuCategories.length; i++) {
            await sql`
        INSERT INTO menu_categories (name, sort_order) VALUES (${data.menuCategories[i]}, ${i})
      `;
        }

        // Import menu items
        for (const item of data.menuItems) {
            await addMenuItem(item);
        }

        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
}
