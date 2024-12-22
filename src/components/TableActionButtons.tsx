import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TableActionButtonsProps {
  onEdit: () => void;
}

export function TableActionButtons({ onEdit }: TableActionButtonsProps) {
  return (
    <div className="invisible group-hover:visible absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-500 hover:text-blue-700"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit row</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}