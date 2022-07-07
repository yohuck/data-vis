import * as d3 from "d3";

async function drawLineChart() {
    const dataset = await d3.csv('./data/BiasMotivatedCrimes.csv')

    console.log(dataset)
}