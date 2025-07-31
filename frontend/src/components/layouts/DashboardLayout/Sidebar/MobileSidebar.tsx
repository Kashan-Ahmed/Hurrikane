import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ILink } from "..";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Button from "@/components/common/Button";

interface IProps {
  links: ILink[];
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ links, onClose, open }: IProps) => {
  const navigate = useNavigate();

  const onPageChange = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet open={open}>
      <SheetContent side="left" className="bg-white">
        <div className="mb-3 text-right">
          <Button size="icon" variant="secondary" onClick={onClose}>
            <X className="px-1" />
          </Button>
        </div>

        <div className="py-4">
          {links.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => onPageChange(item.path)}
                className="mb-3 flex h-11 cursor-pointer items-center justify-start gap-2 rounded-lg bg-zinc-100 px-6"
              >
                <span>
                  <item.icon />
                </span>
                <p className="text-sm font-medium">{item.title}</p>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
