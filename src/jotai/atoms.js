import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(false)
const userNameAtom = atom("h")
const userIdAtom = atom("h")
const userEmailAtom = atom("h@h")
const isDoctorAtom = atom(true)
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