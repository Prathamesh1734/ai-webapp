import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export default async function GET(req) {
  try {
    const {userId} = getAuth(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not authenticated",
      });
    }

    //connect to db and fetch user chats
    await connectDB();
    const data = await Chat.find({ userId });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
