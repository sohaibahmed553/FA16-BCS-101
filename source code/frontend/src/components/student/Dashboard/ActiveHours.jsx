import React, { Component } from "react";

import { ResponsiveLine } from "@nivo/line";

class ActiveHours extends Component {
	render() {
		const data = [
			{
				id: "japan",
				color: "hsl(356, 70%, 50%)",
				data: [
					{
						x: "Mon",
						y: 5,
					},
					{
						x: "Tues",
						y: 8,
					},
					{
						x: "Wed",
						y: 6,
					},
					{
						x: "Thur",
						y: 11,
					},
					{
						x: "Fri",
						y: 3,
					},
					{
						x: "Sat",
						y: 2,
					},
					{
						x: "Sun",
						y: 7,
					},
				],
			},
		];

		return (
			<div style={{ height: "300px", backgroundColor: "white" }}>
				<ResponsiveLine
					data={data}
					minValue={0}
					maxValue={24}
					margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
					xScale={{ type: "point" }}
					yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						orient: "bottom",
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "transportation",
						legendOffset: 36,
						legendPosition: "middle",
					}}
					axisLeft={{
						orient: "left",
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "count",
						legendOffset: -40,
						legendPosition: "middle",
					}}
					colors={"#2196F3"}
					pointSize={10}
					pointColor={{ theme: "background" }}
					pointBorderWidth={2}
					pointBorderColor={{ from: "serieColor" }}
					pointLabel="y"
					pointLabelYOffset={-12}
					useMesh={true}
					legends={[
						{
							anchor: "bottom-right",
							direction: "column",
							justify: false,
							translateX: 100,
							translateY: 0,
							itemsSpacing: 0,
							itemDirection: "left-to-right",
							itemWidth: 80,
							itemHeight: 20,
							itemOpacity: 0.75,
							symbolSize: 12,
							symbolShape: "circle",
							symbolBorderColor: "rgba(0, 0, 0, .5)",
							effects: [
								{
									on: "hover",
									style: {
										itemBackground: "rgba(0, 0, 0, .03)",
										itemOpacity: 1,
									},
								},
							],
						},
					]}
				/>
			</div>
		);
	}
}
export default ActiveHours;
