export function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="p-4 text-zinc-500 text-sm flex justify-center items-center gap-2">
      <span className="animate-pulse">{text}</span>
    </div>
  );
}
