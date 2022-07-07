import * as d3 from "d3";

async function drawLineChart() {
    
    const countPerDay = (data) => {
        const hateCrimeData = [];
        let currentYear = 2490
        let currentDate = '2050-12-31'
        let count = 1;
        let tempObj = {
            date: currentDate,
            year: currentYear,
            count: 1
        }
        data.forEach(object => {
            if (object.OCC_YEAR < currentYear){
                tempObj.count = count;
                tempObj.year = currentYear;
                tempObj.date = currentDate;
                hateCrimeData.push({...tempObj})
                count = 1;
                currentYear = object.OCC_YEAR;
                currentDate = object.OCC_DATE;
                tempObj.date = currentDate
                tempObj.count = count;
                tempObj.year = currentYear
            } else if (object.OCC_YEAR == currentYear) {
                count++;
            } else console.log('Update the initial current year')
        }) 
        const first = hateCrimeData.shift()
        const second = hateCrimeData.shift()
        // const last = hateCrimeData.pop()
        return hateCrimeData
    }
    const dataset = await d3.csv("./data/BiasMotivatedCrimes.csv")
    console.log(dataset)
    const countData = countPerDay(dataset);

    console.log(countData)

    const yAccessor = d => d.count
    // const parseDate = d3.timeParse("%Y-%m-%d")
    // const xAccessor = d => parseDate(d.year)
    const parseDate = d3.timeParse("%Y")
    const xAccessor = d => parseDate(d.year)

    console.log(yAccessor(countData[1]))
    console.log(xAccessor(countData[1]))


    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margins: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 60,
        }
    }
    dimensions.boundedWidth = dimensions.width
        - dimensions.margins.left
        - dimensions.margins.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margins.top
        - dimensions.margins.bottom

    const wrapper = d3.select('#wrapper')
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)

    const bounds = wrapper
        .append('g')
            .style(
                'transform',
                `translate(${
                    dimensions.margins.left
                }px, ${dimensions.margins.top
                }px)`);
            
    const yScale = d3.scaleLinear()
                .domain(d3.extent(countData, yAccessor))
                .range([dimensions.boundedHeight, 0])

    const xScale = d3.scaleTime()
                .domain(d3.extent(countData, xAccessor))
                .range([0, dimensions.boundedWidth])

    const lineGenerator = d3.line()
                .x(d => xScale(xAccessor(d)))
                .y(d => yScale(yAccessor(d)))
    const line = bounds.append("path")
                .attr("d", lineGenerator(countData))
                .attr("stroke", '#af9358')
                .attr("stroke-width", 2)
                .attr("fill", "none")

    const yAxisGenerator = d3.axisLeft()
                .scale(yScale)
    const xAxisGenerator = d3.axisBottom()
                .scale(xScale)
    const yAxis = bounds.append("g")
                .call(yAxisGenerator)
    const xAxis = bounds.append("g")
                .call(xAxisGenerator)
                .style("transform", `translateY(${dimensions.boundedHeight}px)`)
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