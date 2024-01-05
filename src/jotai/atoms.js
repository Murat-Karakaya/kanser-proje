import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(false)
const userNameAtom = atom("")
const userIdAtom = atom("")
const userEmailAtom = atom("")
const isDoctorAtom = atom(null)
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