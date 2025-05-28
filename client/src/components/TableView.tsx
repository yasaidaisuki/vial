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
      <div className="flex w-full flex-row justify-between p-5">
        <div className="flex flex-col gap-5">
          <label>Fields</label>
          {formData &&
          formData.map((dataObject: any, key: number) => {
            return (
              <div key={key} className="flex flex-col justify-between max-w-[500px]">
                {dataObject.question}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">CRA</div>

        <div className="flex flex-col">DM</div>

        <div className="flex flex-col">Queries</div>
      </div>
    </div>
  );
}
