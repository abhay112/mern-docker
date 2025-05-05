'use client';

import { useState, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/router";

interface UserForm {
  user: string;
  interest: string[];
  age?: number;
  mobile?: number;
  email: string;
}

export default function User() {
  const [form, setForm] = useState<UserForm>({
    user: "",
    interest: [],
    age: undefined,
    mobile: undefined,
    email: "",
  });
  // const [form, setForm] = useState<UserForm>({
  //   user: "John Doe",         // Default user name
  //   interest: ["Reading"],    // Default interest
  //   age: 25,                  // Default age
  //   mobile: 1234567890,       // Default mobile number
  //   email: "john@example.com" // Default email
  // });
  

  const [interestInput, setInterestInput] = useState("");
  const [isNew, setIsNew] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      setIsNew(false);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiBase}/api/user/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const user = await response.json();
        if (!user) {
          alert(`User with id ${id} not found`);
          router.push("/");
          return;
        }
        setForm(user);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch user data.");
      }
    }

    if (id) fetchData();
  }, [id, router]);

  const updateForm = (value: Partial<UserForm>) => {
    setForm((prev) => ({ ...prev, ...value }));
  };

  const addInterest = () => {
    if (interestInput.trim()) {
      updateForm({ interest: [...form.interest, interestInput.trim()] });
      setInterestInput("");
    }
  };

  const handleInterestKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest();
    }
  };

  const removeInterest = (i: number) => {
    const newInterests = form.interest.filter((_, index) => index !== i);
    updateForm({ interest: newInterests });
  };

  const validateForm = (): string | null => {
    // User validation
    if (!form.user.trim()) return "User is required.";
    if (form.user.trim().length < 4) return "User name must be longer than 3 characters.";

    // Email validation
    if (!form.email.trim()) return "Email is required.";

    // Interest validation
    if (!form.interest.length) return "At least one interest is required.";

    // Age validation
    if (form.age === undefined || form.age < 0 || form.age > 100) return "Age must be between 0 and 100.";

    // Mobile validation (Indian Mobile Number validation)
    if (form.mobile === undefined || form.mobile < 0) return "Mobile number cannot be negative.";
    
    const mobilePattern = /^[6-9]\d{9}$/; // Regex for Indian mobile number
    if (!mobilePattern.test(form.mobile.toString())) {
      return "Invalid mobile number.";
    }

    return null;  // Return null if all validations pass
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const method = isNew ? "POST" : "PATCH";
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const url = isNew ? `${apiBase}/api/user` : `${apiBase}/api/user/${id}`;
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data?.message || "Failed to submit"}`);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred during submission.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl mb-4">{isNew ? "Create" : "Update"} Users</h3>
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
            max={100}
            value={form.age ?? ""}
            onChange={(e) => updateForm({ age: e.target.value ? parseInt(e.target.value) : undefined })}
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
            value={form.mobile ?? ""}
            onChange={(e) => updateForm({ mobile: e.target.value ? parseInt(e.target.value) : undefined })}
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
              onKeyDown={handleInterestKeyDown}
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
          {isNew ? "Create" : "Update"} User
        </button>
      </form>
    </div>
  );
}
