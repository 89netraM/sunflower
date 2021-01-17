import React, { Component, createRef, ReactNode, RefObject } from "react";
import { Code } from "./Code";
import { getAccentColor, getComplimentColor } from "./colorFunctions";
import { NumberInput } from "./NumberInput";

interface SunflowerState {
	codeVisible: boolean,
	numPoints: number,
	turnFraction: number,
	pow: number,
	shouldHighlight: boolean,
	highlight: number,
	highlightOffset: number,
}

export class Sunflower extends Component<{}, SunflowerState> {
	private static readonly goldenRatio: number = 1.618;
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

	private get stepSize(): number {
		return Math.round(this.state.highlight / this.state.turnFraction / this.state.turnFraction);
	}

	public constructor(properties: {}) {
		super(properties);

		this.state = {
			codeVisible: false,
			numPoints: 1000,
			turnFraction: Sunflower.goldenRatio,
			pow: 0.5,
			shouldHighlight: false,
			highlight: 34,
			highlightOffset: 0,
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

			this.drawPoint(
				x,
				y,
				this.state.shouldHighlight &&
					(i + this.state.highlightOffset * this.stepSize) % this.state.highlight === 0 ?
					getComplimentColor() :
					getAccentColor()
			);
		}
	}
	private drawPoint(x: number, y: number, color: string): void {
		const canvasX = this.offset.x + (x + 1) * this.size / 2 - Sunflower.dotRadius / 2;
		const canvasY = this.offset.y + (y + 1) * this.size / 2 - Sunflower.dotRadius / 2;

		this.ctx.fillStyle = color;
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
						min={0}
						step={50}
						suggestedMax={2000}
						onChange={v => this.setState({ numPoints: v })}
					>
						Number of Points:
					</NumberInput>
					<NumberInput
						value={this.state.turnFraction}
						suggestedMin={1.5}
						suggestedStep={0.01}
						suggestedMax={2}
						onChange={v => this.setState({ turnFraction: v })}
					>
						<span className="separate">
							<span>Turn Fraction:</span>
							<span
								className="clickable"
								onClick={() => this.setState({ turnFraction: Sunflower.goldenRatio })}
							>
								↩
							</span>
						</span>
					</NumberInput>
					<NumberInput
						value={this.state.pow}
						suggestedMin={-1}
						suggestedStep={0.01}
						suggestedMax={1}
						onChange={v => this.setState({ pow: v })}
					>
						Power:
					</NumberInput>
					<button onClick={() => this.setState({ codeVisible: !this.state.codeVisible })}>
						{this.state.codeVisible ? "Hide Pseudocode" : "Show Pseudocode"}
					</button>
					<hr />
					<p>
						<label>
							Highlight:
							<input
								type="checkbox"
								onChange={e => this.setState({ shouldHighlight: e.target.checked })}
							/>
							<span className="toggle" />
						</label>
					</p>
					<div hidden={!this.state.shouldHighlight}>
						<NumberInput
							value={this.state.highlight}
							min={0}
							step={1}
							suggestedMax={89}
							onChange={v => this.setState({
								highlight: v,
								highlightOffset: Math.min(this.state.highlightOffset, v)
							})}
						>
							Offset:
						</NumberInput>
						<NumberInput
							value={this.state.highlightOffset}
							min={0}
							step={1}
							suggestedMax={this.state.highlight}
							onChange={v => this.setState({ highlightOffset: v })}
						>
							Arm:
						</NumberInput>
					</div>
				</aside>
				<canvas ref={this.canvas} />
				<div
					ref={this.canvasReplacement}
					className="canvas-replacement"
				>
					<Code hidden={!this.state.codeVisible} />
				</div>
			</>
		);
	}
}