"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function TableView({ data }: any) {
  // extract data
  const [formData, setFormData] = useState<any>(data?.formData);

  console.log(formData);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full flex-col justify-between gap-5 p-5">
        <div className="flex flex-row justify-between">
          <label>FIELDS</label>

          <div className="flex flex-row gap-20 justify-end pr-14">
            <label>CRA</label>
            <label>DM</label>
            <label>QUERIES</label>
          </div>
        </div>

        <div className="flex flex-col">
          {formData &&
            formData.map((dataObject: any, key: number) => {
              return (
                <div
                  key={key}
                  className="flex flex-col justify-between max-w-[600px] truncate p-5"
                >
                  {dataObject.question}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
