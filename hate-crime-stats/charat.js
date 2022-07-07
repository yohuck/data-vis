import * as d3 from "d3";

async function drawLineChart() {
    
    const countPerDay = (data) => {
        const arr = [];
        let currentYear = 2000
        let count = 1;
        let tempObj = {
            year: currentYear,
            count: 1
        }
        data.forEach(object => {
            if (object.OCC_YEAR > currentYear){
                tempObj.count = count
                arr.push(tempObj)
                count = 1;
                currentYear = object.OCC_YEAR;
            } else {
                count++;
                console.log({count, currentYear})
            }
        }) 
        return arr
        // countPerDay(dataset)
    }
    const dataset = await d3.csv("./data/BiasMotivatedCrimes.csv")
    console.log(dataset)
    console.log(countPerDay(dataset))
}

drawLineChart();