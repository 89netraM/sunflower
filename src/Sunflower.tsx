import React, { Component, createRef, ReactNode, RefObject } from "react";
import { NumberInput } from "./NumberInput";

interface SunflowerState {
	numPoints: number,
	turnFraction: number,
	pow: number,
}

export class Sunflower extends Component<{}, SunflowerState> {
	private readonly canvas: RefObject<HTMLCanvasElement> = createRef();

	public constructor(properties: {}) {
		super(properties);

		this.state = {
			numPoints: 10,
			turnFraction: 1.618,
			pow: 0.5,
		};
	}

	public render(): ReactNode {
		return (
			<>
				<aside>
					<NumberInput
						value={this.state.numPoints}
						min={1}
						step={1}
						onChange={v => this.setState({ numPoints: v })}
					>
						Number of Points:
					</NumberInput>
					<NumberInput
						value={this.state.turnFraction}
						onChange={v => this.setState({ turnFraction: v })}
					>
						Turn Fraction:
					</NumberInput>
					<NumberInput
						value={this.state.pow}
						onChange={v => this.setState({ pow: v })}
					>
						Power:
					</NumberInput>
				</aside>
				<canvas ref={this.canvas} />
			</>
		);
	}
}