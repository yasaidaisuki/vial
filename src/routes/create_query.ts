import { FastifyInstance } from "fastify";

import prisma from "../db/db_client";
import { serializer } from "./middleware/pre_serializer";
import { ICountedFormData, IFormData } from "./schemas/formData.interface";
import { ApiError } from "../errors";

export interface IQueryData {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  formData: IFormData;
  formDataId: string;
}

async function createQueryRoute(app: FastifyInstance) {
  app.setReplySerializer(serializer);

  const log = app.log.child({ component: "formDataRoutes" });

  app.post("", async (req, res) => {
    const {
      title,
      description,
      createdAt,
      updatedAt,
      status,
      formData,
      formDataId,
    } = req.body as IQueryData;

    // put query data in query table
    const post = await prisma.queryData.create({
      data: {
        title,
        description,
        createdAt,
        updatedAt,
        status,
        formData: {
          connect: {
            id: formDataId,
          },
        },
      },
    });

    res.send({
      message: "Query successfuly crested",
      data: post,
    });
  });

}
export default createQueryRoute;
