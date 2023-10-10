export type PlayerData = {
  IsAnonymized: boolean;
  IsBanned: boolean;
  PlayerCardID: string;
  TitleID: string;
  competitiveTier: number;
  gameName: string;
  leaderboardRank: number;
  numberOfWins: number;
  puuid: string;
  rankedRating: number;
  tagLine: string;
};

export type LeaderboardData = {
  immortal_1_threshold: number;
  immortal_2_threshold: number;
  immortal_3_threshold: number;
  last_update: number;
  next_update: number;
  players: PlayerData[]; // You can specify the type for 'players' if you have more details.
  radiant_threshold: number;
  total_players: number;
};

export type MatchesByNameAndTagData = {
  status: number;
  data: MatchResponse[];
};

type FriendlyFire = {
  incoming: number;
  outgoing: number;
};

type OS = {
  name: string;
  version: string;
};

type Economy = {
  spent: {
    overall: number;
    average: number;
  };
  loadout_value: {
    overall: number;
    average: number;
  };
};

type AbilityCasts = {
  c_cast: number;
  q_cast: number;
  e_cast: number;
  x_cast: number;
};

type Behaviour = {
  afk_rounds: number;
  friendly_fire: FriendlyFire;
  rounds_in_spawn: number;
};

type PlayerStats = {
  ability_casts: AbilityCasts;
  player_puuid: string;
  player_display_name: string;
  player_team: string;
  damage_events: any[];
  damage: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
  kill_events: any[]; // Define the properties of KillEvent if needed
  kills: number;
  score: number;
  economy: Economy;
  was_afk: boolean;
  was_penalized: boolean;
  stayed_in_spawn: boolean;
};

export type PlayerMatchData = {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  level: number;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  player_card: string;
  player_title: string;
  party_id: string;
  session_playtime: {
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  assets: {
    card: {
      small: string;
      large: string;
      wide: string;
    };
    agent: {
      small: string;
      full: string;
      bust: string;
      killfeed: string;
    };
  };
  behaviour: {
    afk_rounds: number;
    friendly_fire: FriendlyFire;
    rounds_in_spawn: number;
  };
  platform: {
    type: string;
    os: OS;
  };
  ability_casts: {
    c_cast: number;
    q_cast: number;
    e_cast: number;
    x_cast: number;
  };
  stats: {
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    bodyshots: number;
    headshots: number;
    legshots: number;
  };
  economy: {
    spent: {
      overall: number;
      average: number;
    };
    loadout_value: {
      overall: number;
      average: number;
    };
  };
  damage_made: number;
  damage_received: number;
};

type Round = {
  winning_team: string;
  end_type: string;
  bomb_planted: boolean;
  bomb_defused: boolean;
  plant_events: any[]; // Define the properties of PlantEvent if needed
  defuse_events: any[]; // Define the properties of DefuseEvent if needed
  player_stats: PlayerStats[];
};

type TeamStats = {
  has_won: boolean;
  rounds_won: number;
  rounds_lost: number;
};

export type Players = {
  all_players: PlayerMatchData[];
  red: PlayerMatchData[];
  blue: PlayerMatchData[];
};

type Teams = {
  red: TeamStats;
  blue: TeamStats;
};

type Metadata = {
  map: string;
  game_version: string;
  game_length: number;
  game_start: number;
  game_start_patched: string;
  rounds_played: number;
  mode: string;
  queue: string;
  season_id: string;
  platform: string;
  matchid: string;
  region: string;
  cluster: string;
};

export type MatchResponse = {
  metadata: Metadata;
  players: Players;
  teams: Teams;
  rounds: Round[];
};

export type PostData = {
  createdAt: string;
  authorName: string;
  authorAvatar: string;
  postText: string;
  postImage: string;
  id: string;
};

export enum Region {
  EU = 'eu',
  NA = 'na',
  KR = 'kr',
  AP = 'ap',
  LATAM = 'latam',
  BR = 'br'
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}
