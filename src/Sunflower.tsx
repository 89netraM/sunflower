import React, { Component, createRef, ReactNode, RefObject } from "react";
import { getAccentColor } from "./colorFunctions";
import { NumberInput } from "./NumberInput";

interface SunflowerState {
	numPoints: number,
	turnFraction: number,
	pow: number,
}

export class Sunflower extends Component<{}, SunflowerState> {
	private static readonly dotRadius: number = 2.5;

	private readonly canvas: RefObject<HTMLCanvasElement> = createRef();
	private readonly canvasReplacement: RefObject<HTMLDivElement> = createRef();
	private ctx: CanvasRenderingContext2D;

	private get size(): number {
		const rect = this.canvasReplacement.current.getBoundingClientRect();
		return rect.width;
	}
	private get offset(): { x: number, y: number } {
		const rect = this.canvasReplacement.current.getBoundingClientRect();
		return {
			x: rect.left,
			y: rect.top
		};
	}

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
		window.addEventListener("resize", this.updateSize.bind(this), true);
		this.updateSize();
	}
	public componentWillUnmount(): void {
		window.removeEventListener("resize", this.updateSize.bind(this));
	}

	private updateSize(): void {
		const rect = window.document.body.getBoundingClientRect();
		this.canvas.current.width = rect.width;
		this.canvas.current.height = rect.height;

		this.drawSunflower();
	}

	public componentDidUpdate(): void {
		this.drawSunflower();
	}

	private drawSunflower(): void {
		this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);

		for (let i = 0; i < this.state.numPoints; i++) {
			const dst = Math.pow(i / (this.state.numPoints - 1), this.state.pow);
			const angle = 2 * Math.PI * this.state.turnFraction * i;

			const x = dst * Math.cos(angle);
			const y = dst * Math.sin(angle);

			this.drawPoint(x, y);
		}
	}
	private drawPoint(x: number, y: number): void {
		const canvasX = this.offset.x + (x + 1) * this.size / 2 - Sunflower.dotRadius / 2;
		const canvasY = this.offset.y + (y + 1) * this.size / 2 - Sunflower.dotRadius / 2;

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
				<canvas ref={this.canvas} />
				<div
					ref={this.canvasReplacement}
					className="canvas-replacement"
				/>
			</>
		);
	}
}