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
    // ✅ Change the first message shown before the user types
    startScreen: {
      greeting:
        "Hi there, explorer! My name is 🧭 Scout, and I’ll be your guide as we travel through history together. Please say hi!",
    },

    // ✅ Optional: change the text inside the input box
    composer: {
      placeholder: "Type your question for Mamie here…",
    },
  });

return (
  <div className="flex h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900">
    {/* Your custom header */}
    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
      <div className="text-lg font-semibold">Talk with Mamie Tape</div>
    </div>

    {/* Chat area */}
    <div className="flex-1 overflow-hidden">
      <style>{`
  #chatkit-header .d091K { display: none !important; }
`}</style>
      <ChatKit control={chatkit.control} className="h-full w-full" />
    </div>
  </div>
);
}
