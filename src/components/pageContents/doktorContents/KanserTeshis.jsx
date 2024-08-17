import { useAtom, useAtomValue } from "jotai";
import { useState } from "react"
import { patentInfosAtom, userIdAtom } from "../../../jotai/atoms";

const HandleMessage = ({message}) => {
    const userId = useAtomValue(userIdAtom)
    const [patientInfos, setPatientInfos] = useAtom(patentInfosAtom)
    const [selectedPatient, setSelectedPatient] = useState(null)

    const [infoAboutUpdate, setInfoAboutUpdate] = useState("")

    const handlePatientInfos = async () => {
        // Server and the website updates patient infos seperately
        const updateInfo = obj => {
            obj.info = obj.info.filter((el) => el.substring(0, 30) !== message.substring(0, 30)).concat(message)
            return obj
        }

        const method = "post"
        const body = JSON.stringify({
            doctorid: userId, 
            newInfo: message, 
            patientemail: selectedPatient
        })
        const headers = {"Content-Type": "application/json"}
        const response = await fetch("http://localhost:1234/addImageInfo", {method, headers, body})

        if (response.status >= 400) return setInfoAboutUpdate("Bir sorun oluştu.")

        const newInfos = patientInfos.map(obj => obj.patientemail === selectedPatient ? updateInfo(obj) : obj)
        setPatientInfos(newInfos)
        setInfoAboutUpdate("Başarıyla kaydedilmiştir.")
    }

    if (!message) return <></>
    if (message === "Bir sorun oluştu." || message === "Yetersiz bilgi") return <p>{message}</p>
    if (message === "Yükleniyor, lütfen bekleyiniz...") return (
        <div style={{display: "flex"}} className="span-entire-row flex-centered">
            <div style={{display: "block"}} className="loading-blue"></div>
            <p className="form-information">{message}</p>
        </div>
    )

    return(<>
        <p>{message}</p>
        <p>Eğer görsel hastalarınızdan birisine aitse o hasta için kaydedebilirsiniz.</p>

        <select className="form-input span-entire-row" onChange={event => setSelectedPatient(event.target.value)} >
            <option hidden defaultValue="">Hasta Seçiniz</option>
            {patientInfos.map(({patientemail}) =>(
                <option value={patientemail} key={patientemail}>{patientemail}</option>
            ))}
        </select>

        <button
         className="form-submit span-entire-row"
         onClick={(e)=> selectedPatient && handlePatientInfos()}
        >
            Kaydet
        </button>
        {infoAboutUpdate && <p>{infoAboutUpdate}</p>}
    </>)
}

export default ()=>{
    const [preview, setPreview] = useState("")
    const [selectedCategory, setSelectedCategory] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("")

    const createImageUrl = file => {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result)

        if (file) return reader.readAsDataURL(file)
        setPreview(null)
    }

    const handleUpload = async () => {

        if (!file || !selectedCategory) return setMessage("Yetersiz bilgi")
  
        const formData = new FormData()
        formData.append('image', file);
        formData.append('type', selectedCategory);

        try {
            setMessage("Yükleniyor, lütfen bekleyiniz...")

            const response = await fetch("http://localhost:8080/process", {
                method: 'POST',
                body: formData,
            })
            /* const response = await fetch("http://localhost:1234/process", {
                method: 'POST',
                body: formData,
            }) */
            console.log(response, response.status, response.body)
            const data = await response.json();
            

            /* if (response.status >= 400) return setMessage("Bir sorun oluştu") */

            const result = {
                "benign": `Verilen kanser görüntüsüne göre ${selectedCategory.toLocaleLowerCase()} iyi huylu olarak tahmin edilmiştir.`,
                "malign": `Verilen kanser görüntüsüne göre ${selectedCategory.toLocaleLowerCase()} kötü huylu olarak tahmin edilmiştir.`,
                "error": "Bir sorun oluştu.",
            }
            return setMessage(result[data.result] || "Bir sorun oluştu.")

        } catch (error) {
            console.error(error);
            return setMessage("Bir sorun oluştu.")
        }
        
    }

    return(
        <>
            <h1>Kanser Teşhisi</h1>
            <fieldset>
                <legend>Fotoğraf Seç</legend>
                <select
                 className="form-input span-entire-row"
                 onChange={event => {
                    setSelectedCategory(event.target.value)
                    setMessage("")
                 }} >
                    <option hidden defaultValue="">Kanser Türü Seçiniz</option>
                    <option value="Akciğer Kanseri">Tür: Akciğer Kanseri</option>
                    <option value="Meme Kanseri">Tür: Meme Kanseri</option>
                </select>

                <div className="info span-entire-row">Görüntünün JPEG formatında olması gerekmektedir.</div>
                
                <label
                    tabIndex="0"
                    role="button"
                    htmlFor="image-file-input"
                    className="file-upload span-entire-row"
                >
                    Görüntü Seç
                </label>
                <input
                    type="file"
                    name="image-file-input"
                    id="image-file-input"
                    accept="image/jpeg"
                    style={{display: "none"}}
                    onChange={({target: {files: [file]}}) => {
                        setFile(file)
                        createImageUrl(file)
                        setMessage("")
                    }}
                />

                <button
                 className="form-submit span-entire-row"
                 onClick={ () => {
                    if (message !== "Yetersiz bilgi" && message) return;
                    return handleUpload()
                }}
                >
                    Devam
                </button>
                {
                    preview && <img
                     className="span-entire-row"
                     src={preview}
                     height={200}
                     width={"auto"}
                     alt="yüklenen görüntü"
                    />
                }

                <HandleMessage message={message}/>

            </fieldset>
        </>
    )
}