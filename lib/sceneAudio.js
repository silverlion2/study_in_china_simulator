export const getSceneBgmId = (state, node, screenMode) => {
    if (screenMode !== "game") return "title";

    const phase = state?.phase || "Application";
    const nodeId = state?.currentNodeId || "";
    const speaker = node?.speaker || "";
    const location = node?.location || "";
    const text = node?.text || "";
    const context = `${nodeId} ${speaker} ${location} ${text}`;

    if (/Out of Money|Financial Emergency|money crisis|ending_out_of_money|quiet return|game_over_wealth/i.test(context)) {
        return "crisisMoney";
    }
    if (/ending_/i.test(nodeId)) {
        if (/out_of_money|quiet|failed|bad/i.test(nodeId)) return "quietEnding";
        return "goodEnding";
    }
    if (/Xiao Chen|incubator|demo|prototype|startup|angel/i.test(context)) return "startupDemo";
    if (/Manager Zhang|Career Office|internship|office badge|return offer|alumni dinner/i.test(context)) return "careerOffice";
    if (/Uncle Wang|Neighbor Li|BBQ|barbecue|skewer|festival|neighborhood/i.test(context)) return "localLife";
    if (/Sophie|International Student|support circle|common room|orientation/i.test(context)) return "socialWarm";
    if (/Professor Lin|Dr\\. Mei|Library|research|classroom|midterm|academic|office hours/i.test(context)) return "studyLibrary";
    if (/Bund|Metro|Line 2|Lujiazui|Shanghai city|Fuxing|nightlife|city/i.test(context)) return "shanghaiCity";

    if (phase === "Application") {
        if (/deadline|interview|submit|feedback|decision|result/i.test(context)) return "applicationPressure";
        return "applicationLateNight";
    }
    if (phase === "Pre-Departure") {
        if (/JW202|visa|document|admission package|paperwork/i.test(context)) return "documentsAdmin";
        if (/flight|boarding|airplane|arrival|Pudong/i.test(context)) return "flightArrival";
        return "predepartureHome";
    }
    if (phase === "In-China" && !state?.flags?.arrived_in_china) {
        return "flightArrival";
    }

    return "campusDaily";
};

export const getSceneAmbienceId = (state, node, screenMode) => {
    if (screenMode !== "game") return null;

    const phase = state?.phase || "Application";
    const speaker = node?.speaker || "";
    const location = node?.location || "";
    const text = node?.text || "";
    const bgImage = node?.bgImage || "";
    const context = `${speaker} ${location} ${text} ${bgImage}`;

    if (/Pudong|airport|arrival hall|arrivals|flight|boarding|airplane/i.test(context)) return "airportArrivals";
    if (/canteen|first meal|Alipay|meal card|food court/i.test(context)) return "canteen";
    if (/Library|midterm|study group|lecture|classroom|research notes/i.test(context)) return "library";
    if (/Career Office|office badge|Manager Zhang|internship|alumni dinner|office tower/i.test(context)) return "office";
    if (/Incubator|startup|prototype|demo|Xiao Chen|telemetry/i.test(context)) return "incubator";
    if (/Metro|Line 2|subway|DiDi|pickup zone|Bund|Lujiazui|Fuxing|street|gate/i.test(context)) return "streetNight";
    if (/Uncle Wang|BBQ|barbecue|skewer|stall|hotpot/i.test(context)) return "bbqStall";
    if (/Dorm|roommate|housing|parcel|common room|Sophie|International Student/i.test(context)) return "dormRoom";
    if (phase === "In-China") return "campusSquare";
    return null;
};
