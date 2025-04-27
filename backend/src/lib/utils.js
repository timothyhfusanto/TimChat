import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {

	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d"
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development", // true in production
		sameSite: process.env.NODE_ENV !== "development" ? "None" : "Lax", // ✅ dynamic: None for production, Lax for dev
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});

	return token;
};