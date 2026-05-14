import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mensagemWhatsapp(mensagem: string) {
  return `https://wa.me/31986641213?text=${encodeURIComponent(mensagem)}`;
}