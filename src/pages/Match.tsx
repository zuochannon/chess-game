import { Button } from "@/components/ui/button";
import { useWhoAmIContext } from "@/context/WhoAmIContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function enqueue(): void {
	fetch(`${import.meta.env.VITE_SERVER}/match/queue`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
}

const Match = () => {
	const [queueLength, setQueueLength] = useState(0);
	const [inQueue, setInQueue] = useState(false);

	const [displayErrorMessage, setErrorMessage] = useState(false);
	const [roomid, setRoomid] = useState(-1);

	const { whoAmI } = useWhoAmIContext();
	
	const [matchedPlayer, setMatch] = useState("");

	const navigate = useNavigate();

	function match(): void {
		fetch(`${import.meta.env.VITE_SERVER}/match/match`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
	}

	const fetchMatch = async () => {
		fetch(`${import.meta.env.VITE_SERVER}/match/getMatches`, {
			method: "GET",
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setMatch(JSON.stringify(data));
			});
	}

	const fetchQueueLength = async () => {
		try {
			fetch(`${import.meta.env.VITE_SERVER}/match/queue_length`, {
				method: "GET",
				credentials: "include",
			})
				.then((response) => response.json())
				.then((data) => setQueueLength(data.len));
		} catch (error) {
			console.error("Error fetching queue length:", error);
		}
	};

	useEffect(() => {
		fetchQueueLength();


		const interval = setInterval(() => { fetchQueueLength(); fetchMatch(); }, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<main
			className="h-screen bg-black flex flex-col items-center"
			style={{ paddingTop: "100px" }}
		>
			<div className="flex justify-center">
				<h1 className="p-2 bg-black text-center w-screen text-3xl font-bold">
					<div className="text-white flex flex-col items-center justify-center gap-4 p-4">
						<div>Match</div>
						<Button
							disabled={inQueue}
							onClick={() => {
								if (!whoAmI) {
									// Checks if player is signed in to create a room
									setErrorMessage(true);
									return;
								}
								setInQueue(true);
								enqueue();
								setQueueLength(queueLength + 1);
							}}
							className="w-fit"
						>
							Queue
						</Button>
						<Button onClick={match} className="w-fit">
							Random match
						</Button>
						<div>Users in queue: {queueLength}</div>
					</div>
				</h1>
			</div>
			{displayErrorMessage && (
				<div className="error-message text-white mt-4">
					Please log in to create a game.
				</div>
			)}
			<h3 className="text-white">
				{matchedPlayer}
			</h3>
		</main>
	);
};

export default Match;
