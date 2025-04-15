import { api } from "@/shared/api/base.ts";
import { Team } from "@/entities/team/model/types.ts";

export const teamApi = {
    getAllTeams: (signal?: AbortSignal) =>
        api.get<{ data: Team[] }>("/teams", { signal }),

    getTeamById: (id: string, signal?: AbortSignal) =>
        api.get<{ data: Team }>(`/teams/${id}`, { signal }),
};
