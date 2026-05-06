export const getFallbackBackground = (state, node) => {
    const flags = state.flags || {};
    const speaker = node?.speaker || "";
    const location = node?.location || "";
    const text = node?.text || "";
    const context = `${speaker} ${location} ${text}`;

    if (/Out of Money|balance hits zero|Financial Emergency|locked gates|money crisis|hardship bursary|mutual-aid/i.test(context)) {
        return '/images/simulator/cg/cg_money_crisis.jpg';
    }
    if (/Campus Clinic|recovery|sick|Body files a formal complaint/i.test(context)) {
        return '/images/simulator/backgrounds/bg_campus_clinic.jpg';
    }
    if (/club fair|Campus Square|Hundred Regiment|student club/i.test(context)) {
        return '/images/simulator/backgrounds/bg_campus_square_club_fair.jpg';
    }
    if (/festival|Neighbor Li|neighborhood festival/i.test(context)) {
        return '/images/simulator/backgrounds/bg_neighborhood_festival.jpg';
    }
    if (/Language Partner|campus cafe|coffee meetup|check-in dinner|support circle/i.test(context)) {
        return '/images/simulator/backgrounds/bg_campus_cafe.jpg';
    }
    if (/Dorm Common Room|common room|homesick|comfort meal|international territory/i.test(context)) {
        return '/images/simulator/backgrounds/bg_dorm_common_room.jpg';
    }
    if (/Peking Opera|Opera Theater|opera mask/i.test(context)) {
        return '/images/simulator/backgrounds/bg_beijing_opera.jpg';
    }
    if (/Canton Fair|Trade Fair Floor/i.test(context)) {
        return '/images/simulator/backgrounds/bg_canton_fair.jpg';
    }
    if (/Terracotta|Guide Jin/i.test(context)) {
        return '/images/simulator/backgrounds/bg_terracotta_museum.jpg';
    }
    if (/hotpot|mala|sesame oil/i.test(context)) {
        return '/images/simulator/backgrounds/bg_chengdu_hotpot.jpg';
    }
    if (/Panda|panda|conservation|Sanctuary Guide/i.test(context)) {
        return '/images/simulator/backgrounds/bg_chengdu_panda_base.jpg';
    }
    if (/The Bund|Huangpu|Pearl Tower|skyline/i.test(context)) {
        return '/images/simulator/backgrounds/bg_shanghai_bund_evening.jpg';
    }
    if (/Fuxing Park|INS|nightlife|Disco/i.test(context)) {
        return '/images/simulator/backgrounds/bg_fuxing_park_night.jpg';
    }
    if (/Lujiazui|fintech|payment rails|Fintech Coin/i.test(context)) {
        return '/images/simulator/backgrounds/bg_lujiazui_fintech_talk.jpg';
    }
    if (/alumni dinner|business cards|networking/i.test(context)) {
        return '/images/simulator/backgrounds/bg_alumni_dinner.jpg';
    }
    if (/VPN|outside-web|payment problem|payment app|Phone Screen/i.test(context)) {
        return '/images/simulator/backgrounds/bg_phone_network_problem.jpg';
    }
    if (/dorm inspection|Dorm Auntie|hot plates|rice cookers|unauthorized appliances/i.test(context)) {
        return '/images/simulator/backgrounds/bg_dorm_inspection.jpg';
    }
    if (/Beijing|Forbidden City|Qianmen|Hutong|Palace|Peking Opera|Taxi Driver Lao Li/i.test(context)) {
        return '/images/simulator/backgrounds/bg_beijing_hutong.jpg';
    }
    if (/Guangzhou|Canton Fair|Baima|Wholesale Market|Boss Wu|Trade Fair/i.test(context)) {
        return '/images/simulator/backgrounds/bg_guangzhou_market.jpg';
    }
    if (/Chengdu|People's Park|Kuanzhai|hotpot|Teahouse|Sanctuary Guide|panda/i.test(context)) {
        return '/images/simulator/backgrounds/bg_chengdu_teahouse.jpg';
    }
    if (/Xi'an|Terracotta|Muslim Quarter|Ancient City Wall|Guide Jin|Street Vendor/i.test(context)) {
        return '/images/simulator/backgrounds/bg_xian_city_wall.jpg';
    }
    if (/Hangzhou|West Lake|Tea Pavilion|Binjiang|Tech Info Session/i.test(context)) {
        return '/images/simulator/backgrounds/bg_hangzhou_west_lake.jpg';
    }
    if (/Sanya|Houhai|Yalong Bay|Surfer|Beach Club|Public Beach/i.test(context)) {
        return '/images/simulator/backgrounds/bg_sanya_beach.jpg';
    }
    if (/Uncle Wang|BBQ|barbecue|skewer|neighborhood/i.test(context)) {
        return '/images/simulator/backgrounds/bg_uncle_wang_bbq.jpg';
    }
    if (/Sophie|International Student|Minghai Intl|common room|orientation/i.test(context)) {
        return '/images/simulator/backgrounds/bg_international_common_room.jpg';
    }
    if (/Career Office|Manager Zhang|internship|resume|referral|office badge/i.test(context)) {
        return '/images/simulator/backgrounds/bg_career_office.jpg';
    }
    if (/Xiao Chen|incubator|demo|prototype|startup|student-service|Lujiazui|Opportunity/i.test(context)) {
        return '/images/simulator/backgrounds/bg_incubator_room.jpg';
    }
    if (/Metro|Line 2|subway/i.test(context)) {
        return '/images/simulator/backgrounds/bg_shanghai_metro.jpg';
    }
    if (/Professor Lin|office hours|recommendation|academic method|draft feedback/i.test(context)) {
        return '/images/simulator/backgrounds/bg_professor_office.jpg';
    }
    if (/Dr\\. Mei|research discussion|research question|conference abstract|research ethics/i.test(context)) {
        return '/images/simulator/backgrounds/bg_research_meeting_room.jpg';
    }
    if (/Library|research|midterm|academic/i.test(context)) {
        return '/images/simulator/backgrounds/bg_library_night.jpg';
    }

    if (state.phase === "Application") {
        if (flags.accepted_offer) return '/images/simulator/backgrounds/bg_departure_eve_room.jpg';
        return '/images/simulator/backgrounds/bg_application_laptop.jpg';
    }

    if (state.phase === "Pre-Departure") {
        if (state.turn >= 15) return '/images/simulator/backgrounds/bg_predeparture_suitcase.jpg';
        if (state.turn >= 13) return '/images/simulator/backgrounds/bg_airplane_window.jpg';
        return '/images/simulator/cg/cg_document_stack_jw202.jpg';
    }

    if (state.phase === "In-China") {
        if (!flags.arrived_in_china) return '/images/simulator/backgrounds/bg_pudong_arrivals.jpg';
        return '/images/simulator/backgrounds/bg_minghai_gate.jpg';
    }

    return '/images/simulator/hub_bg.jpg';
};
