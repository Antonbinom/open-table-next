// in middleware we extract from next/server
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
	const bearerToken = req.headers.get("authorization") as string;

	const handleError = () => {
		return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized request" }), { status: 401 });
	};

	if (!bearerToken) {
		handleError();
	}

	const token = bearerToken.split(" ")[1];

	if (!token) {
		handleError();
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	try {
		jose.jwtVerify(token, secret);
	} catch (error) {
		handleError();
	}
}

export const config = {
	matcher: ["/api/auth/me"],
};
