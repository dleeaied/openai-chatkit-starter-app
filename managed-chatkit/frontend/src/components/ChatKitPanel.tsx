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
        "Hi there, explorer! Welcome! My name is 🧭 Scout, and I’ll be your guide as we travel through history together.",
    },

    // ✅ Optional: change the text inside the input box
    composer: {
      placeholder: "Type your question for Maime here…",
    },
  });

  return (
    <div className="flex h-[90vh] w-full rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900">
      <ChatKit control={chatkit.control} className="h-full w-full" />
    </div>
  );
}
