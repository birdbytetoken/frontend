import Layout from '../components/layout'

export default function Features() {
  return (
    <Layout>
        <div className="w-full px-4">
          <div className="md:pt-32 sm:pt-0">
            <h2 className="text-center font-semibold text-4xl text-white">
                FEATURES
            </h2>
            <div className="mt-4">
              <div className="p-2 md:p-4 w-full md:w-6/12 font-semibold text-lg mt-4">
                <h3 className="text-2xl">LP Tokens Locked</h3>
                  <p>
                    BirdByte Lp tokens are locked and is completly unruggable, this is for the safety of BirdByte investors.
                </p>
              </div>
              <div className="p-2 md:p-4 w-full md:w-6/12 font-semibold text-lg mt-4">
                <h3 className="text-2xl">Referrers Airdrop</h3>
                  <p>You can refer a friend to earn some BirdByte. just register with your receiving address and share link with
                    your friends.
                </p>
              </div>
              <div className="p-2 md:p-4 w-full md:w-6/12 font-semibold text-lg mt-4">
                <h3 className="text-2xl">Constant burn</h3>
                  <p>The BirdByte team keeps burning BirdByte and will always find new ways to burn more
                    to keep BirdByte supply deflated.
                </p>
              </div>
              <div className="p-2 md:p-4 w-full md:w-6/12 font-semibold text-lg mt-4">
                <h3 className="text-2xl">Utility driven</h3>
                  <p>Our biggest Utility is the multi-player Game we are developing two beautiful games. Action & sport with cool graphics!
                </p>
              </div>

            </div>
          </div>
        </div>

    </Layout>
  )
}
