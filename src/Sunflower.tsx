import React, { Component, createRef, ReactNode, RefObject } from "react";
import { getAccentColor } from "./colorFunctions";
import { NumberInput } from "./NumberInput";

interface SunflowerState {
	numPoints: number,
	turnFraction: number,
	pow: number,
}

export class Sunflower extends Component<{}, SunflowerState> {
	private static readonly size: number = 500;
	private static readonly dotRadius: number = 2.5;

	private readonly canvas: RefObject<HTMLCanvasElement> = createRef();
	private ctx: CanvasRenderingContext2D;

	public constructor(properties: {}) {
		super(properties);

		this.state = {
			numPoints: 100,
			turnFraction: 1.618,
			pow: 0.5,
		};
	}

	public componentDidMount(): void {
		this.ctx = this.canvas.current.getContext("2d");
		this.drawSunflower();
	}
	public componentDidUpdate(): void {
		this.drawSunflower();
	}

	private drawSunflower(): void {
		this.ctx.clearRect(0, 0, Sunflower.size, Sunflower.size);

		for (let i = 0; i < this.state.numPoints; i++) {
			const dst = Math.pow(i / (this.state.numPoints - 1), this.state.pow);
			const angle = 2 * Math.PI * this.state.turnFraction * i;

			const x = dst * Math.cos(angle);
			const y = dst * Math.sin(angle);

			this.drawPoint(x, y);
		}
	}
	private drawPoint(x: number, y: number): void {
		const canvasX = (x + 1) * Sunflower.size / 2 - Sunflower.dotRadius / 2;
		const canvasY = (y + 1) * Sunflower.size / 2 - Sunflower.dotRadius / 2;

		this.ctx.fillStyle = getAccentColor();
		this.ctx.beginPath();
		this.ctx.ellipse(
			canvasX,
			canvasY,
			Sunflower.dotRadius,
			Sunflower.dotRadius,
			0,
			0,
			Math.PI * 2
		);
		this.ctx.fill();
		this.ctx.closePath();
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
				<canvas
					ref={this.canvas}
					width={Sunflower.size}
					height={Sunflower.size}
				/>
			</>
		);
	}
}