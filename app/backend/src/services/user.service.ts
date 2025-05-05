// src/services/user.service.ts
import { User, UserSchema } from "../models/user.model";
import { ObjectId, Db, Collection } from "mongodb";
import { connectToDatabase } from "../db/connection"; 

let collection: Collection | null = null;

async function initializeCollection(): Promise<Collection> {
  if (!collection) {
    const db: Db = await connectToDatabase(); 
    collection = db.collection("users");
  }
  return collection;
}

export async function getAllUsers(): Promise<User[]> {
  const col = await initializeCollection(); 
  const users = await col.find({}).toArray();
  return users.map(user => ({
    ...user,
    _id: user._id.toString()
  })) as User[];
}

export async function getUserById(id: string): Promise<User | null> {
  const col = await initializeCollection();
  return col.findOne({ _id: new ObjectId(id) }) as Promise<User | null>;
}

export async function createUser(userData: Omit<User, "_id">): Promise<User> {
  const col = await initializeCollection();

  // Check for unique email or mobile
  const existingUser = await col.findOne({
    $or: [{ email: userData.email }, { mobile: userData.mobile }]
  });

  if (existingUser) {
    throw new Error("Email or mobile number already exists");
  }

  const parsed = UserSchema.parse(userData);
  const result = await col.insertOne(parsed);
  return { ...parsed, _id: result.insertedId.toString() };
}


export async function updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
  const col = await initializeCollection();

  // Check if updated email/mobile is already taken by another user
  if (updateData.email || updateData.mobile) {
    const query: any = {
      _id: { $ne: new ObjectId(id) },
      $or: []
    };

    if (updateData.email) query.$or.push({ email: updateData.email });
    if (updateData.mobile) query.$or.push({ mobile: updateData.mobile });

    const conflict = await col.findOne(query);
    if (conflict) throw new Error("Email or mobile number already exists");
  }

  const parsed = UserSchema.partial().parse(updateData);
  await col.updateOne({ _id: new ObjectId(id) }, { $set: parsed });
  return getUserById(id);
}

export async function deleteUser(id: string): Promise<boolean> {
  const col = await initializeCollection(); 
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
