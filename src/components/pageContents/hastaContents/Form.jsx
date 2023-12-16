import { useState } from "react"

export default ()=>{
    const [age, setAge] = useState("")
    function isNumberKey(evt) {
        const charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            return false;
        }
        return true;
    }
    return(
        <>
            <h1>Form Doldurma</h1>
            <p>Aşağıdaki formu doldurarak göğüs kanserine karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz.</p>
            <fieldset>
                <legend>Form</legend>
                <label htmlFor="age-input">Yaşınız:</label>
                <input
                 className="form-input ordered" 
                 style={{"--order":"0"}}
                 id="age-input" 
                 type="text" 
                 onKeyDown={isNumberKey}
                 onChange={(evt) => setAge(evt.target.value)} 
                 value={age} 
                />

                <label htmlFor="menstruation-age">İlk adet görme yaşı:</label>
                <select className="form-input ordered" style={{"--order":"0"}} id="menstruation-age">
                    <option defaultValue="unknown">Bilinmiyor</option>
                    <option value="x<12">12'den küçük</option>
                    <option value="12<x<13">12 ile 13 yaş aralığında</option>
                    <option value="13<x">13'den büyük</option>
                </select>

                <label htmlFor="first-birth-age">İlk doğum gerçekleştirme yaşı:</label>
                <select className="form-input ordered" style={{"--order":"0"}} id="first-birth-age">
                    <option defaultValue="unknown">Bilinmiyor</option>
                    <option value="no-birth">Doğum gerçekleşmedi</option>
                    <option value="x<20">20 yaş altı</option>
                    <option value="20<x<24">20 ile 24 yaş aralığında</option>
                    <option value="25<x<29">25 ile 29 yaş aralığında</option>
                    <option value="30<x">25 ile 29 yaş aralığında</option>
                </select>

                <label htmlFor="first-degree-relatives">Göğüs kanseri görmüş 1. dereceden akraba sayısı:</label>
                <select className="form-input ordered" style={{"--order":"0"}} id="first-degree-relatives">
                    <option defaultValue="unknown">Bilinmiyor</option>
                    <option value="0">0 kişi</option>
                    <option value="1">1 kişi</option>
                    <option value="2<=x">2 veya 2'den fazla</option>
                </select>

                <label htmlFor="menstruation-age">İlk adet görme yaşı:</label>
                <select className="form-input ordered" style={{"--order":"0"}} id="menstruation-age">
                    <option defaultValue="unknown">Bilinmiyor</option>
                    <option value="x<12">12'den küçük</option>
                    <option value="12<x<13">12 ile 13 yaş aralığında</option>
                    <option value="13<x">13'den büyük</option>
                </select>
                <button className="form-submit">Devam</button>
            </fieldset>
        </>
    )
}
