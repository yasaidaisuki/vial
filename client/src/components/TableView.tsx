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
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  function formatDate(date: Date | string): string {
    const parsedDate = new Date(date);
    return `${parsedDate.getFullYear()}/${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}/${String(parsedDate.getDate()).padStart(2, "0")}`;
  }

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8080/form-data");
      return response.data.data.formData;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }
  async function handleDelete(dataObject: IFormData) {
    try {
      await axios.delete("http://localhost:8080/delete-query", {
        data: {
          queryDataId: dataObject.query?.id,
        },
      });

      const updatedData = await fetchData();
      setFormData(updatedData);

      // Close the modal by resetting dialogOpenIndex
      setDialogOpenIndex(null);
    } catch (error) {
      console.error("Error resolving query:", error);
    }
  }

  async function handleResolve(dataObject: IFormData) {
    try {
      const currDate = new Date();

      await axios.put("http://localhost:8080/update-query", {
        queryDataId: dataObject.query?.id,
        updatedAt: currDate,
        status: "RESOLVED",
      });

      const updatedData = await fetchData();
      setFormData(updatedData);
    } catch (error) {
      console.error("Error resolving query:", error);
    }
  }

  async function handleCreate(dataObject: IFormData) {
    try {
      const currDate = new Date();

      await axios.post("http://localhost:8080/create-query", {
        title: dataObject.question,
        description: description,
        createdAt: currDate,
        updatedAt: currDate,
        status: "OPEN",
        formData: dataObject,
        formDataId: dataObject.id,
      });

      const updatedData = await fetchData();
      setFormData(updatedData);
      setDescription("");
      setDialogOpenIndex(null);
    } catch (error) {
      console.error("Error creating query:", error);
    }
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
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>

        <div className="flex flex-col">
          {formData.map((dataObject, key) => (
            <div key={key}>
              <div
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest("button")) {
                    setPreviewIndex(key);
                  }
                }}
                className="flex flex-col justify-between content-center py-3 border-[0.1vh] pl-5 hover:bg-stone-50 transition-all cursor-pointer"
              >
                <div className="flex flex-row gap-5 pl-2 pr-4 md:lg:pl-6 md:lg:pr-9 justify-between">
                  <div className="max-w-[200px] md:lg:max-w-[500px] truncate content-center">
                    {dataObject.question}
                  </div>

                  <div className="flex flex-row gap-16 md:lg:gap-10 items-center justify-between md:lg:w-1/3">
                    <div className="content-center max-w-[40px] md:lg:max-w-[350px] truncate font-medium">
                      {dataObject.answer}
                    </div>

                    {dataObject.query ? (
                      <Dialog
                        open={dialogOpenIndex === key}
                        onOpenChange={(open) =>
                          setDialogOpenIndex(open ? key : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant={
                              dataObject.query.status === "RESOLVED"
                                ? "resolved"
                                : "open"
                            }
                            className="w-7 h-8 rounded-full"
                          >
                            <i
                              className={`fa-solid ${
                                dataObject.query.status === "RESOLVED"
                                  ? "fa-check"
                                  : "fa-question"
                              }`}
                            ></i>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>| Query</DialogTitle>
                            <DialogDescription>
                              {dataObject.question}
                            </DialogDescription>
                            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                          </DialogHeader>

                          <div className="flex flex-col md:lg:flex-row gap-4 justify-center md:lg:justify-between">
                            <div className="flex flex-row gap-4 justify-center">
                              <div className="flex flex-col">
                                <DialogDescription>
                                  Query Status
                                </DialogDescription>
                                <div className="flex flex-row items-center gap-1">
                                  <div
                                    className={`w-[1.2vh] h-[1.2vh] ${
                                      dataObject.query.status === "RESOLVED"
                                        ? "bg-emerald-500"
                                        : "bg-[#8BC5C4]"
                                    } rounded-full`}
                                  ></div>
                                  <div>{dataObject.query.status}</div>
                                </div>
                              </div>

                              <div className="flex flex-col">
                                <DialogDescription>
                                  Created on
                                </DialogDescription>
                                <div className="text-[2.1vh]">
                                  {formatDate(dataObject.query.createdAt)}
                                </div>
                              </div>

                              <div className="flex flex-col">
                                <DialogDescription>
                                  Updated on
                                </DialogDescription>
                                <div className="text-[2.1vh]">
                                  {formatDate(dataObject.query.updatedAt)}
                                </div>
                              </div>
                            </div>

                            <Button
                              className="bg-red-400 hover:bg-red-500 text-white"
                              onClick={() => handleDelete(dataObject)}
                              type="submit"
                            >
                              Delete
                            </Button>
                          </div>

                          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

                          <div className="flex flex-col gap-1">
                            <div className="font-medium">Description</div>
                            <div className="text-[2.1vh] text-stone-700 py-2">
                              {dataObject.query.description}
                            </div>
                          </div>

                          <DialogFooter>
                            {dataObject.query.status === "OPEN" && (
                              <Button
                                className="bg-emerald-600 hover:bg-emerald-800 text-white"
                                onClick={() => handleResolve(dataObject)}
                                type="submit"
                              >
                                Resolve
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog
                        open={dialogOpenIndex === key}
                        onOpenChange={(open) =>
                          setDialogOpenIndex(open ? key : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="create"
                            className="w-7 h-8 rounded-full"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create Query</DialogTitle>
                            <DialogDescription>
                              {dataObject.question}
                            </DialogDescription>
                            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                          </DialogHeader>

                          <div className="grid gap-2 py-2">
                            <div className="flex flex-row gap-1 font-medium items-center">
                              Description
                              <span className="text-sm">(optional)</span>
                            </div>
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
                              variant="create"
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
            </div>
          ))}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog
        open={previewIndex !== null}
        onOpenChange={() => setPreviewIndex(null)}
      >
        <DialogContent className="gap-1">
          {previewIndex !== null && (
            <>
              <DialogHeader>
                <DialogTitle>Question Preview</DialogTitle>
                <DialogDescription>
                  {formData[previewIndex].question}
                </DialogDescription>
              </DialogHeader>
              <div className="text-stone-700 font-medium mt-4">Answer:</div>
              <div className="text-[2.1vh] text-stone-700 py-2">
                {formData[previewIndex].answer}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
