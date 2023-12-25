import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isDoctorAtom, pageAtom, userIdAtom, userEmailAtom, userNameAtom } from "../../../jotai/atoms";

export default () => {
    const setPage = useSetAtom(pageAtom)
    const navigate = useNavigate()

    const setUserName = useSetAtom(userNameAtom)
    const setUserId = useSetAtom(userIdAtom)
    const setUserEmail = useSetAtom(userEmailAtom)
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

            const data = await response.json()

            if (data.id) {
                setLoading(false)
                setInformation("")
                setUserId(data.id)
                setUserEmail(data.email)
                setUserName(data.name)
                setIsDoctor(data.isdoctor)
                setPage(0)
                return;
            }
            setLoading(false);
            setInformation("Yanlış email veya şifre.")
        } catch (error) {
            console.log(error)
            setLoading(false);
            setInformation("Yanlış email veya şifre.")
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

            <div style={{display: loading ? "flex" : "none"}} className="span-entire-row flex-centered">
                <div style={{display: loading ? "block" : "none"}} className="loading-blue"></div>
                <p className="form-information">{information}</p>
            </div>
        </fieldset>
        </div>
    )
}