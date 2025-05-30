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
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
export interface IQueryData {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
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

  console.log(formData);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function formatDate(date: Date | string): string {
    const parsedDate = new Date(date); // handles both Date and ISO string input
    return `${parsedDate.getFullYear()}/${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}/${String(parsedDate.getDate()).padStart(2, "0")}`;
  }

  async function handleResolve(dataObject: IFormData) {
    try {
      const currDate = new Date();

      const data = await axios.put("http://localhost:8080/update-query", {
        queryDataId: dataObject.query?.id,
        updatedAt: currDate,
        status: "RESOLVED",
      });

      console.log(data)
    } catch(error) {
      console.error(error)
    }
  }

  async function handleCreate(dataObject: IFormData) {
    try {
      const currDate = new Date();

      const data = await axios.post("http://localhost:8080/create-query", {
        title: dataObject.question,
        description: description,
        createdAt: currDate,
        updatedAt: currDate,
        status: "OPEN",
        formData: dataObject,
        formDataId: dataObject.id,
      });

      console.log("Submitted:", {
        title: dataObject.question,
        description: description,
      });
    } catch (error) {
      console.error(error);
    }

    setTitle("");
    setDescription("");
    setDialogOpenIndex(null);
  }

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
              className="flex flex-col justify-between content-center py-3 border-[0.1vh] pl-5 hover:bg-stone-50 transition-all"
            >
              <div className="flex flex-row gap-5 pl-2 pr-4 md:lg:pl-6 md:lg:pr-9 justify-between">
                <div className="max-w-[200px] md:lg:max-w-[500px] truncate content-center">
                  {dataObject.question}
                </div>

                <div className="flex flex-row gap-16 md:lg:gap-10 items-center justify-between md:lg:w-1/3">
                  <div className="content-center max-w-[40px] md:lg:max-w-[350px] truncate font-medium">
                    {dataObject.answer}
                  </div>

                  {/* existing "OPEN" query */}
                  {dataObject.query && dataObject.query.status === "OPEN" && (
                    <Dialog
                      open={dialogOpenIndex === key}
                      onOpenChange={(open) =>
                        setDialogOpenIndex(open ? key : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button 
                          variant={"open"}
                          className="w-7 h-8 rounded-full">
                          <i className="fa-solid fa-question"></i>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>| Query </DialogTitle>
                          <DialogDescription>
                            {dataObject.question}
                          </DialogDescription>
                          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        </DialogHeader>

                        <div className="flex flex-row gap-4 justify-center md:lg:justify-start">
                          {/* query status */}
                          <div className="flex flex-col">
                            <DialogDescription>Query Status</DialogDescription>
                            <div className="text-[2.1vh]">{dataObject.query.status}</div>
                          </div>

                          {/* query created date*/}
                          <div className="flex flex-col">
                            <DialogDescription>Created on</DialogDescription>
                            <div className="text-[2.1vh]">{formatDate(dataObject.query.createdAt)}</div>
                          </div>

                          {/* query updated date*/}
                          <div className="flex flex-col">
                            <DialogDescription>Updated on</DialogDescription>
                            <div className="text-[2.1vh]">{formatDate(dataObject.query.updatedAt)}</div>
                          </div>
                        </div>

                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

                        <div className="flex flex-col gap-1">
                          <div className="font-medium">Description</div>
                          <div className="text-[2.1vh] text-stone-700 py-2">
                            {dataObject.query.description}
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            className="bg-emerald-600 hover:bg-emerald-800 text-white"
                            onClick={() => handleResolve(dataObject)}
                            type="submit"
                          >
                            Resolve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* existing "RESOLVED" query*/}
                  {dataObject.query && dataObject.query.status === "RESOLVED" && (
                    <Dialog
                      open={dialogOpenIndex === key}
                      onOpenChange={(open) =>
                        setDialogOpenIndex(open ? key : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button className="w-7 h-8 rounded-full bg-red-400 text-white hover:bg-red-500">
                          <i className="fa-solid fa-question"></i>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>| Query </DialogTitle>
                          <DialogDescription>
                            {dataObject.question}
                          </DialogDescription>
                          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        </DialogHeader>

                        <div className="flex flex-row gap-4 justify-center md:lg:justify-start">
                          {/* query status */}
                          <div className="flex flex-col">
                            <DialogDescription>Query Status</DialogDescription>
                            <div className="text-[2.1vh]">{dataObject.query.status}</div>
                          </div>

                          {/* query created date*/}
                          <div className="flex flex-col">
                            <DialogDescription>Created on</DialogDescription>
                            <div className="text-[2.1vh]">{formatDate(dataObject.query.createdAt)}</div>
                          </div>

                          {/* query updated date*/}
                          <div className="flex flex-col">
                            <DialogDescription>Updated on</DialogDescription>
                            <div className="text-[2.1vh]">{formatDate(dataObject.query.updatedAt)}</div>
                          </div>
                        </div>

                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

                        <div className="flex flex-col gap-1">
                          <div className="font-medium">Description</div>
                          <div className="text-[2.1vh] text-stone-700 py-2">
                            {dataObject.query.description}
                          </div>
                        </div>

                        <DialogFooter>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* when formData does not have an existing query */}
                  {!dataObject.query && (
                    <Dialog
                      open={dialogOpenIndex === key}
                      onOpenChange={(open) =>
                        setDialogOpenIndex(open ? key : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button 
                          variant={"create"}
                          className="w-7 h-8 rounded-full ">
                          <i className="fa-solid fa-plus"></i>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Query</DialogTitle>
                          <DialogDescription>
                            {dataObject.question}
                          </DialogDescription>
                          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
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
                            variant={"create"}
                            onClick={() => handleCreate(dataObject)}
                            type="submit"
                          >
                            Create Query
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
