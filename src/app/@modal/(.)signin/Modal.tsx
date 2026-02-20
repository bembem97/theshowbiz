import { ButtonBack } from "@/components/custom/Button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";

export default function ModalSignIn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false} className="sm:max-w-2xl">
        <ButtonBack className="ml-auto" variant="outline">
          <XIcon />
        </ButtonBack>
        {children}
      </DialogContent>
    </Dialog>
  );
}
