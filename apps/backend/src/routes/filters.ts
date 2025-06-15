import { Router, Request, Response } from "express";
import { getAvailableFilters } from "../services/filtersService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const filters = await getAvailableFilters();
    res.json(filters);
  } catch (error: any) {
    console.error("Error fetching filters:", error);
    res.status(500).json({
      message: "Error fetching filters",
      error: error.message,
    });
  }
});

export default router;
