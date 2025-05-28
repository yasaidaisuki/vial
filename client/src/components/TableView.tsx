"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export interface IQueryData {
  id: string
  title: string
  description: string | null
  createdAt: string
  updatedAt: string
  status: string
  formDataID: string
}
export interface IFormData {
  id: string
  question: string
  answer: string
  query: IQueryData | null
}

interface TableViewProps {
  data: IFormData[]
}


export default function TableView({ data } : TableViewProps) {
  console.log(data)
  // extract data
  const [formData, setFormData] = useState<IFormData[]>(data);

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

        <div className="flex flex-col gap-10">
          {formData &&
            formData.map((dataObject: any, key: number) => {
              return (
                <div
                  key={key}
                  className="flex flex-col justify-between"
                >
                  <div className="flex flex-row gap-5 md:lg:pl-6 md:lg:pr-6">
                    <div className="max-w-[100px] md:lg:max-w-[500px] truncate">
                      {dataObject.question}
                    </div>
                    <div>
                      
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
