import React, { useState } from "react";
import Button from "@/src/components/common/Button";
import { useToast } from "@/src/Providers/toast-provider";

const Help = () => {
  const [message, setMessage] = useState("");
  const { showSuccess } = useToast();

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      {/* Header */}
      <div className="w-full mb-6 px-4 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-[var(--text-primary)]">
            How can we help you?
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        <div
          className="bg-[var(--bg-card)] rounded-3xl shadow-lg p-6 flex flex-col"
          style={{ height: "75vh" }}
        >
          {/* Textarea */}
          <div className="flex-1 mb-4 overflow-hidden">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your question or issue in detail"
              className="w-full h-full bg-transparent border-0 pb-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none resize-none"
            />
          </div>

          {/* Button at bottom */}
          <div className="flex-shrink-0">
            <Button
              className="w-full h-10 rounded-xl font-semibold"
              disabled={!message.trim()}
              onClick={() => {
                showSuccess("Query sent successfully");
                setMessage("");
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
