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

  const CreateQueryModal = ({
  index,
  dataObject,
}: {
  index: number;
  dataObject: IFormData;
}) => {
  return (
    <Dialog
      open={dialogOpenIndex === index}
      onOpenChange={(open) => setDialogOpenIndex(open ? index : null)}
    >
      <DialogTrigger asChild>
        <Button className="w-10 h-10 text-white hover:bg-gray-600">
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Query</DialogTitle>
          <DialogDescription>Fill in details for this field</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => handleSubmit(dataObject.id)} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
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

                  <CreateQueryModal key={key} dataObject={dataObject}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
