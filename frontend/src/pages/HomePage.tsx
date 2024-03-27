const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lf shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-gray-400">
          Deliver Green, Deliver Fast
        </h1>
        <span className="text-xl">Eco-Friendly, On Time</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src="/assets/landing.png" alt="Landing image" />
        <div className="flex flex-col items-center justify gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order even faster
          </span>
          <span>
            Download Deliv-early App for faster ordering and personalised recommendations
          </span>
          <img src="/assets/appDownload.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
