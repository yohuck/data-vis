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
        return hateCrimeData
    }

    const dataset = await d3.csv("./data/BiasMotivatedCrimes.csv")
    const countData = countPerDay(dataset);

    const yAccessor = d => d.count
    const parseDate = d3.timeParse("%Y")
    const xAccessor = d => parseDate(d.year)
    const wrap = document.getElementById('wrapper')

    let dimensions = {
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.5,
        margins: {
            top: 15,
            right: 15,
            bottom: 30,
            left: 30,
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
                .attr("stroke", '#B74F6F')
                .attr("stroke-width", 5)
                .attr("fill", "none")
                .attr("class", "path")

    const yAxisGenerator = d3.axisLeft()
                .scale(yScale)
    const xAxisGenerator = d3.axisBottom()
                .scale(xScale)
    const yAxis = bounds.append("g")
                .call(yAxisGenerator)
                .style("font-family", "monospace")
                .attr("stroke-width", 2)
    const xAxis = bounds.append("g")
                .call(xAxisGenerator)
                .style("transform", `translateY(${dimensions.boundedHeight}px)`)
                .style("font-family", "monospace")
                .attr("stroke-width", 2)

                var path = document.querySelector('.path');
var length = path.getTotalLength();
console.log(length)
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