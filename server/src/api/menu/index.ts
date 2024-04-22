import express, { Request, Response } from "express";
import { db } from "../../db";
import { menus, menuItems, sections } from "../../db/schema";
import { asc, eq } from "drizzle-orm";
import multer from "multer";

const router = express.Router();

const upload = multer();

// CREATE
router.post("/", async (req: Request, res: Response) => {
  // don't need to check for id because postres will automatically generate an incrementing id
  // NOTE: this is not best practice for security reasons but I'm lazy
  const menuData = req.body;
  if (
    !menuData ||
    !menuData.primary_font ||
    !menuData.secondary_font ||
    !menuData.primary_font_color ||
    !menuData.secondary_font_color ||
    !menuData.background_color ||
    !menuData.orientation ||
    !menuData.name ||
    !menuData.address
  ) {
    return res.status(500).send("Invalid menu data");
  }
  try {
    const menu = await db
      .insert(menus)
      .values({
        primaryFont: menuData.primary_font,
        secondaryFont: menuData.secondary_font,
        primaryFontColor: menuData.primary_font_color,
        secondaryFontColor: menuData.secondary_font_color,
        backgroundColor: menuData.background_color,
        orientation: menuData.orientation,
        name: menuData.name,
        address: menuData.address,
      })
      .returning();
    // return the inserted menu so that the front end can store the menu id somewhere after
    // creating a new menu
    // NOTE: again there are better methods of doing this, but this is the easiest way of data
    // management between front and back end
    return res.status(200).send(menu);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(
  "/:id",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const menuItemData = req.body.jsonData
      ? JSON.parse(req.body.jsonData)
      : null;
    if (!menuItemData) {
      return res.status(400).send("Invalid JSON data");
    }
    if (
      !menuItemData.title ||
      !menuItemData.secondaryTitle ||
      !menuItemData.price ||
      !menuItemData.description ||
      !menuItemData.isActive ||
      !menuItemData.menu ||
      !menuItemData.section
    ) {
      return res
        .status(400)
        .send("Not enough information to create a menu item");
    }

    const imageFile = req.file ? req.file.buffer : null;
    try {
      const menuItem = await db
        .insert(menuItems)
        .values({
          title: menuItemData.title,
          secondaryTitle: menuItemData.secondaryTitle,
          image: imageFile,
          price: menuItemData.price,
          description: menuItemData.description,
          isActive: menuItemData.isActive,
          menu: menuItemData.menu,
          section: menuItemData.section,
        })
        .returning();
      return res.status(200).send(menuItem);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
);

// Helpers for read operations
async function getMenu(menuId: number) {
  return db.select().from(menus).where(eq(menus.id, menuId));
}

async function getMenuItems(menuId: number) {
  return db
    .select()
    .from(menuItems)
    .where(eq(menuItems.menu, menuId))
    .orderBy(asc(menuItems.section));
}

async function getSpecificMenuItem(menuId: number, itemId: number) {
  return db
    .select()
    .from(menuItems)
    .where(eq(menuItems.menu, menuId) && eq(menuItems.id, itemId));
}

async function getAllSections(menuId: number) {
  return db.select().from(sections).where(eq(sections.menu, menuId));
}

async function getMenuItemsBySection(menuId: number, sectionId: number) {
  return db
    .select()
    .from(menuItems)
    .where(eq(menuItems.menu, menuId) && eq(menuItems.section, sectionId));
}

// READ
// Can only receive the data from 1 menu at a time, shouldnt be able to read all menus.
// Ex: http://localhost:3000/api/menus/1
router.get("/:id", async (req: Request, res: Response) => {
  const menuId = Number(req.params.id);

  if (!menuId) return res.status(500).send("Invalid menu");
  const [menu] = await getMenu(menuId);
  if (!menu) return res.status(404).send("No menu found");

  const sections = await getAllSections(menuId);
  if (!sections) return res.status(500).send("No sections found");

  const organizedItems = [];
  for (const section of sections) {
    const items = await getMenuItemsBySection(menuId, section.id);
    const section_name = section.name;
    organizedItems.push({ section_name, items });
  }

  const response = {
    id: menu.id,
    primaryFont: menu.primaryFont,
    secondaryFont: menu.secondaryFont,
    primaryFontColor: menu.primaryFontColor,
    secondaryFontColor: menu.secondaryFontColor,
    backgroundColor: menu.backgroundColor,
    orientation: menu.orientation,
    name: menu.name,
    address: menu.address,
  };

  return res.status(200).json({ ...response, organizedItems });
});

// Returns a specific menu item given a menu id and item id
// Ex: http://localhost:3000/api/menus/1/2
router.get("/:mid/:iid", async (req: Request, res: Response) => {
  const menuId = Number(req.params.mid);
  const itemId = Number(req.params.iid);

  if (!menuId || !itemId) return res.status(500).send("Invalid menu or item");
  const menu_item = await getSpecificMenuItem(menuId, itemId);
  if (!menu_item) return res.status(500).send("No menu item found");

  return res.status(200).json(menu_item);
});

export default router;
