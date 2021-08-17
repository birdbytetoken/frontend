export default function Footer({ }) {
    return (
        <footer className="justify-center text-center flex flex-wrap pb-14 w-full bg-gradient mt-28">
        <div className="w-full md:w-6/12 px-12 md:px-4">
            <h5 className="text-lg mt-0 mb-2 text-white font-semibold">
              Follow our social media pages to know how to claim your Airdrop.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <a href="https://twitter.com/birdbytetoken" target="_blank">
                <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
                >
                <i className="fab fa-twitter"></i>
              </button>
            </a>
            <a href="https://t.me/birdbytechat" target="_blank">
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fab fa-telegram"></i>
              </button>
              </a>
            <a href="mailto:support@birdbytetoken.com" target="_blank">
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i className="fas fa-envelope"></i>
              </button>
              </a>
            </div>
        </div>
      </footer>
  
    )
}