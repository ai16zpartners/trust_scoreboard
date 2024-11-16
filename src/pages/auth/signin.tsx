import { signIn } from "next-auth/react";
import Image from "next/image";
import styles from "./signin.module.css";
import { useEffect } from "react";
import discordLogo from "../../../public/discordLogo.svg";
import telegramLogo from "../../../public/telegramLogo.svg"

export default function SignIn() {
  const handleDiscordSignIn = () => {
    signIn("discord", { callbackUrl: "/profile" });
  };

  useEffect(() => {
    // Create and inject the Telegram login button
    const telegramContainer = document.getElementById(
      "telegram-login-container"
    );
    if (telegramContainer && !telegramContainer.hasChildNodes()) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", "AI16ZBOT");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "14");
      script.setAttribute("data-onauth", "window.onTelegramAuth(user)");
      script.setAttribute("data-request-access", "write");
      telegramContainer.appendChild(script);
    }

    // Define the auth callback
    window.onTelegramAuth = (user: any) => {
      console.log("Telegram auth:", user);
      signIn("credentials", {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        photo_url: user.photo_url,
        hash: user.hash,
        auth_date: user.auth_date,
        callbackUrl: "/profile",
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Connect your profile</h1>

      <div className={styles.buttonContainer}>
        <button onClick={handleDiscordSignIn} className={styles.discordButton}>
          <Image src={discordLogo} alt="Discord" width={24} height={24} />
          Connect to Discord
        </button>

        <div
        id="telegram-login-container"
        className={styles.discordButton}
        style={{
          backgroundColor: '#54a9eb',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '14px 48px',
          borderRadius: '1000px',
        }}
      >
      </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}
