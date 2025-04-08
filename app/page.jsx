"use client";
import { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";
import Message from "@/components/Message";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}></Sidebar>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt=""
            />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <p className="text-2xl">🌚</p>
                <p className="text-2xl font-medium">hi, i'm deepseek ai</p>
              </div>
              <p className="text-sm mt-2">how can i help u today?</p>
            </>
          ) : (
            <div>
              <Message role="user" content="hello"></Message>
            </div>
          )}
          <PromptBox
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          ></PromptBox>
          <p className="text-xs absolute bottom-1 text-gray-500">
            ai-generated, for reference only
          </p>
        </div>
      </div>
    </div>
  );
}
