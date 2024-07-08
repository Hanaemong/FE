import { useEffect, useRef } from "react";
import { Topbar } from "../../components";
import QrScanner from "qr-scanner";
import QRCode from "qrcode.react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { transactionApi } from "../../apis/domains/transactionApi";

const Qrcode = () => {
  const location = useLocation();
  const locationState = location.state as {
    teamId: number;
    from: string;
  };
  // const [data, setData] = useState("No result");
  const videoRef = useRef<HTMLVideoElement>(null);
  // const qrScannerRef = useRef<QrScanner | null>(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    const parsedData = JSON.parse(result.data);
    console.log(`Scan: ${JSON.stringify(parsedData)}`);
  };
  const QrOptions = {
    preferredCamera: "user",
    maxScansPerSecond: 5,
    highlightScanRegion: true,
  };

  const { mutate: expense } = useMutation({
    mutationFn: (teamId: number) => {
      return transactionApi.getInstance().postExpense(teamId);
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  useEffect(() => {
    const videoElem = videoRef.current;
    const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleScan(result),
        QrOptions
      );
      qrScanner.start();
      QrScanner.scanImage(canvas)
        .then((result) => {
          console.log(result);
          const res = JSON.parse(result);
          console.log(res);
          expense(res.teamId);
        })
        .catch((error) => console.log(error || "No QR code found."));

      return () => qrScanner.destroy();
    }
  }, []);

  return (
    <section>
      <Topbar title="결제 QR" />
      <div className="min-h-real-screen2 flex flex-col">
        <div className="w-full bg-custom-straight-gradient h-[1px]"></div>
        <div className="flex flex-col mt-80 items-center">
          <div className="bg-custom-gradient p-3 rounded-3xl">
            <div
              style={{
                position: "relative",
                width: "320px",
                height: "320px",
              }}
            >
              <video
                ref={videoRef}
                className="rounded-2xl"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
        <QRCode
          className="size-24 hidden"
          value={JSON.stringify({ teamId: locationState.teamId })}
        />
      </div>
    </section>
  );
};

export default Qrcode;
