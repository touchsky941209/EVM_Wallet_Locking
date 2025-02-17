import React, { useEffect, useState } from "react";
import { DialogContent, DialogTitle } from ".";
import { Dialog, DialogTrigger } from "../models";
import { useUtilContext } from "@/hooks";
import {
  Lang_Auto,
  Lang_Confirm,
  Lang_SlipPageSettings,
  Lang_SlipText
} from "@/constants/language"
interface SlippageSettingModalProps {
  onClose: any
}
export default function SlippageSettingModal({ onClose }: SlippageSettingModalProps) {
  const [rate, setRate] = useState<number>(0)


  return (
    <div>
      <DialogContent className=" bg-gradient-bg  flex flex-col gap-y-3 text-white  max-w-md">
        <DialogTitle>
          {Lang_SlipPageSettings.en}
        </DialogTitle>
        <div className=" mt-6">
          <div className=" flex flex-col ">
            <div className="border border-p-light bg-secondary p-2 rounded-lg">
              <div className="flex flex-col ">
                <div className="flex w-full items-center  justify-between ">
                  <div>
                    <input className="text-white text-xl bg-transparent focus:outline-0"
                      onChange={(e: any) => {
                        setRate(e.target.value)
                      }}
                      value={rate}
                    />
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <p className="text-sm">300%</p>
                    <button className="rounded-3xl border border-border bg-card-secondary px-3 py-1 text-lg font-normal"
                      onClick={() => {
                        setRate(300)
                      }}
                    >
                      {Lang_Auto.en}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-justify text-text-secondary">
                {
                   Lang_SlipText.en 
                }
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 ">
          <button className="py-1.5 w-full rounded-full text-lg bg-primary font-bold"
            onClick={() => {
              onClose()
            }}
          >
            {
             Lang_Confirm.en 
            }
          </button>
        </div>
      </DialogContent>
    </div>
  );
}
