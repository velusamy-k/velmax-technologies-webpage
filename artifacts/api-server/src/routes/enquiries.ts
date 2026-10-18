import { Router, type IRouter } from "express";
import {
  CreateBusinessEnquiryBody,
  CreateBusinessEnquiryResponse,
} from "@workspace/api-zod";
import { businessEnquiriesTable, db } from "@workspace/db";

const router: IRouter = Router();

router.post("/enquiries", async (req, res): Promise<void> => {
  const parsed = CreateBusinessEnquiryBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn(
      {
        fields: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          code: issue.code,
        })),
      },
      "Rejected invalid business enquiry",
    );
    res.status(400).json({ error: "Check the enquiry details and try again." });
    return;
  }

  try {
    await db.insert(businessEnquiriesTable).values(parsed.data);

    res.status(201).json(
      CreateBusinessEnquiryResponse.parse({
        received: true,
        message: "Your enquiry has been received and saved.",
      }),
    );
  } catch (error) {
    req.log.error(
      { errorType: error instanceof Error ? error.name : "UnknownError" },
      "Failed to save business enquiry",
    );
    res
      .status(500)
      .json({ error: "We could not save your enquiry. Please try again." });
  }
});

export default router;
