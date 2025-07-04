"use client";
import { useUiStore } from "@repo/store";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastListener() {
  const { error, message, setError, setMessage } = useUiStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null); 
    }
  }, [error, setError]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage(null);
    }
  }, [message, setMessage]);

  return null; 
}