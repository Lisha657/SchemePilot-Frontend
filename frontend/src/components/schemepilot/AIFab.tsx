import { FaRobot } from "react-icons/fa6";

export default function AIFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open AI assistant"
      className="group fixed bottom-6 right-6 z-[999] grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
      style={{ animation: "float-pulse 3s ease-in-out infinite" }}
    >
      <FaRobot className="h-4 w-4 transition group-hover:rotate-12" />
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-gold" />
    </button>
  );
}
