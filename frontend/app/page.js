import Image from "next/image";
import LandingPageNavbar from "./components/Navbar";
import {
  SigninButton,
} from "./components/Button";

import JobCategoryCard from "./components/JobCategoryCard";
import StepsCard from "./components/StepsCard";
import CompanyCarousel from "./components/CompanyCarousel";
import Footer from "./components/Footer";
import { ApplySvg, RegisterSvg, SearchSvg } from "./public/images/SVG/svg";


export default function Home() {
  return (
    <main className="relative">
      <LandingPageNavbar />
      <div
        className="heroSection relative bg-no-repeat bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gray-950 opacity-80"></div>
        <div className="relative flex justify-center text-center lg:text-left z-10 px-10 py-36 md:py-51">
          <div className="flex-col py-7">
            <h1 className="text-white text-3xl lg:text-5xl font-semibold pt-3">
              Discover Opportunities That Fit You
            </h1>
            <p className="font-bold text-lg py-4" style={{ color: "#C0C0C0" }}>
              Where Talent Meets Opportunity: Find Your Dream Job
            </p>
            {/* <div className="flex justify-center mt-7">
              <form className="lg:w-[770px] md:w-[500px] sm:w-[420px]">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Type Here"
                    className="w-full py-3 px-5 border border-black rounded-full bg-gray-600"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-500 rounded-full">
                    <SearchSvg fill={"white"} width={"20"} height={"20"}/>
                  </button>
                </div>
                <div className="absolute top-200 p-4 bg-gray-300 text-white w-full rounded-al left-1/2 -translate-x-1/2 flex flex-col gap-2">

              </div>
              </form>
            </div> */}
            <div className="flex justify-center mt-7">
              <form className="">
                <div className="relative">
                  <div className="w-full py-4 px-5 border rounded bg-gray-700 flex flex-col gap-6 lg:flex-row">
                    <input
                      type="search"
                      placeholder="Keywords"
                      className="bg-white rounded py-2 ps-2 pe-10"
                    />
                    <input
                      type="search"
                      placeholder="Location"
                      className="bg-white rounded py-2 ps-2 pe-10"
                    />
                    <select className="bg-white rounded py-2 ps-2 pe-28">
                      <option value="volvo">Job Catagory</option>
                      <option className="text-black" value="volvo">
                        Volvo
                      </option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                    {/* <SearchButton /> */}
                    <SigninButton title={"Search"} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="jobSection bg-white py-20 border-b">
        <h1 className="font-medium text-center text-2xl md:text-3xl text-black pb-12">
          Job Categories
        </h1>
        <div className="flex flex-wrap gap-7 justify-center w-full h-full px-40">
          <JobCategoryCard />
          <JobCategoryCard />
          <JobCategoryCard />
          <JobCategoryCard />
          <JobCategoryCard />
          <JobCategoryCard />
          <JobCategoryCard />
          <JobCategoryCard />
        </div>
      </div>
      <div className="bg-gray-100 px-14 py-16 md:py-20 md:px-16 lg:p-24">
        <h1 className="font-medium text-center text-2xl md:text-3xl text-black pb-2">
          How it works
        </h1>
        <p className="text-gray-500 text-center pb-10">
          Follow the instructions below and get started
        </p>
        <div className="flex flex-wrap md:flex-nowrap justify-center lg:gap-7 gap-3 lg:px-12">
          <StepsCard
            icon={<RegisterSvg />}
            title={"Register"}
            text={"Sign up as an Employer or a Candidate for free."}
          />
          <StepsCard
            icon={<SearchSvg fill={"#4C3BCF"} width={"50"} height={"50"} />}
            title={"Search"}
            text={
              "Browse throught open positions to find the right job for you."
            }
          />
          <StepsCard
            icon={<ApplySvg />}
            title={"Apply"}
            text={"Apply to a job with your resume and change your Career."}
          />
        </div>
      </div>
      <div className="bg-white py-20">
        <h1 className="font-medium text-center text-2xl md:text-3xl text-black pb-10">
          Featured Companies
        </h1>
        <CompanyCarousel />
      </div>
      <Footer />
    </main>
  );
}
