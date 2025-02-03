import { useToast } from "@/components/ui/use-toast";

export function useCustomToast() {
  const { toast } = useToast();

  const showToast = (title, description, variant = "default") => {
    toast({
      title,
      description,
      variant,
    });
  };

  return { showToast };
}
