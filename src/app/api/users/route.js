import connectDB from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json(users);
}

export async function POST(req) {
  const body = await req.json();
  const parsed = userSchema.safeParse(body);
  if (!parsed.success)
    return Response.json({ error: "Invalid data" }, { status: 400 });

  await connectDB();
  const user = await User.create(body);
  return Response.json(user);
}
