import React from 'react'
import { useEffect, useState } from 'react'


function usecurrencyinfo(currency) {
    const [data, setData] = useState({})
        useEffect(() => {
                fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UlrmRAIgTHVionNnspzaxScKH9OQ4QZyB60Mw5u6&currencies=AUD%2CBGN%2CBRL%2CCAD%2CCHF%2CCNY%2CCZK%2CDKK%2CEUR%2CGBP%2CHKD%2CHRK%2CHUF%2CIDR%2CILS%2CINR%2CISK%2CJPY%2CKRW%2CMXN%2CMYR%2CNOK%2CNZD%2CPHP%2CPLN%2CRON%2CRUB%2CSEK%2CSGD%2CTHB%2CTRY%2CUSD%2CZAR&base_currency=${currency}.json`)
                .then((res) => res.json())
                .then((res) => setData(res[currency]))
                console.log(data)
            }, [currency])
            return data
}

export default usecurrencyinfo;
