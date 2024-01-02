import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(false)
const userNameAtom = atom("a")
const userIdAtom = atom("a")
const userEmailAtom = atom("a@a")
const isDoctorAtom = atom(false) // atom(null)
const patientDoctorRelations = atom([])
const patentInfosAtom = atom([])

export {
    pageAtom,
    darkModeAtom,
    userNameAtom,
    userEmailAtom, 
    userIdAtom, 
    isDoctorAtom,
    patientDoctorRelations,
    patentInfosAtom,
};