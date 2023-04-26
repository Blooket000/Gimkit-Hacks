type GrowToSize<T, N extends number, A extends T[]> = 
  A['length'] extends N ? A : GrowToSize<T, N, [...A, T]>;
type FixedArray<T, N extends number> = GrowToSize<T, N, []>;

export type GameState = {
  gameOptions: {
    type: "live";
    specialGameType: [string];
    goal: {
      type: string;
      value: number;
    };
    currency: string;
    language: string;
    startingCash: number;
    handicap: number;
    clapping: boolean;
    cleanPowerupsOnly: boolean;
    music: boolean;
    allowGoogleTranslate: boolean;
    modeOptions: {}
  };
  powerups: {
    name: string;
    displayName?: string;
    description: string;
    icon: string;
    color: {
      background: string;
      text: string;
    }
    baseCost: number;
    percentageCost: number;
    disabled?: string[];
  }[];
  upgrades: {
    name: string;
    description: string;
    icon: string;
    levels: {
      price: number;
      value: number;
    }[];
  }[];
  themes: {
    cost: number;
    name: string;
    description: string;
    question: {
      background: string;
      text: string;
    };
    palette: {
      background: string;
      text: string;
    }[];
  }[];
  disabledThemes: string[];
  news: string[];
}
export type GameQuestion = {
  type: "mc" | "text";
  position: number;
  isActive: boolean;
  _id: string;
  text: string;
  game: string;
  /**
   * type="text" will only have a single index being the correct answer
   */
  answers: {
    correct: boolean;
    _id: string;
    text: string;
  }[],
  image: string;
  audio: string;
  source: string;
  __v: number;
}
export type PardyState = {
  type: string;
  value: {
    board: {
      categories: FixedArray<{
        name: string;
        items: FixedArray<{
          id: string;
          amount: number;
          questionId: string;
        }, 5>;
      }, 3>;
    };
    screen: string | "home";
    questionScreen: string | "preview";
    questionStatus: string | "preview";
    currentRound: null;
    latestQuestionAskedAt: number;
    powers: {
      id: string;
      name: string;
      image: string;
      background: string;
      description: string;
    }[];
    currentQuestionId: string;
    tips: string[];
    answerLockedInWittyMessages: string[];
    correctWittyMessages: string[];
    incorrectWittyMessages: string[];
    finaleQuestionId: string;
    playerCount: number;
    betsPlaced: number;
    playersAnswered: number;
    playersAnsweredCorrectly: number;
    nameOfFirstPlayerToAnswerCorrectly: string;
  } | {
    key: "screen" | "questionStatus" | string;
    value: "ask" | string;
  }
}
export type ImposterPerson = {
  id: string;
  canNeverBeClear: boolean;
  markedAsClear: boolean;
  name: string;
  role: "detective" | "imposter";
  votedOff: boolean;
}
export interface ImposterSelf extends ImposterPerson {
  notes: string;
  blendingIn: boolean;
  currentVote: string;
}
export type ImposterShopItem = {
  background: string;
  cost: number;
  description: string;
  icon: string;
  id: "privateInvestigation" | "publicInvestigation" | "meeting" | "noteViewer" |
    "investigationRemover" | "fakeInvestigation" | "clearListRemover" | "blendIn";
  name: string;
}

export type WSData = {
  ws: WebSocket | null;
  APPLIED_POWERUPS?: string[];
  BALANCE?: number;
  BALANCE_CHANGE?: {
    balanceChangeIfCorrect: number;
    balanceChangeIfIncorrect: number;
  },
  DISABLED_POWERUPS: string[];
  FULL_SCREEN_PLAYER_BLACK?: {
    on: boolean;
  };
  GAME_STATE?: GameState;
  GAME_STATUS?: "join" | "gameplay";
  GAME_QUESTIONS?: GameQuestion[];
  GROUP?: {
    groupId: string;
    groupMemberId: string;
  };
  IMPOSTER_MODE_PEOPLE?: ImposterPerson[];
  IMPOSTER_MODE_PERSON?: ImposterSelf;
  IMPOSTER_MODE_REMAINING_IMPOSTERS?: number;
  IMPOSTER_MODE_REMAINING_INVESTIGATIONS?: number;
  IMPOSTER_MODE_REMAINING_MEETINGS?: number;
  IMPOSTER_MODE_SHOP_ITEMS?: ImposterShopItem[];
  IMPOSTER_MODE_STATUS?: "intro" | "questions" | "voting";
  INCOME_MULTIPLIER?: number;
  LINK_INFO?: {
    id: string;
    name: string;
  };
  MAX_BALANCE?: number;
  NAME?: string;
  PARDY_MODE_PERSON?: [
    {
      type: string;
      value: {
        key: string | "power";
        value: string;
      }
    }
  ];
  PARDY_MODE_STATE?: [ PardyState ];
  PERSONAL_ACTIVE_POWERUPS?: string[];
  PLAYER_LEADERBOARD?: any[];
  PLAYER_QUESTION_LIST?: {
    questionList: string[];
    questionIndex: number;
  };
  PURCHASED_POWERUPS?: string[];
  PURCHASED_THEMES?: string[];
  ROOM?: string;
  SCREEN_ATTACK?: {
    powerupName: string;
    attackerName: string;
    fullScreen: boolean;
  };
  STREAK_AMOUNT?: number;
  THEME?: string;
  UPGRADE_LEVELS?: {
    moneyPerQuestion: number;
    multiplier: number;
    streakBonus: number;
    insurance: number;
  };
  UPGRADE_PRICING_DISCOUNT?: number;
  USED_POWERUPS?: string[];
  QUESTIONS_ANSWERED_CORRECTLY?: number;
  QUESTIONS_ANSWERED_INCORRECTLY?: number;
}