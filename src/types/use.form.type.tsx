import { SyntheticEvent } from "react";
import { ProductStructure } from "./product.type";

export type UseFormStructure = {
    formData: Partial<ProductStructure>;
    handleInput: (ev: SyntheticEvent) => void;
    handleSelectExtImage: (ev: SyntheticEvent) => void;
    handleFileInput: (ev: SyntheticEvent) => void;
    handleAddSubmit: (ev: SyntheticEvent) => void;
    handleUpdateSubmit: (ev: SyntheticEvent) => void;
};
