"use client"

import React from "react";

import ClipsScroller from "@/components/ClipsScroller";

interface Props {
    query: string;
}
export const ClipsTab: React.FC<Props> = ({ query }) => {
    return <ClipsScroller query={query} />
}