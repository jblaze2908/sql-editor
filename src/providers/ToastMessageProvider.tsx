import ToastMessage from "@/components/lib/ToastMessage";

export default function ToastMessageProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      {children}
      <ToastMessage />
    </>
  );
}
