import { contactHandlers } from "./api/contact";
import { todoHandlers } from "./api/todo";

export const handlers = [...contactHandlers, ...todoHandlers];
