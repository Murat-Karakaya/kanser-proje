import { useState } from "react"

export default ()=>{
    const [preview, setPreview] = useState("")
    const [jpgCode, setJpgCode] = useState("")

    const handleFileChange = ({files}) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        }

        if (file) return reader.readAsDataURL(file)

        setPreview(null)
    }
    return(
        <>
            <h1>Kanser Teşhisi</h1>
            <fieldset>
                <legend>Fotoğraf Seç</legend>
                <select className="cancer-select" /* name="cancer-select" */>
                    <option hidden defaultValue="">Kanser Türü Seçiniz</option>
                    <option value="akciğer kanseri">Tür: Akciğer Kanseri</option>
                    <option value="meme kanseri">Tür: Göğüs Kanseri</option>
                    <option value="deri kanseri">Tür: Deri Kanseri</option>
                    <option value="akciğer kanseri">Tür: Lenf Nodu Kanseri</option>
                </select>
                <div className="info">Görüntünün JPEG formantında olması gerekmektedir.</div>
                <div>
                    <label
                     tabIndex="0"
                     role="button" 
                     htmlFor="image-file-input" 
                     className="file-upload">
                        Görüntü Seç
                    </label>
                    
                    <input
                     type="file" 
                     name="image-file-input" 
                     id="image-file-input" 
                     accept="image/jpeg" 
                     style={{display: "none"}}
                     onChange={event => {handleFileChange(event.target)}}/>
                </div>
                <button className="form-submit">Devam</button>
                {preview && <img src={preview} height={200} width={"auto"} alt="yüklenen görüntü" /> }
            </fieldset>
        </>
    )
}