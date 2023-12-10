import { useState } from "react"

export default ()=>{
    const [preview, setPreview] = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
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
                    <option value="meme kanseri">Tür: Meme Kanseri</option>
                    <option value="deri kanseri">Tür: Deri Kanseri</option>
                    <option value="akciğer kanseri">Tür: Akciğer Kanseri</option>
                </select>
                <div className="info">Görüntünün JPEG formantında olması gerekmektedir.</div>
                {/* <input type="file" name="image-file-input" id="image-file-input" accept="image/jpeg"/> */}
                <div>
                    <label htmlFor="image-file-input" className="file-upload">Pick an image</label>
                    <input
                     type="file" 
                     name="image-file-input" 
                     id="image-file-input" 
                     accept="image/jpeg" 
                     style={{display: "none"}}
                     onChange={handleFileChange}/>
                    
                </div>
                <img src={preview} alt="Image preview..." />
            </fieldset>
        </>
    )
}