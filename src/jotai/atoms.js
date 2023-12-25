import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(false)
const userNameAtom = atom("") // atom("test")
const userIdAtom = atom("ad3ef5b66bf109db5c61") // atom("ad3ef5b66bf109db5c61")
const userEmailAtom = atom("") // atom("test@test")
const isDoctorAtom = atom(null) // atom(false)

export {
    pageAtom,
    darkModeAtom, 
    userNameAtom, 
    userEmailAtom, 
    userIdAtom, 
    isDoctorAtom
};