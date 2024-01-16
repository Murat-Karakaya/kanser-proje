import { useAtom } from "jotai";
import { useState } from "react"
import { patentInfosAtom } from "../../../jotai/atoms";

const HandleMessage = ({message}) => {
    const [patientInfos, setPatientInfos] = useAtom(patentInfosAtom)

    const [selectedPatient, setSelectedPatient] = useState(null)

    const handlePatientInfos = async () => {
        /* patentInfosAtom.map(obj => obj.patientemail === selectedPatient ? obj.info.filter((el) => el[0])) */
    }

    if (!message) return <></>
    if (message === "Bir sorun oluştu." || message === "Yetersiz bilgi") return <p>{message}</p>

    return(<>
        <p>{message}</p>
        <p>Eğer görsel hastalarınızdan birisine aitse o hasta için kaydedebilirsiniz.</p>

        <select className="form-input span-entire-row" onChange={event => setSelectedPatient(event.target.value)} >
            <option hidden defaultValue="">Hasta Seçiniz</option>
            {patientInfos.map(({patientemail}) =>(
                <option value={patientemail}>{patientemail}</option>
            ))}
        </select>

        <button
         className="form-submit span-entire-row" 
         onClick={(e)=> selectedPatient && handlePatientInfos()}
        >
            Kaydet
        </button>
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
            /* const response = await fetch("http://localhost:80/process", {
                method: 'POST',
                mode: "no-cors",
                body: formData,
            }) */
            const response = await fetch("http://localhost:1234/process", {
                method: 'POST',
                body: formData,
            })
            const data = await response.json();
            console.log(data);

            if (response.status >= 4000) return setMessage("Bir sorun oluştu")

            const cancers = {

            }

            const result = {
                "benign": "Tomografi görüntüsüne göre kanser iyi huylu olarak tahmin edilmiştir.",
                "malign": "Tomografi görüntüsüne göre kanser kötü huylu olarak tahmin edilmiştir.",
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
                <select className="form-input span-entire-row" onChange={event => setSelectedCategory(event.target.value)} >
                    <option hidden defaultValue="">Kanser Türü Seçiniz</option>
                    <option value="Akciğer Kanseri">Tür: Akciğer Kanseri</option>
                    <option value="Meme Kanseri">Tür: Meme Kanseri</option>
                    <option value="Deri Kanseri">Tür: Deri Kanseri</option>
                    <option value="Lenf Nodu Kanseri">Tür: Lenf Nodu Kanseri</option>
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
                    onChange={event => {
                        setFile(event.target.files[0])
                        createImageUrl(event.target.files[0])
                    }}
                />

                <button
                 className="form-submit span-entire-row" 
                 onClick={(e)=> !message && handleUpload()}
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

                <HandleMessage selectedCategory={selectedCategory} message={message}/>

            </fieldset>
        </>
    )
}