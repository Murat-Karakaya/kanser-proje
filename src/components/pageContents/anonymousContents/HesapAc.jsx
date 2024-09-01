import { useState, useEffect } from "react"

import "./HesapAc&GirisYap.css"
import { useNavigate } from "react-router-dom"

import { useAtom, useSetAtom } from "jotai"
import { isDoctorAtom, pageAtom, userIdAtom, userNameAtom , userEmailAtom} from "../../../jotai/atoms"

export default () => {
    const [isDoctor, setIsDoctor] = useAtom(isDoctorAtom)
    const setUserName = useSetAtom(userNameAtom)
    const setUserId = useSetAtom(userIdAtom)
    const setUserEmail = useSetAtom(userEmailAtom)

    const setPage = useSetAtom(pageAtom)

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({email: "",  password: "", name: "", isdoctor: null})
    const [information, setInformation] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (isDoctor) return navigate("/doktor")
        if (isDoctor === false) return navigate("/hasta")
    }, [isDoctor])

    const setUser = async ({name, email, password, isdoctor}) => {
        if (!name || !email || !password || (isdoctor !== "false" && isdoctor !== "true")) {
            return setInformation("Kullanıcı adı, email, şifre ve kullanıcı tipi zorunludur.")
        }

        if (!email.includes("@")) return setInformation("Geçerli email kullanınız.")

        if (name.length > 30) return setInformation("Kullanıcı adınızı 30 karakterden kısa tutunuz.")

        setLoading(true)
        setInformation("Yükleniyor, lütfen bekleyiniz...")

        try {
            const response = await fetch("http://localhost:1234/register", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, password, isdoctor: isdoctor === "true"})
            })
            const { id } = await response.json() // I only destructured the id because the rest is allready provided by the user

            if (response.status >= 500) {
                setLoading(false);
                setInformation("Bir sorun oluştu.")
                return;
            }
            if (response.status >= 400) {
                setLoading(false);
                setInformation("İlgili kullanıcı mevcuttur.")
                return;   
            }
            console.table({isdoctor, info: "register"})

            setLoading(false)
            setInformation("")
            setUserId(id)
            setUserEmail(email)
            setUserName(name)
            setIsDoctor(isdoctor === "true")
            setPage(0)
            return;
        } catch (error) {
            console.error(error)
            setLoading(false)
            setInformation("Bir sorun oluştu.")
        }
    }

    return(
        <div className="grid-centered parent-height parent-width no-background">
        <fieldset className="dynamic-form-width">
            <legend>Hesap Aç</legend>
            <label htmlFor="name-input">Kullanıcı adınız: </label>
            <input
             onChange={(e) => setCredentials({...credentials, name: e.target.value})}
             type="text"
             id="name-input"
             className="form-input" 
            />

            <label htmlFor="email-input">Emailiniz: </label>
            <input
             onChange={(e) => setCredentials({...credentials, email: e.target.value})}
             type="email"
             id="email-input"
             className="form-input"
            />

            <label htmlFor="password-input">Şifreniz:</label>
            <input
             onChange={(e) => setCredentials({...credentials, password: e.target.value})}
             type="password" 
             id="password-input"
             className="form-input" 
            />

            <label htmlFor="user-type-input">Kullanıcı tipi:</label>
            <select
             className="form-input" 
             id="user-type-input" 
             onChange={e => setCredentials({...credentials, isdoctor: e.target.value})} 
            >
                <option hidden value={null}></option>
                <option value={false}>Hasta</option>    
                <option value={true}>Doktor</option>
            </select>

            <button
             onClick={() => setUser(credentials)}
             className="form-submit"
            >Hesap Aç</button>
            <div style={{display: information ? "flex" : "none"}} className="span-entire-row flex-centered">
                <div style={{display: loading ? "block" : "none"}} className="loading-blue"></div>
                <p className="form-information">{information}</p>
            </div>
        </fieldset>
        </div>
    )
}