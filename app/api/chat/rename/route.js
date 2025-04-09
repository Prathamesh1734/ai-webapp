import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export default async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not authenticated",
      });
    }

    const { chatId, name } = await req.json();

    //connect to db and update chat name
    await connectDB();
    await Chat.findOneAndUpdate({ _id: chatId, userId }, { name });

    return NextResponse.json({ success: true, message: "chat renamed" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
