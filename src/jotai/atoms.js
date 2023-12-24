import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(false)
const userNameAtom = atom("")
const userIdAtom = atom("")
const isDoctorAtom = atom(null)

export {pageAtom, darkModeAtom, userNameAtom, userIdAtom, isDoctorAtom};