import React, { Component, createRef, ReactNode, RefObject } from "react";

interface SunflowerState {

}

export class Sunflower extends Component<{}, SunflowerState> {
	private readonly canvas: RefObject<HTMLCanvasElement> = createRef();

	public constructor(properties: {}) {
		super(properties);
	}

	public render(): ReactNode {
		return (
			<>
				<aside>
				</aside>
				<canvas ref={this.canvas} />
			</>
		);
	}
}