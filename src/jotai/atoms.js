import { atom } from "jotai";

const pageAtom = atom(0);
const userTypeAtom = atom("doctor");
const darkModeAtom = atom(false);

export {pageAtom, userTypeAtom, darkModeAtom};