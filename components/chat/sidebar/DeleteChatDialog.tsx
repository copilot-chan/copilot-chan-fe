"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteChatDialogProps {
  chatId: string;
  onDelete: (id: string) => Promise<void>;
}

export function DeleteChatDialog({ chatId, onDelete }: DeleteChatDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(chatId);
      toast.success("Chat đã được xóa thành công");
      setOpen(false);
    } catch (error) {
      toast.error("Không thể xóa chat. Vui lòng thử lại.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          className="absolute right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity px-1"
          title="Delete Chat"
        >
          ×
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa chat</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa chat này? Hành động này không thể hoàn
            tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
