export interface CastRoleProps {
  credit_id: string;
  character: string;
  episode_count: number;
}

interface JobProps {
  credit_id: string;
  job: string;
  episode_count: number;
}

export interface AggregateCastProps {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  roles: CastRoleProps[];
  total_episode_count: number;
  order: number;
}

export interface AggregateCrewProps {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  jobs: JobProps[];
  department: string;
  total_episode_count: number;
}

export interface AggregateCreditsApiResponse {
  cast: AggregateCastProps[];
  crew: AggregateCrewProps[];
  id: number;
}
