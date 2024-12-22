interface EditValueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (value: number, netFlow: number) => void;
    initialValue: number;
    initialNetFlow: number;
}
export declare function EditValueModal({ isOpen, onClose, onSave, initialValue, initialNetFlow }: EditValueModalProps): import("react/jsx-runtime").JSX.Element;
export {};
