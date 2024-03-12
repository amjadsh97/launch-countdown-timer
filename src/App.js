import React, {useEffect, useState} from "react";
import {facebookIcon, instagramIcon, pinterestIcon} from "./images"
import "./reset.css"
import './App.css';

function App() {

	const calculateTimeLeft = () => {
		const difference = +new Date("2024-03-27") - +new Date();

		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		}

		timeLeft.days = timeLeft.days < 10 ? '0' + timeLeft.days : timeLeft.days;
		timeLeft.hours = timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours;
		timeLeft.minutes = timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes;
		timeLeft.seconds = timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds;

		if (timeLeft.minutes === '00') {
			timeLeft.seconds = '00';
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const timerComponents = [];
	console.log({timeLeft})
	Object.keys(timeLeft).forEach(interval => {
		if (!timeLeft[interval]) {
			return;
		}

		timerComponents.push(
			<div className={`counter-wrapper ${interval === "seconds" ? "seconds-wrapper" : ""}`}>
				<div className="value">
					<div className="value-wrapper">
						<span className="bg"></span>
						<span className="time">{timeLeft[interval]}</span>
					</div>
				</div>
				<span className="counter-name">{interval}</span>
			</div>
		);
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft]);

	return (
		<div className="app">
			<div className="app-wrapper">
				<h1 className="title">we are launching soon</h1>
				<div className="counter">

					{timerComponents.length ? timerComponents : <span>Time's up!</span>}
				</div>

				<div className="footer-links">
					<ul className="list">
						<li className="list-item">
							<a href="#">{facebookIcon}</a>
						</li>
						<li className="list-item">
							<a href="#">{instagramIcon}</a>
						</li>
						<li className="list-item">
							<a href="#">{pinterestIcon}</a>
						</li>

					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
