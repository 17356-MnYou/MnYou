import express, { Request, Response } from "express";
import { db } from "../../db";
import { restaurants } from "../../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();
// CREATE
router.post("/", async (req: Request, res: Response) => {
  const restaurantData = req.body;
  if (!restaurantData || !restaurantData.username || !restaurantData.password) {
    return res.status(500).send("Invalid restaurant data");
  }

  try {
    await db.insert(restaurants).values({
      username: restaurantData.username,
      password: restaurantData.password,
    });
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(200);
});

// READ
router.get("/", async (_, res: Response) => {
  const restaurantList = await db.select().from(restaurants);
  return res.status(200).json(restaurantList);
});

router.get("/:username", async (req: Request, res: Response) => {
  const restaurantUsername = req.params.username;
  if (!restaurantUsername) {
    return res.status(500).send("Invalid username");
  }

  const [restaurant] = await db
    .select()
    .from(restaurants)
    .where(eq(restaurants.username, restaurantUsername));
  if (!restaurant) {
    return res.status(500).send("No restaurant found");
  }

  return res.status(200).json(restaurant);
});

// UPDATE
router.put("/", async (req: Request, res: Response) => {
  const restaurantData = req.body;
  if (!restaurantData) {
    return res.status(500).send("Invalid restaurant data");
  }

  // you can definitely do this better and faster with input validation and typing but i'm lazy
  try {
    let updatedData = new Map();

    if (restaurantData.username) {
      updatedData.set("username", restaurantData.username);
    }
    if (restaurantData.password) {
      updatedData.set("password", restaurantData.password);
    }
    if (restaurantData.menu) {
      updatedData.set("menu", restaurantData.menu);
    }

    await db.update(restaurants).set(Object.fromEntries(updatedData));
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(200);
});

// DELETE
router.delete("/:username", async (req: Request, res: Response) => {
  const restaurantUsername = req.params.username;
  if (!restaurantUsername) {
    return res.status(500).send("Invalid username");
  }
  const [deletedRestaurant] = await db
    .delete(restaurants)
    .where(eq(restaurants.username, restaurantUsername))
    .returning();

  return res.status(200).json(deletedRestaurant);
});

export default router;
