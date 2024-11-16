// /pages/api/user/getProfile.ts
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]"; // adjust path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the session, which includes the access token
  const session = await getServerSession(req, res, authOptions);

  // Check if session exists and accessToken is available
  if (!session || !session.user || !session.user.connections) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No connections found" });
  }

  const userConnections = session.user.connections;

  if (!userConnections) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No connections found" });
  }
  // find the working connection
  const connection = Object.values(userConnections).find(
    (connection) => connection.accessToken
  );
  if (!connection) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No Telegram or Discord connection found" });
  }
  if (!connection || !connection.accessToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No access token found" });
  }

  const accessToken = connection.accessToken;

  try {
    const response = await fetch(`${process.env.NEST_API_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const error = await response.json();
      return res
        .status(response.status)
        .json({ error: error.message || "Failed to fetch profile" });
    }

    // Parse and return the response data
    const profileData = await response.json();
    return res.status(200).json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
