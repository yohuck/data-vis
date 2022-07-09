import * as d3 from "d3";

async function drawScatter(){
    //gets JSON data
    let data = await d3.json('./data/wine-data-set.json');
    data = data.filter(function(item){
        return item.price < 100
    })
    data = data.slice(0,3000)
    
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
        .style('border', '5px solid black')

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

    const drawDots = data => {
        const dots = bounds.selectAll("circle")
            .data(data)

            dots.join("circle")
                .attr("cx", d => xScale(d.price))
                .attr("cy", d => yScale(d.points))
                .attr('r', 5)
                .attr('fill', 'purple')    }
        let count = 0
        for (let i = 0; i < data.length; i++){
            
            setTimeout(() => {
                drawDots(data.slice(0, count+1))
            count++
            }, 100)
        }

}

drawScatter()