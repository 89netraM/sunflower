import React from "react";

const code: string = `for (i ← 0 to numPoints)
	dst ← (i / (numPoints - 1)) ^ pow
	angle ← 2 * π * turnFactor * i

	x ← dst * cos(angle)
	y ← dst * sin(angle)

	// Use point (x, y)`;

function copyCode(): Promise<void> {
	return navigator.clipboard.writeText(code);
}

export function Code(properties: { hidden: boolean }): JSX.Element {
	return (
		<div
			className="code"
			hidden={properties.hidden}
		>
			<button onClick={copyCode}>📄</button>
			<code>
				<span className="line">
					<span className="key">for</span>
					<span className="var">i</span>
					<span>←</span>
					<span className="num">0</span>
					<span className="key">to</span>
					<span className="var">numPoints</span>
					<span>-</span>
					<span className="num">1</span>
				</span>
				<span className="line">
					<span className="var">dst</span>
					<span>←</span>
					<span className="no-space">(</span>
					<span className="var">i</span>
					<span>/</span>
					<span className="no-space">(</span>
					<span className="var">numPoints</span>
					<span>-</span>
					<span className="num no-space">1</span>
					<span className="no-space">)</span>
					<span>)</span>
					<span>^</span>
					<span className="var">pow</span>
				</span>
				<span className="line">
					<span className="var">angle</span>
					<span>←</span>
					<span className="num">2</span>
					<span>*</span>
					<span className="num">π</span>
					<span>*</span>
					<span className="var">turnFraction</span>
					<span>*</span>
					<span className="var">i</span>
				</span>
				<span className="line"></span>
				<span className="line">
					<span className="var">x</span>
					<span>←</span>
					<span className="var">dst</span>
					<span>*</span>
					<span className="fun no-space">cos</span>
					<span className="no-space">(</span>
					<span className="var no-space">angle</span>
					<span>)</span>
				</span>
				<span className="line">
					<span className="var">y</span>
					<span>←</span>
					<span className="var">dst</span>
					<span>*</span>
					<span className="fun no-space">sin</span>
					<span className="no-space">(</span>
					<span className="var no-space">angle</span>
					<span>)</span>
				</span>
				<span className="line"></span>
				<span className="line">
					<span className="comment">// Use point (x, y)</span>
				</span>
			</code>
		</div>
	);
}