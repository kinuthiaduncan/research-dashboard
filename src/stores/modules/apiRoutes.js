const state = {
    main_url: "localhost:9000",
    all_participants: "/dashboard/all_participants",
    group_by_age: "/dashboard/group_by_age",
    gender_age_group: "/focus_groups/gender_age_group"
};

const getters = {
    main_url: (state) => {
        return state.main_url;
    },
    all_participants: (state) => {
        return state.all_participants;
    },
    group_by_age: (state) => {
        return state.group_by_age;
    },
    gender_age_group: (state) => {
        return state.gender_age_group;
    },
};

export default {
    state,
    getters
}