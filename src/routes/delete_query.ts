import { FastifyInstance } from "fastify";

import prisma from "../db/db_client";
import { serializer } from "./middleware/pre_serializer";
import { IFormData } from "./schemas/formData.interface";
import { ApiError } from "../errors";

async function deleteQueryRoute(app: FastifyInstance) {
  app.setReplySerializer(serializer);

  app.delete("", async (req, res) => {
    const { queryDataId } = req.body as {
      queryDataId: string;
    };

    try {
      // Update QueryData
      const deleteQueryData = await prisma.queryData.delete({
        where: { id: queryDataId },
      });

      return res.send({
        message: "Query deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ error: "Failed to update query data" });
    }
  });
}

export default deleteQueryRoute;
