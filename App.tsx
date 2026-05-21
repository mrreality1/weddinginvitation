import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { LandingPage } from "./components/LandingPage";
import { RejectionPage } from "./components/RejectionPage";
import { CreateAccount } from "./components/CreateAccount";
import type { UserData } from "./components/CreateAccount";
import { ViewTables } from "./components/ViewTables";
import { SelectCeremonySeat } from "./components/SelectCeremonySeat";
import { SelectReceptionSeat } from "./components/SelectReceptionSeat";
import { FinalChanges } from "./components/FinalChanges";
import { ReservationPage } from "./components/ReservationPage";

type Page =
  | "loading"
  | "landing"
  | "rejection"
  | "create-account"
  | "view-tables"
  | "select-ceremony"
  | "select-reception"
  | "final-changes"
  | "reservation";

export default function App() {
  const [page, setPage] = useState<Page>("loading");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [ceremonySeat, setCeremonySeat] = useState<string | null>(null);
  const [receptionSeat, setReceptionSeat] = useState<string | null>(null);

  return (
    <div className="size-full min-h-screen">
      {page === "loading" && (
        <LoadingScreen onComplete={() => setPage("landing")} />
      )}

      {page === "landing" && (
        <LandingPage
          onYes={() => setPage("create-account")}
          onNo={() => setPage("rejection")}
        />
      )}

      {page === "rejection" && (
        <RejectionPage onBack={() => setPage("landing")} />
      )}

      {page === "create-account" && (
        <CreateAccount
          onNext={(data) => {
            setUserData(data);
            setPage("view-tables");
          }}
        />
      )}

      {page === "view-tables" && (
        <ViewTables onNext={() => setPage("select-ceremony")} />
      )}

      {page === "select-ceremony" && (
        <SelectCeremonySeat
          initialSeat={ceremonySeat}
          onNext={(seat) => {
            setCeremonySeat(seat);
            setPage("select-reception");
          }}
        />
      )}

      {page === "select-reception" && (
        <SelectReceptionSeat
          initialSeat={receptionSeat}
          onNext={(seat) => {
            setReceptionSeat(seat);
            setPage("final-changes");
          }}
        />
      )}

      {page === "final-changes" && (
        <FinalChanges
          userData={userData}
          ceremonySeat={ceremonySeat}
          receptionSeat={receptionSeat}
          onConfirm={() => setPage("reservation")}
          onBack={() => {
            setPage("select-ceremony");
          }}
        />
      )}

      {page === "reservation" && (
        <ReservationPage
          userData={userData}
          ceremonySeat={ceremonySeat}
          receptionSeat={receptionSeat}
        />
      )}
    </div>
  );
}
