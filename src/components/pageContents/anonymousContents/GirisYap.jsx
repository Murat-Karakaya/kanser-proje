import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isDoctorAtom, pageAtom, userIdAtom, userEmailAtom, userNameAtom, patientDoctorRelations, patentInfosAtom } from "../../../jotai/atoms";

export default () => {
    const setPage = useSetAtom(pageAtom)
    const navigate = useNavigate()

    const setPatientDoctorRelations = useSetAtom(patientDoctorRelations)
    const setUserName = useSetAtom(userNameAtom)
    const setUserId = useSetAtom(userIdAtom)
    const setUserEmail = useSetAtom(userEmailAtom)
    const setPatientInfos = useSetAtom(patentInfosAtom)
    const [isDoctor, setIsDoctor] = useAtom(isDoctorAtom)

    const [credentials, setCredentials] = useState({email: "",  password: ""})
    const [information, setInformation] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isDoctor) return navigate("/doktor")
        if (isDoctor === false) return navigate("/hasta")
    }, [isDoctor])

    const setUser = async ({email, password}) => {
        if (!email || !password) return setInformation("Email ve şifre zorunludur.")
        setLoading(true)
        setInformation("Yükleniyor, lütfen bekleyiniz...")

        try {
            const response = await fetch("http://localhost:1234/signin", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            const {
                patientinfos, 
                isdoctor, 
                relations, 
                name, 
                id,
                // I don't destructure the email because it is allready provided by the user
            } = await response.json()

            if (response.status >= 500) {
                setLoading(false);
                setInformation("Bir sorun oluştu.")
                return;
            }
            if (response.status >= 400) {
                setLoading(false);
                setInformation("Yanlış email veya şifre.") 
                return;
            }

            setLoading(false)
            setInformation("")
            setUserId(id)
            setUserEmail(email)
            setUserName(name)
            setPatientDoctorRelations(relations)
            setPatientInfos(patientinfos)
            setIsDoctor(isdoctor)
            setPage(0)
            return
        } catch (error) {
            console.log(error)
            setLoading(false);
            setInformation("Bir sorun oluştu.")
            return
        }
    }

    return(
        <div id="grid-centered">
        <fieldset className="dynamic-form-width">
            <legend>Giriş Yap</legend>

            <label htmlFor="emailInput">Emailiniz: </label>
            <input
             onChange={(e) => setCredentials({...credentials, email: e.target.value})} 
             type="email" 
             id="emailInput"
             className="form-input" 
            />

            <label htmlFor="passwordInput">Şifreniz:</label>
            <input
             onChange={(e) => setCredentials({...credentials, password: e.target.value})}
             type="password" 
             id="passwordInput"
             className="form-input" 
            />

            <button
             onClick={() => setUser(credentials)}
             className="form-submit"
            >Giriş Yap</button>

            <div style={{display: information ? "flex" : "none"}} className="span-entire-row flex-centered">
                <div style={{display: loading ? "block" : "none"}} className="loading-blue"></div>
                <p className="form-information">{information}</p>
            </div>
        </fieldset>
        </div>
    )
}