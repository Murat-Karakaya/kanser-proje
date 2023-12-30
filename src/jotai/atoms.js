import { atom } from "jotai";

const pageAtom = atom(0);
const darkModeAtom = atom(false)
const userNameAtom = /* atom("") */ atom("bob")
const userIdAtom = /* atom("ad3ef5b66bf109db5c61") */ atom("890cabd0700b3ea0f0ef")
const userEmailAtom = /* atom("") */ atom("bob@bob")
const isDoctorAtom = /* atom(null)  */atom(true)
const patientDoctorRelations = atom([
    {patientemail: "test@test", isaccepted: false},
    {patientemail: "bob@burnermail.com", isaccepted: true}
])

export {
    pageAtom,
    darkModeAtom,
    userNameAtom,
    userEmailAtom, 
    userIdAtom, 
    isDoctorAtom,
    patientDoctorRelations,
};