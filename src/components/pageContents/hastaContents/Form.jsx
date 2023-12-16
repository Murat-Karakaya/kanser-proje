export default ()=>{

    return(
        <>
            <h1>Form Doldurma</h1>
            <p>Aşağıdaki formu doldurarak göğüs kanserine karşı risk ölçümü ve tavsiyeler sunmamıza yardımcı olabilirsiniz.</p>
            <fieldset>
                <legend>Form</legend>
                <label htmlFor="age-input">Yaşınız:</label>
                <input id="age-input" type="number" />

                <label htmlFor="menstruation-age">İlk adet görme yaşı:</label>
                <select id="menstruation-age">
                    <option defaultValue="unknown">Bilinmiyor</option>
                    <option value="x<12">12'den küçük</option>
                    <option value="12<x<13">12 ile 13 yaş aralığında</option>
                    <option value="13<x">13'den büyük</option>
                </select>

                <label htmlFor="first-birth-age">İlk doğum gerçekleştirme yaşı:</label>
                <select id="first-birth-age">
                    <option defaultValue="unknown">Bilinmiyor</option>
                    <option value="no-birth">Doğum gerçekleşmedi</option>
                    <option value="x<20">20 yaş altı</option>
                    <option value="20<x<24">20 ile 24 yaş aralığında</option>
                    <option value="25<x<29">25 ile 29 yaş aralığında</option>
                    <option value="30<x">25 ile 29 yaş aralığında</option>
                </select>

                <label htmlFor="first-degree-relatives">Göğüs kanseri geçirmiş 1. dereceden akraba sayısı:</label>
                <select id="first-degree-relatives">
                    <option defaultValue="unknown">Bilinmiyor</option>
                    <option value="0">0 kişi</option>
                    <option value="1">1 kişi</option>
                    <option value="2<=x">2 veya 2'den fazla</option>
                </select>

                <label htmlFor="menstruation-age">İlk adet görme yaşı:</label>
                <select id="menstruation-age">
                    <option value="x<12">12'den küçük</option>
                    <option value="12<x<13">12 ile 13 yaş aralığında</option>
                    <option value="13<x">13'den büyük</option>
                    <option defaultValue="unknown">Bilinmiyor</option>
                </select>
            </fieldset>
        </>
    )
}
