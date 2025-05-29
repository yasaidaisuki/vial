"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface IQueryData {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  status: string;
  formDataID: string;
}
export interface IFormData {
  id: string;
  question: string;
  answer: string;
  query: IQueryData | null;
}

interface TableViewProps {
  data: IFormData[];
}

export default function TableView({ data }: TableViewProps) {
  const [formData, setFormData] = useState<IFormData[]>(data);
  const [dialogOpenIndex, setDialogOpenIndex] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (formDataID: string) => {
    console.log("Submitted:", { title, description, formDataID });

    // Example axios call:
    // await axios.post("/api/your-endpoint", {
    //   title,
    //   description,
    //   formDataID
    // });

    setTitle("");
    setDescription("");
    setDialogOpenIndex(null);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full flex-col justify-between">
        <div>
          <div className="flex flex-row justify-between md:lg:pl-6 md:lg:pr-6 p-5">
            <label className="font-semibold text-stone-500">FIELDS</label>
            <div className="flex flex-row gap-5 w-1/4 md:lg:w-1/2 md:lg:gap-x-60 justify-end">
              <label className="font-semibold text-stone-500">ANSWER</label>
              <label className="font-semibold text-stone-500">QUERIES</label>
            </div>
          </div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>

        <div className="flex flex-col">
          {formData.map((dataObject, key) => (
            <div
              key={key}
              className="flex flex-col justify-between content-center py-3 border-[0.1vh] pl-5"
            >

              <div className="flex flex-row gap-5 pl-2 pr-2 md:lg:pl-6 md:lg:pr-6 justify-between">
                <div className="max-w-[200px] md:lg:max-w-[500px] truncate content-center">
                  {dataObject.question}
                </div>

                <div className="flex flex-row gap-16 md:lg:gap-10 items-center justify-between md:lg:w-1/3">
                  <div className="content-center max-w-[40px] md:lg:max-w-[350px] truncate font-medium">{dataObject.answer}</div>

                  {/* when formData does not have an existing query */}
                  {!dataObject.query && (
                    <Dialog
                      open={dialogOpenIndex === key}
                      onOpenChange={(open) =>
                        setDialogOpenIndex(open ? key : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button className="w-10 h-10 bg-black text-white hover:bg-gray-600">
                          +
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Query</DialogTitle>
                          <DialogDescription>
                            {dataObject.question}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-2">
                          <div className="flex items-center justify-center w-full">
                            <Textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Add a new remark..."
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            onClick={() => handleSubmit(dataObject.id)}
                            type="submit"
                          >
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
