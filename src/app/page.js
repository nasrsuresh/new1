import Header from "@/components/Header";
import Research from "@/components/Sections/Dashboard/Research";
import AAPL from "@/components/Sections/Dashboard/AAPL";
import { Inter } from "next/font/google";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });
export default function Home() {
  return (
    <main className={`${inter.className} h-[100vh]"`}>
      <Header />
      <div className="w-100 h-[92vh] flex">
        <Research />
        <AAPL />
      </div>
    </main>
  )
}
