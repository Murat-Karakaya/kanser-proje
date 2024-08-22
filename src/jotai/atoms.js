import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(window.matchMedia('(prefers-color-scheme: dark)').matches)
const userNameAtom = atom(null)
const userIdAtom = atom(null)
const userEmailAtom = atom(null)
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