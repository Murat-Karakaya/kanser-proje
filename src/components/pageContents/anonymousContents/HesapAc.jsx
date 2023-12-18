import { useState } from "react";
import "./HesapAc&HomePage.css"

export default () => {
    const [userInfo, setUserInfo] = useState({})
    const [credentials, setCredentials] = useState({name: "",  password: ""})
    const [information, setInformation] = useState({message: "", color: "black"})
    let [loading, setLoading] = useState(false);

    const setUser = ({name, password}) => {
        if (!name || !password) {
            setInformation({message: "Username and password are required", color: "rgb(130, 0, 0)"})
            return;
        }
        if (name.length > 30) {
            setInformation({message: "Keep the username under 30 characters", color: "rgb(130, 0, 0)"})
            return;
        }
        setLoading(true)
        setInformation({message: "Processing, please wait", color: "var(--default-color)"})

        /* Stuff like this will be written when making the server.
        fetch("https://global-chat-api.onrender.com/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, password})
        })
        .then(response => response.json())
        .then({name, id} => {
            if (id) {
                setUserInfo({username: name, id: id})
                setLoading(false);
                setInformation({message: "", color: "black"})
                return;
            }
            setLoading(false);
            setInformation({message: "That username allready exists", color: "rgb(130, 0, 0)"})
        })
        .catch(err => {
            setLoading(false);
            setInformation({message: "That username allready exists", color: "rgb(130, 0, 0)"})
        }) */

        setUserInfo({username: name, id: "test-id"})
        setTimeout(() => setLoading(false), 500)
        setInformation({message: name, color: "black"})
    }

    return(
        <div id="grid-centered">
        <fieldset className="dynamic-width-form">
            <legend>Hesap Aç</legend>
            <label htmlFor="">Adınız: </label>
            <input
             onChange={(e) => setCredentials({...credentials, name: e.target.value})} 
             type="text" 
             id="name-input"
             className="form-input" 
            />

            <p>Şifreniz: </p>
            <input
             onChange={(e) => setCredentials({...credentials, password: e.target.value})}
             type="password" 
             id="password-input"
             className="form-input" 
            />

            <button
             onClick={() => setUser(credentials)}
             className="form-submit"
            >Register</button>
            <div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
                <div style={{display: loading ? "block" : "none"}} className="loading-blue"></div>
                <p style={{color: information.color, marginTop: 0}}>{information.message}</p>
            </div>
        </fieldset>
        </div>
    )
}