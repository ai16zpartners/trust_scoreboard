import type { NextPage } from "next";
import Head from "next/head";
import ElizaView from "../views/eliza";

const Eliza: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Deploy Your Own Eliza Today!</title>
        <meta
          name="description"
          content="Checkout and deploy your own Eliza today!"
        />
      </Head>
      <ElizaView />
    </div>
  );
};

export default Eliza;