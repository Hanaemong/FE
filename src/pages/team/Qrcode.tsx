import { useEffect, useRef, useState } from "react";
import { Button, ConfirmCard, Topbar } from "../../components";
import QrScanner from "qr-scanner";
import QRCode from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { transactionApi } from "../../apis/domains/transactionApi";

const Qrcode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as {
    teamId: number;
    from: string;
    memberCnt: number;
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

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
    onSuccess: () => {
      setConfirm(true);
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
        <div className="h-[90vh] flex flex-col justify-between items-center">
          {!confirm ? (
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
          ) : (
            <>
              <ConfirmCard text="결제 완료" />
              <Button
                text="완료"
                onClick={() =>
                  navigate("/team", {
                    state: {
                      teamId: locationState.teamId,
                      from: locationState.from,
                      memberCnt: locationState.memberCnt,
                    },
                  })
                }
              />
            </>
          )}
          <QRCode
            className="size-24 hidden"
            value={JSON.stringify({ teamId: locationState.teamId })}
          />
        </div>
      </div>
    </section>
  );
};

export default Qrcode;
