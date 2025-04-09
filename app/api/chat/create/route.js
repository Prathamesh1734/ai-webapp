import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {userId} = getAuth(req);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "user not authenticated",
      });
    }

    //   prepare chat data to be saved in db
    const chatData = {
      userId,
      messages: [],
      name: "new chat",
    };

    //connect to db and create new chat
    await connectDB();
    await Chat.create(chatData);

    return NextResponse.json({ success: true, message: "chat created" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
