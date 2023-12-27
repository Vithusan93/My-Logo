import { createContext } from "react";
import { PublicLogoClass } from "./ClassCard";

export const ClassContext = createContext<PublicLogoClass | null>(null);
