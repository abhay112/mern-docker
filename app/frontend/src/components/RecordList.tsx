"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface RecordType {
  _id: string;
  user: string;
  interest: string[];
  age: number;
  mobile: number;
  email: string;
}

interface RecordProps {
  record: RecordType;
  deleteRecord: (id: string) => void;
}

const Record: React.FC<RecordProps> = ({ record, deleteRecord }) => (
  <tr className="border-b hover:bg-muted/50">
    <td className="p-4">{record.user}</td>
    <td className="p-4">{record.email}</td>
    <td className="p-4">{record.mobile}</td>
    <td className="p-4">{record.age}</td>
    <td className="p-4">{record.interest.join(", ")}</td>
    <td className="p-4">
      <div className="flex gap-2">
        <Link href={`/edit/${record._id}`}>
          <a className="text-blue-500 hover:underline">Edit</a>
        </Link>
        <button
          style={{ color: "red" }}
          onClick={() => deleteRecord(record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

const RecordList: React.FC = () => {
  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://192.168.58.2:30050/api/user`);
        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
        }
        const records: RecordType[] = await response.json();
        setRecords(records);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    }
    getRecords();
  }, [records.length]);

  async function deleteRecord(id: string) {
    await fetch(`http://192.168.58.2:30050/${id}`, {
      method: "DELETE",
    });
    setRecords(records.filter((el) => el._id !== id));
  }

  function recordList() {
    return records.map((record) => (
      <Record record={record} deleteRecord={deleteRecord} key={record._id} />
    ));
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Users Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="h-12 px-4 text-left font-medium">Name</th>
                <th className="h-12 px-4 text-left font-medium">Email</th>
                <th className="h-12 px-4 text-left font-medium">Mobile</th>
                <th className="h-12 px-4 text-left font-medium">Age</th>
                <th className="h-12 px-4 text-left font-medium">Interest</th>
                <th className="h-12 px-4 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecordList;
