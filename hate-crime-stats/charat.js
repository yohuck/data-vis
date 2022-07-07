import * as d3 from "d3";

async function drawLineChart() {
    
    const countPerDay = (data) => {
        const hateCrimeData = [];
        let currentYear = 2490
        let count = 1;
        let tempObj = {
            year: currentYear,
            count: 1
        }
        data.forEach(object => {
            if (object.OCC_YEAR < currentYear){
                tempObj.count = count;
                tempObj.year = currentYear;
                hateCrimeData.push({...tempObj})
                count = 1;
                currentYear = object.OCC_YEAR;
                tempObj.count = count;
                tempObj.year = currentYear
            } else if (object.OCC_YEAR == currentYear) {
                count++;
            } else console.log('Update the initial current year')
        }) 
        const first = hateCrimeData.shift()
        return hateCrimeData
    }
    const dataset = await d3.csv("./data/BiasMotivatedCrimes.csv")
    console.log(countPerDay(dataset))
}

drawLineChart();

let compare = (a, b) => {
    if (a < b){
        return -1
    }
    if (a > b){
        return 1
    }
}