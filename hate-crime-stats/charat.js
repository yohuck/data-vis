import * as d3 from "d3";

async function drawLineChart() {
    
    const countPerDay = (data) => {
        const arr = [];
        let currentYear = 2490
        let count = 1;
        let tempObj = {
            year: currentYear,
            count: 1
        }
        data.forEach(object => {
            if (object.OCC_YEAR < currentYear){
                console.log(tempObj)
                arr.push(tempObj)
                console.log(arr)
                // tempObj.count = count
                // tempObj.year = object.OCC_YEAR
                // arr.push(tempObj)
                count = 1;
                currentYear = object.OCC_YEAR;
                console.log(currentYear)
                tempObj.count = count;
                tempObj.year = currentYear
            } else if (object.OCC_YEAR == currentYear) {
                count++;
                tempObj.count = count;
                tempObj.year = currentYear;
                console.log(tempObj)
                // console.log({count, currentYear})
            } else console.log('hello')
        }) 
        return arr
        // countPerDay(dataset)
    }
    const dataset = await d3.csv("./data/BiasMotivatedCrimes.csv")
    console.log(dataset)
    let newSet = dataset.sort((a,b) => a.OCC_YEAR > b.OCC_YEAR)
    console.log(newSet)
    console.log(countPerDay(newSet))
    // console.log(countPerDay(dataset))
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