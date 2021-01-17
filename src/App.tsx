import React, { Component, ReactNode } from "react";
import { Sunflower } from "./Sunflower";

export class App extends Component<{}, {}> {
	public constructor(properties: {}) {
		super(properties);
	}

	public render(): ReactNode {
		return (
			<>
				<header>
					<h1>Sunflower</h1>
					<p><small>Fibonacci Distribution in a Circle</small></p>
				</header>
				<main>
					<Sunflower/>
				</main>
			</>
		);
	}
}