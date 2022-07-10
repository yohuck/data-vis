import * as d3 from "d3";

async function drawScatter(){
    //gets JSON data
    let data = await d3.json('./data/wine-data-set.json');

    let pinotNoirData = data.filter(function(item)  {
        return item.variety == 'Pinot Noir'
    })

    let cabernet = data.filter(function(item)  {
        return item.variety == 'Cabernet Sauvignon'
    })

    let chard = data.filter(function(item)  {
        return item.variety == 'Chardonnay'
    })

    console.log(pinotNoirData)


    data = data.filter(function(item){
        return item.price < 100
    })

    data = data.filter(function(elem){
        return !elem.price == 0
    })
    // data = data.slice(0,800)


    
    // Accessor functions
    const xAccessor = d => d.price
    const yAccessor = d => d.points
    const iconAccessor = d => d.country

    // console.table(yAccessor(data[1]), xAccessor(data[1]), iconAccessor(data[1]))

    const width = d3.min([
        window.innerWidth * 0.75,
        window.innerHeight * 0.75
    ])

    const dimensions = {
        width,
        height: width,
        margin: {
            top: 20,
            right: 20,
            bottom: 60,
            left: 60
        }
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    const wrapper = d3.select('#wrapper')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        .style('border', '2px solid black')

    const bounds = wrapper.append('g')
        .style("transform", `translate(
            ${dimensions.margin.left}px, 
            ${dimensions.margin.top}px)`)
        
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => yAccessor(d)))
        .range([dimensions.boundedHeight, 0])
        .nice()

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => xAccessor(d)))
        .range([0, dimensions.boundedWidth])
        .nice()

        
    const drawDots = (data, color) => {
        const dots = bounds.selectAll("circle")    
            .data(data)

            dots.enter()
            .append('circle')
                .attr("cx", d => xScale(d.price))
                .attr("cy", d => yScale(d.points))
                .attr('r', 8)
                .attr('fill', color)    }
        
        // drawDots(pinotNoirData.slice(0,200), 'rgba(248, 8, 120, 0.341)')



        // setTimeout(() => {

        //     drawDots(pinotNoirData, 'rgba(248, 8, 120, 0.341)')
        // }, 3000)

        // setTimeout(() => {

        //     drawDots(pinotNoirData.slice(401,600), 'rgba(248, 8, 120, 0.341)')
        // }, 2000)

        // setTimeout(() => {

        //     drawDots(pinotNoirData.slice(0,400), 'rgba(248, 8, 120, 0.341)')
        // }, 1000)

        // setTimeout(() => {

        //     drawDots(pinotNoirData.slice(0,600), 'rgba(248, 8, 120, 0.341)')
        // }, 2000)
        // setTimeout(() => {

        //     drawDots(pinotNoirData.slice(0,800), 'rgba(248, 8, 120, 0.341)')
        // }, 3000)
        // setTimeout(() => {

        //     drawDots(pinotNoirData, 'rgba(248, 8, 120, 0.341)')
        // }, 4000)

 for (let i = 0; i < data.length; i++){
    setTimeout(() => {
        drawDots(data.slice(0,i), 'rgba(95, 0, 124, 0.05)')
        console.log(i)
    }, i/2)
 }

//  for (let i = 0; i < cabernet.length; i++){
//     setTimeout(() => {
//         drawDots(cabernet.slice(0,i), 'rgba(95, 0, 124, 0.24)')
//         console.log('hello' + i)
//     }, i*10)
//  }



        // setTimeout(() => {
        //     drawDots(chard.slice(0,500), 'black')
        //     console.log('hello?')
        // }, 1000)


        // drawDots(cabernet, 'hsla(266, 33%, 41%, 0.5)')

        // setTimeout( () => drawDots(cabernet, 'hsla(266, 33%, 41%, 0.2)'), 1000);
       

        // let count = 0
        // for (let i = 0; i < data.length; i++){
        //     setTimeout(() => {
        //         drawDots(data.slice(0, count+1))
        //     count++
        //     }, 1300)
        // }

        const xAxisGenerator = d3.axisBottom().scale(xScale)

        const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style('transform', `translateY(${dimensions.boundedHeight}px)`)

        const xAxisLabel = xAxis.append('text')
        .attr("x", dimensions.boundedWidth /2)
        .attr("y", dimensions.margin.bottom -10)
        .text('Price')
        .attr('fill', 'black')
        .style('font-size', '2em')
    
    const yAxisGenerator = d3.axisLeft().scale(yScale)
    // .ticks(5)
    
    const yAxis = bounds.append("g").call(yAxisGenerator)
    .attr('stroke', '2px')

    const yAxisLabel = yAxis
  .append('text')
  .attr("x", -dimensions.boundedHeight / 2)
  .attr('y', -dimensions.margin.left + 30)
  .style('transform', 'rotate(-90deg)')
  .style('fill', 'black')
  .style('font-size', '2em')
  .text('Score')
  .style('text-anchor','middle')

}

drawScatter()