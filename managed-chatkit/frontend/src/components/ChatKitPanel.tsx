import { useMemo } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";

export function ChatKitPanel() {
  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const chatkit = useChatKit({
    api: { getClientSecret },

    // Keep history enabled so the start greeting screen still works
    // (Disabling history can remove the greeting experience in some ChatKit builds.)
    // history: { enabled: true },

    startScreen: {
      greeting:
        "Hi there, explorer! My name is 🧭 Scout, and I’ll be your guide as we travel through history together. Please say hi!",
    },

    composer: {
      placeholder: "Type your question for Maime here…",
    },
  });

  return (
    <div className="flex h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900">
      {/* Hide ONLY the ChatKit header title text, keep the buttons (New chat, History) */}
      <style>{`
        #chatkit-header .Q8u4H {
          display: none !important;
        }
      `}</style>

      {/* Your custom header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
        <div className="text-lg font-semibold">Talk with Maime Tape</div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden">
        <ChatKit control={chatkit.control} className="h-full w-full" />
      </div>
    </div>
  );
}
