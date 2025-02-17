"use client";
import React, { useEffect, useState } from "react";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "../ui/tabs";
import { LMiningAndPFiler } from "./liquidityMining";

const EarnTabs = ({ stakeState }: any) => {

  return (
    <div>
      <div className="rounded-3xl backdrop-blur-lg/2 bg-card border border-border ">
        <Tabs defaultValue="Position Mining">
          <TabsList
            className="custom-scrollbar px-3 lg:overflow-hidden overflow-x-scroll flex flex-col justify-between items-center border-border rounded-none">
            <LMiningAndPFiler
              stakeState={stakeState}
            />
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default EarnTabs;
