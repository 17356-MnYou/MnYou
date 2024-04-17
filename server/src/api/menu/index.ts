import express, { Request, Response } from "express";
import { db } from "../../db";
import { menus, menuItems } from "../../db/schema";
import { eq, sql } from "drizzle-orm";

const router = express.Router();
// CREATE
router.post("/", async (req: Request, res: Response) => {
    const menuData = req.body;
    if (!menuData || !menuData.id || !menuData.primary_font || !menuData.secondary_font || !menuData.primary_font_color || !menuData.secondary_font_color || !menuData.background_color || !menuData.orientation || !menuData.name || !menuData.address) {
        return res.status(500).send("Invalid menu data");
    }
    try {
        await db.insert(menus).values({
        id: menuData.id,
        primaryFont: menuData.primary_font,
        secondaryFont: menuData.secondary_font,
        primaryFontColor: menuData.primary_font_color,
        secondaryFontColor: menuData.secondary_font_color,
        backgroundColor: menuData.background_color,
        orientation: menuData.orientation,
        name: menuData.name,
        address: menuData.address,
        });
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.status(200);
});

// READ
// Can only receive the data from 1 menu at a time, shouldnt be able to read all menus. 
router.get("/:id", async (req: Request, res: Response) => {
    const menuId = Number(req.params.id);
    if (!menuId) {
        return res.status(500).send("Invalid menu");
    }
    
    const [menu] = await db
        .select()
        .from(menus)
        .where(eq(menus.id, menuId));
    if (!menu) {
        return res.status(500).send("No menu found");
    }
    const menu_item_results = await db
        .select()
        .from(menuItems)
        .where(sql`${menuItems.menu} = ${menuId}`);
    if (!menu_item_results) {
        return res.status(500).send("No menu items found");
    }
    return res.status(200).json({menu, menu_item_results});
});



export default router;