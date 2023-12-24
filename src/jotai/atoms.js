import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(false);
const userInfoAtom = atom({name: "", id: "", isdoctor: null})

export {pageAtom, darkModeAtom, userInfoAtom};