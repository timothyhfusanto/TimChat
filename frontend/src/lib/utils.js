export function formateMessageTime(date) {
	return new Date(date).toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}