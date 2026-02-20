export interface BaseCreditProps {
  adult: boolean;
  gender: number; // 0 = unknown, 1 = female, 2 = male
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CastMemberProps extends BaseCreditProps {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMemberProps extends BaseCreditProps {
  credit_id: string;
  department: string;
  job: string;
}

export interface CreditsApiResponse {
  cast: CastMemberProps[];
  crew: CrewMemberProps[];
  id: number;
}
