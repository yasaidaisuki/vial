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
import { Textarea } from "@/components/ui/textarea"
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
      <div className="flex w-full flex-col justify-between gap-5 p-5">
        <div className="flex flex-row justify-between md:lg:pl-6 md:lg:pr-6">
          <label>FIELDS</label>
          <div className="flex flex-row gap-5 md:lg:gap-28 justify-end">
            <label>ANSWER</label>
            <label>QUERIES</label>
          </div>
        </div>

        <div className="flex flex-col gap-7">
          {formData.map((dataObject, key) => (
            <div
              key={key}
              className="flex flex-col justify-between content-center"
            >
              <div className="flex flex-row gap-5 md:lg:pl-6 md:lg:pr-6 justify-between">
                <div className="max-w-[100px] md:lg:max-w-[500px] truncate content-center">
                  {dataObject.question}
                </div>

                <div className="flex flex-row gap-10 items-center">
                  <div className="content-center">{dataObject.answer}</div>

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

                      <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-center w-full">
                          <Textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Type your message here." />
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

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
