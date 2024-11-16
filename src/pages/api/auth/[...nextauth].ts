import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash, createHmac } from "crypto";
import { JWT } from "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      connections: {
        [provider: string]: {
          name: string;
          username: string;
          image: string;
          accessToken?: string;
          expirationTime?: number;
          refreshToken?: string;
          refreshTokenExpirationTime?: number;
          hasLinkedSolana?: boolean;
          provider?: string;
        };
      };
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession["user"];
  }
  interface User {
    username?: string;
    provider?: string;
  }
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

interface CustomJWT extends JWT {
  connections?: {
    [provider: string]: {
      name: string;
      image: string;
      accessToken?: string;
      expirationTime?: number;
      refreshToken?: string;
      refreshTokenExpirationTime?: number;
      hasLinkedSolana?: boolean;
      provider?: string;
    };
  };
}

function verifyTelegramAuth(data: any): boolean {
  if (!data || !data.id || !data.username || !data.hash) {
    console.error("Missing Telegram data:", data);
    return false;
  }
  // console.log("Verifying Telegram auth:", data);
  const { hash, ...params } = data;
  Object.keys(params).forEach(
    (key) =>
      params[key] === undefined ||
      (params[key] === "undefined" && delete params[key])
  );
  // Generate the secret using the SHA-256 hash of the Telegram bot token
  const secret = createHash("sha256").update(TELEGRAM_BOT_TOKEN).digest();

  const checkString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("\n");
  const hmac = createHmac("sha256", secret).update(checkString).digest("hex");

  // console.log("Calculated hash:", hmac);
  // console.log("Received hash:", hash);

  return hmac === hash;
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Telegram",
      credentials: {
        id: { type: "text" },
        first_name: { type: "text" },
        last_name: { type: "text" },
        username: { type: "text" },
        photo_url: { type: "text" },
        hash: { type: "text" },
        auth_date: { type: "number" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const isValid = verifyTelegramAuth({
          auth_date: credentials.auth_date,
          id: credentials.id,
          first_name: credentials.first_name,
          last_name: credentials.last_name,
          username: credentials.username,
          photo_url: credentials.photo_url,
          hash: credentials.hash,
        });
        if (!isValid) return null;
        return {
          id: credentials.id,
          name: `${credentials.first_name} ${
            credentials?.last_name || ""
          }`.trim(),
          image: credentials.photo_url,
          username: credentials.username,
          provider: "telegram",
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const provider = "telegram"; // Change this to the provider you need

      const connection = (token as CustomJWT).connections?.[provider];

      return {
        ...session,
        user: {
          ...session.user,
          connections: (token as CustomJWT).connections || {},
          accessToken: connection?.accessToken, // Flatten the accessToken
          refreshToken: connection?.refreshToken, // Flatten the refreshToken
          expirationTime: connection?.expirationTime,
          refreshTokenExpirationTime: connection?.refreshTokenExpirationTime,
          id: token.sub!,
        },
      };
    },
    async jwt({ token, user, account }): Promise<CustomJWT> {
      if (user) {
        token.sub = user.id;
      }
      if (account) {
        const customToken = token as CustomJWT;
        console.log("Account:", account);
        console.log("User:", user);
        console.log({
          provider: account.provider,
          providerId: user?.id || "",
          name: user?.name || "",
          avatarUrl: user?.image || "",
        });

        const reponse = await fetch(`${process.env.NEST_API_URL}/user/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: user?.provider || account.provider || "discord",
            providerId: user?.id || "",
            name: user?.username || user?.name || "",
            avatarUrl: user?.image || "",
          }),
        }).then((res) => res.json());
        if (reponse.error) {
          throw new Error(reponse.error);
        }
        customToken.connections = {
          ...(customToken.connections || {}),
          [account.provider]: {
            name: user?.username || user?.name || "",
            image: user?.image || "",
            accessToken: reponse.token as string,
            expirationTime: reponse.expirationTime as number,
            refreshToken: reponse.refreshToken as string,
            refreshTokenExpirationTime:
              reponse.refreshTokenExpirationTime as number,
            hasLinkedSolana: reponse.hasLinkedSolana,
            provider: account.provider,
          },
        };

        if (customToken.connections) {
          for (const provider in customToken.connections) {
            if (customToken.connections[provider].accessToken) {
              customToken.connections[provider].accessToken =
                customToken.connections[provider].accessToken;
            }
            if (customToken.connections[provider].refreshToken) {
              customToken.connections[provider].refreshToken =
                customToken.connections[provider].refreshToken;
            }
            if (customToken.connections[provider].expirationTime) {
              customToken.connections[provider].expirationTime =
                customToken.connections[provider].expirationTime;
            }
            if (customToken.connections[provider].refreshTokenExpirationTime) {
              customToken.connections[provider].refreshTokenExpirationTime =
                customToken.connections[provider].refreshTokenExpirationTime;
            }
          }
        }
      }
      return token as CustomJWT;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
