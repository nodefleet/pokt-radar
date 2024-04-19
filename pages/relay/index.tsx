import InputSearch from "@/components/InputSearch";
import { RadioButtonGroup } from "@/components/RadioButton";
import { DoughnutsChartRelay } from "@/components/charts";
import { LatestRelayTable } from "@/components/tables";
import axios from "axios";
import { useEffect, useState } from "react";

interface RelayData {
  chain: string;
  total_relays: number;
  logoURL: string;
  gateway: number;
}

interface RelaysProps {
  dataRelay: RelayData[];
  dataChart: { date: string; count: number }[];
}

export default function Relays({ dataRelay, dataChart }: RelaysProps) {
  const [radioValue, setRadioValue] = useState<string>("all");
  const [relayData, setRelayData] = useState<RelayData[]>(dataRelay);
  const [search, setSearch] = useState<string>("");
  const radio = [
    { label: "All", value: "all" },
    { label: "Nodies", value: "1" },
    { label: "Grove", value: "2" },
  ];
  useEffect(() => {
    if (radioValue !== "all") {
      setRelayData(dataRelay.filter((x) => x.gateway === Number(radioValue)));
    } else {
      setRelayData(dataRelay);
    }
  }, [dataRelay, radioValue]);

  useEffect(() => {
    if (search !== "") {
      setRelayData(
        dataRelay.filter((x) =>
          x.chain.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setRelayData(dataRelay);
    }
  }, [dataRelay, search]);

  return (
    <div className="grow p-6 max-sm:p-4 max-sm:py-4 flex flex-col gap-8">
      <div className="flex flex-row max-sm:flex-col max-sm:gap-2 gap-4">
        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg w-full">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-center w-full">
                <p className="mb-4 text-black font-semibold text-xl">
                  Relays By Chain
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4 -translate-y-2">
                  30D
                </p>
              </div>
              <RadioButtonGroup
                data={radio}
                setCurrentValue={(value) => setRadioValue(value)}
                currentValue={radioValue}
              />
              <InputSearch
                name="relaySearch"
                placeholder="Search..."
                className="w-full"
                setCurrentValue={(value) => setSearch(value)}
                currentValue={search}
              />
            </div>
            <div className="w-full overflow-auto" style={{ maxHeight: "54vh" }}>
              <LatestRelayTable data={relayData} />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-2 bg-white rounded-xl shadow-lg lg:w-7/12">
          <div className="mt-8 md:mt-0 max-sm:mt-0">
            <div className="flex justify-between flex-row gap-3 max-sm:flex-col items-center">
              <div className="flex justify-start flex-row items-start">
                <p className="mb-4 text-black font-semibold text-xl">
                  Relays Distribution
                </p>
                <p className="font-medium text-base rounded-full max-sm:ml-3 ml-5 text-gray-400 outline-1 outline-double outline-gray-400 text-center py-0.5 px-4">
                  24h
                </p>
              </div>
            </div>
            <p className="mb-4 text-black font-semibold text-sm">By Chain</p>
            <hr className="border-gray-bera w-12/12 mx-4 justify-self-center" />
            <div className="w-full h-full max-h-96 p-4">
              <DoughnutsChartRelay resultDought={dataChart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${apiUrl}/api/relay`);

    return {
      props: {
        dataChart: response.data.dataChart,
        dataRelay: response.data.dataRelay,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        dataChart: [],
        dataRelay: [],
      },
    };
  }
}
