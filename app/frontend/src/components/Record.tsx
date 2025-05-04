'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface RecordForm {
  user: string;
  interest: string[];
  age: number;
  mobile: number;
  email: string;
}

export default function Record() {
  const [form, setForm] = useState<RecordForm>({
    user: "",
    interest: [],
    age: 0,
    mobile: 0,
    email: "",
  });

  const [interestInput, setInterestInput] = useState("");
  const [isNew, setIsNew] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      setIsNew(false);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://192.168.58.2:30050";
        const response = await fetch(`${apiBase}/api/user/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const record = await response.json();
        if (!record) {
          console.warn(`Record with id ${id} not found`);
          router.push("/");
          return;
        }
        setForm(record);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    if (id) fetchData();
  }, [id, router]);

  const updateForm = (value: Partial<RecordForm>) => {
    setForm((prev) => ({ ...prev, ...value }));
  };

  const addInterest = () => {
    if (interestInput.trim()) {
      updateForm({ interest: [...form.interest, interestInput.trim()] });
      setInterestInput("");
    }
  };

  const removeInterest = (i: number) => {
    const newInterests = form.interest.filter((_, index) => index !== i);
    updateForm({ interest: newInterests });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 
    if (form.age < 0) {
      alert("Age cannot be negative.");
      return;
    }

    if (form.mobile < 0) {
      alert("Mobile number cannot be negative.");
      return;
    }

    try {
      const method = isNew ? "POST" : "PATCH";
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://192.168.58.2:30050";
      const url = isNew ? `${apiBase}/api/user` : `${apiBase}/api/user/${id}`;
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl mb-4">{isNew ? "Create" : "Update"} Record</h3>
      <form onSubmit={onSubmit} className="space-y-4">

        {/* User */}
        <div>
          <label className="block mb-2">User</label>
          <input
            type="text"
            value={form.user}
            onChange={(e) => updateForm({ user: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2">Age</label>
          <input
            type="number"
            min={0}
            value={form.age}
            onChange={(e) => updateForm({ age: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block mb-2">Mobile</label>
          <input
            type="number"
            min={0}
            value={form.mobile}
            onChange={(e) => updateForm({ mobile: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block mb-2">Interests</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Add interest"
            />
            <button type="button" onClick={addInterest} className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.interest.map((item, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center">
                {item}
                <button type="button" onClick={() => removeInterest(index)} className="ml-2 text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isNew ? "Create" : "Update"} Record
        </button>
      </form>
    </div>
  );
}
