import { FastifyInstance } from "fastify";

import prisma from "../db/db_client";
import { serializer } from "./middleware/pre_serializer";
import { IFormData } from "./schemas/formData.interface";
import { ApiError } from "../errors";

async function updateQueryRoute(app: FastifyInstance) {
  app.setReplySerializer(serializer);

  app.put("", async (req, res) => {
    const { queryDataId, updatedAt, status } = req.body as {
      queryDataId: string;
      updatedAt: Date;
      status: string;
    };

    try {
      // Update QueryData
      const updatedQueryData = await prisma.queryData.update({
        where: { id: queryDataId },
        data: {
          status,
          updatedAt,
        },
      });

      return res.send({
        message: "Query updated successfully",
        queryData: updatedQueryData,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Failed to update query data" });
    }
  });
}

export default updateQueryRoute;
