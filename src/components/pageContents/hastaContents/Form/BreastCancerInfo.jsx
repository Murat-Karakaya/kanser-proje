export default ({message}) => {
    switch (message) {
        case "age < ageMenarche":
        return <p className="span-entire-row">Yaşınız ilk adet yaşınızdan küçük olamaz.</p>
        
        case "age < firstBirthAge":
        return <p className="span-entire-row">Yaşınız ilk adet yaşınızdan küçük olamaz.</p>
        
        case "empty form":
        return <p className="span-entire-row">Yaşınız ilk adet yaşınızdan küçük olamaz.</p>
        
        case "benign":
        return <p className="span-entire-row">Yaşınız ilk adet yaşınızdan küçük olamaz.</p>
    
        case "malign":
        return (
            <div className="span-entire-row">
            <p>Kanser riskiniz yüksek olduğu için size aşağıdaki tavsiyelere uymanızı öneriyoruz:</p>
            <ul>
                <li>Her 6-12 ayda bir Klinik muayeneye gidiniz.</li>
                <li>Tomosentez ile yıllık tarama mamografisi yaptırınız.</li>
            </ul>
            </div>
        )

        case "error":
        return <p className="span-entire-row">Doldurduğunuz formdan sonuç alınamamıştır.</p>
        
        default:
        return <></>
    }
        
}