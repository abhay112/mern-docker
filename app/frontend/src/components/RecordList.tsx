"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface UserType {
  _id: string;
  user: string;
  interest: string[];
  age: number;
  mobile: number;
  email: string;
}

interface UserProps {
  record: UserType;
  deleteUser: (id: string) => void;
}

const Record: React.FC<UserProps> = ({ record, deleteUser }) => (
  <tr className="border-b hover:bg-muted/50">
    <td className="p-4">{record.user}</td>
    <td className="p-4">{record.email}</td>
    <td className="p-4">{record.mobile}</td>
    <td className="p-4">{record.age}</td>
    <td className="p-4">{record.interest.join(", ")}</td>
    <td className="p-4">
      <div className="flex gap-2">
        <Link href={`/edit/${record._id}`}>
          <p className="text-blue-500 hover:underline">Edit</p>
        </Link>
        <button
          style={{ color: "red" }}
          onClick={() => deleteUser(record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

const RecordList: React.FC = () => {
  const [records, setRecords] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    async function getRecords() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiBase}/api/user`);
        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
        }
        const records: UserType[] = await response.json();
        setRecords(records);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    }
    getRecords();
  }, []);

  async function deleteUser(id: string) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${apiBase}/api/user/${id}`, {
      method: "DELETE",
    });
    setRecords((prev) => prev.filter((el) => el._id !== id));
  }

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
            <tbody>
              {currentRecords.map((record) => (
                <Record record={record} deleteUser={deleteUser} key={record._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {records.length > recordsPerPage && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};


export default RecordList;
