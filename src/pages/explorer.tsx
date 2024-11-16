import type { NextPage } from "next";
import Head from "next/head";
import ExplorerView from "../views/explorer";

const Explorer: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Explorer</title>
        <meta
          name="description"
          content="Explorer"
        />
      </Head>
      <ExplorerView />
    </div>
  );
};

// Add this to explicitly tell Next.js this is not a dynamic page
export const getStaticProps = () => {
    return {
      props: {}
    };
  };

export default Explorer;
