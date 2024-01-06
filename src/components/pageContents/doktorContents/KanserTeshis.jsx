import { useState } from "react"

export default ()=>{
    const [preview, setPreview] = useState("")
    const [selectedCategory, setSelectedCategory] = useState('');
    const [file, setFile] = useState(null);

    const createImageUrl = file => {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result)

        if (file) return reader.readAsDataURL(file)
        setPreview(null)
    }

    const handleUpload = async () => {
        if (!file) return console.log("Dosya yüklenemedi");
  
        const formData = new FormData()
        console.log(selectedCategory)
        formData.append('file', file);
        formData.append('category', selectedCategory);
  
        try {
            /* const response = await fetch("http://localhost:80/", {
                method: 'POST',
                headers,
                body: formData,
            })
            const data = await response.json();
            console.log(data);
            console.log('File uploaded successfully!'); */
        } catch (error) {
            console.error(error);
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
                 onClick={handleUpload}
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
            </fieldset>
        </>
    )
}