export interface ShowbizProps {
  id: number;
  media_type: string;
  title: string;
  subtext: string | null;
  pathname: string;
}

export type CategoryProps = Record<string, ShowbizProps[]>;

export type SearchMediaProps = {
  type: string;
  info: ShowbizProps[];
};
