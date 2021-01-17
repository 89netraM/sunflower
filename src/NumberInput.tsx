import React, { Component, ReactNode } from "react";

export interface NumberInputProperties {
	value: number,
	min?: number,
	step?: number,
	max?: number,
	readOnly?: boolean,
	onChange?: (newValue: number) => void,
}
interface NumberInputState {
	text: string,
	isValid: boolean,
}

export class NumberInput extends Component<NumberInputProperties, NumberInputState> {
	private static prettify(value: number): string {
		return value.toString();
	}

	public constructor(props: NumberInputProperties) {
		super(props);

		this.state = {
			text: NumberInput.prettify(this.props.value),
			isValid: true
		};
	}

	public componentDidUpdate(prevProps: NumberInputProperties): void {
		if (this.props.value !== prevProps.value && this.props.value !== parseFloat(this.state.text)) {
			this.setState({
				text: NumberInput.prettify(this.props.value),
				isValid: true
			});
		}
	}

	private updateText(newText: string): void {
		const newValue = parseFloat(newText);
		let isValid = !isNaN(newValue) &&
			(this.props.min == null || this.props.min <= newValue) &&
			(this.props.max == null || newValue <= this.props.max);
		this.setState({
			text: newText,
			isValid
		});

		if (this.props.onChange != null && isValid) {
			this.props.onChange(newValue);
		}
	}

	public render(): ReactNode {
		return (
			<p>
				<label className={`${!this.state.isValid ? "error" : ""}`}>
					{this.props.children}
					<input
						type="number"
						min={this.props.min}
						step={this.props.step || 0.1}
						max={this.props.max}
						value={this.state.text}
						readOnly={this.props.readOnly}
						onChange={e => this.updateText(e.target.value)}
					></input>
				</label>
			</p>
		);
	}
}