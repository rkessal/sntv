"use client";
const PreloaderLogo = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchLottieData = async () => {
      const response = await fetch("/lottie/sntv-logo.json");
      const data = await response.json();
      setAnimationData(data);
    };

    fetchLottieData();
  }, []);

  return <Lottie animationData={animationData} />;
};

export default PreloaderLogo;
