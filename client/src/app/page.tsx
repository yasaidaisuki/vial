import Image from "next/image";
import TableView from "@/components/TableView";
import axios from "axios";

export default async function Home() {

  // fetch overhead data using axios
  // done in the page to reduce client-side fetching
  const data = await axios
        .get("http://localhost:8080/form-data") // your Fastify backend endpoint
        .then((response) => {
          return response.data
        })
        .catch((err) => console.log("error"));

  return (
    <div className="w-full h-full">
      {data ? <TableView data={data.data.formData}/> : null }
    </div>
  );
}
