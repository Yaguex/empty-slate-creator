import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EditValueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: number, netFlow: number) => void;
  initialValue: number;
  initialNetFlow: number;
}

export function EditValueModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialValue = 0,
  initialNetFlow = 0
}: EditValueModalProps) {
  console.log("EditValueModal - Initial values:", { initialValue, initialNetFlow });
  
  const [value, setValue] = useState(() => String(initialValue));
  const [netFlow, setNetFlow] = useState(() => String(initialNetFlow));

  const handleSave = () => {
    console.log("EditValueModal - Saving values:", { value, netFlow });
    const numValue = parseFloat(value) || 0;
    const numNetFlow = parseFloat(netFlow) || 0;
    onSave(numValue, numNetFlow);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Portfolio Values</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="portfolio-value" className="text-sm font-medium">
              End of Month portfolio value
            </label>
            <Input
              id="portfolio-value"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter portfolio value"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="net-flow" className="text-sm font-medium">
              Net deposits and withdraws
            </label>
            <Input
              id="net-flow"
              type="text"
              value={netFlow}
              onChange={(e) => setNetFlow(e.target.value)}
              placeholder="Enter net deposits/withdraws"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}