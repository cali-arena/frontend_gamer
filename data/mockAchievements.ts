import { Game, Achievement } from '@/types/achievements';

export const mockGames: Game[] = [
  {
    id: 'fortnite',
    name: 'Fortnite',
    slug: 'fortnite',
    iconUrl: '/games/fortnite-icon.png',
    description: 'Battle Royale Game'
  },
  {
    id: 'valorant',
    name: 'Valorant',
    slug: 'valorant',
    iconUrl: '/games/valorant-icon.png',
    description: 'Tactical FPS Game'
  }
];

export const mockGame = mockGames[0];

// Expanded achievements list (15 achievements)
export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    gameId: 'fortnite',
    name: 'Primeiro Pouso',
    description: 'Complete seu primeiro pouso no jogo',
    iconUrl: '/achievements/primeiro-pouso.png',
    category: 'progression',
    rarity: 'common',
    points: 10,
    isUnlocked: true,
    progress: 100,
    unlockDate: '2024-01-15T10:30:00Z',
    platform: 'Epic Games',
    nickname: 'joivitt',
    event: '--',
    playerPercentage: 85
  },
  {
    id: 'ach-2',
    gameId: 'fortnite',
    name: 'Mestre das Construções',
    description: 'Construa 100 estruturas em uma única partida',
    iconUrl: '/achievements/mestre-construcoes.png',
    category: 'combat',
    rarity: 'rare',
    points: 50,
    isUnlocked: false,
    progress: 65,
    platform: 'Epic Games',
    nickname: 'joivitt',
    event: '--',
    playerPercentage: 42
  },
  {
    id: 'ach-3',
    gameId: 'fortnite',
    name: 'Vitória Real',
    description: 'Vença uma partida Battle Royale',
    iconUrl: '/achievements/vitoria-real.png',
    category: 'combat',
    rarity: 'epic',
    points: 100,
    isUnlocked: true,
    progress: 100,
    unlockDate: '2024-01-20T14:22:00Z',
    platform: 'Epic Games',
    nickname: 'joivitt',
    event: '--',
    playerPercentage: 19
  },
  {
    id: 'ach-4',
    gameId: 'fortnite',
    name: 'Colecionador de Armas',
    description: 'Colete 50 armas diferentes',
    iconUrl: '/achievements/colecionador-armas.png',
    category: 'collection',
    rarity: 'uncommon',
    points: 25,
    isUnlocked: true,
    progress: 100,
    unlockDate: '2024-01-18T09:15:00Z'
  },
  {
    id: 'ach-5',
    gameId: 'fortnite',
    name: 'Explorador',
    description: 'Visite todos os pontos de interesse do mapa',
    iconUrl: '/achievements/explorador.png',
    category: 'exploration',
    rarity: 'rare',
    points: 75,
    isUnlocked: false,
    progress: 42
  },
  {
    id: 'ach-6',
    gameId: 'fortnite',
    name: 'Sobrevivente',
    description: 'Sobreviva por 20 minutos em uma partida',
    iconUrl: '/achievements/sobrevivente.png',
    category: 'progression',
    rarity: 'common',
    points: 15,
    isUnlocked: true,
    progress: 100,
    unlockDate: '2024-01-16T11:20:00Z'
  },
  {
    id: 'ach-7',
    gameId: 'fortnite',
    name: 'Eliminador Profissional',
    description: 'Elimine 100 jogadores',
    iconUrl: '/achievements/eliminador.png',
    category: 'combat',
    rarity: 'epic',
    points: 150,
    isUnlocked: false,
    progress: 78
  },
  {
    id: 'ach-8',
    gameId: 'fortnite',
    name: 'Amigo da Galera',
    description: 'Jogue 50 partidas com amigos',
    iconUrl: '/achievements/amigo-galera.png',
    category: 'social',
    rarity: 'uncommon',
    points: 30,
    isUnlocked: true,
    progress: 100,
    unlockDate: '2024-01-22T16:45:00Z'
  },
  {
    id: 'ach-9',
    gameId: 'fortnite',
    name: 'Mestre do Disfarce',
    description: 'Fique camuflado por 5 minutos consecutivos',
    iconUrl: '/achievements/disfarce.png',
    category: 'special',
    rarity: 'rare',
    points: 60,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'ach-10',
    gameId: 'fortnite',
    name: 'Lenda do Battle Pass',
    description: 'Complete 100 níveis do Battle Pass',
    iconUrl: '/achievements/battle-pass.png',
    category: 'progression',
    rarity: 'legendary',
    points: 200,
    isUnlocked: false,
    progress: 35
  },
  {
    id: 'ach-11',
    gameId: 'fortnite',
    name: 'Caçador de Tesouros',
    description: 'Abra 25 baús em uma única partida',
    iconUrl: '/achievements/tesouros.png',
    category: 'exploration',
    rarity: 'uncommon',
    points: 40,
    isUnlocked: true,
    progress: 100,
    unlockDate: '2024-01-19T13:10:00Z'
  },
  {
    id: 'ach-12',
    gameId: 'fortnite',
    name: 'Estrategista',
    description: 'Vença usando apenas armas comuns',
    iconUrl: '/achievements/estrategista.png',
    category: 'combat',
    rarity: 'epic',
    points: 120,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'ach-13',
    gameId: 'fortnite',
    name: 'Social Butterfly',
    description: 'Adicione 20 amigos',
    iconUrl: '/achievements/social.png',
    category: 'social',
    rarity: 'common',
    points: 20,
    isUnlocked: true,
    progress: 100,
    unlockDate: '2024-01-14T08:30:00Z'
  },
  {
    id: 'ach-14',
    gameId: 'fortnite',
    name: 'Colecionador de Skins',
    description: 'Colete 30 skins diferentes',
    iconUrl: '/achievements/skins.png',
    category: 'collection',
    rarity: 'rare',
    points: 80,
    isUnlocked: false,
    progress: 58
  },
  {
    id: 'ach-15',
    gameId: 'fortnite',
    name: 'Campeão Absoluto',
    description: 'Vença 10 partidas consecutivas',
    iconUrl: '/achievements/campeao.png',
    category: 'special',
    rarity: 'legendary',
    points: 300,
    isUnlocked: false,
    progress: 0
  }
];

// Helper function to get achievements by game
export function getAchievementsByGame(gameId: string): Achievement[] {
  return mockAchievements.filter(ach => ach.gameId === gameId);
}

// Helper function to get friend achievements mapping
// Returns which friends have which achievements
export function getFriendAchievements(): Record<string, string[]> {
  // Mock data: friends who have each achievement
  return {
    'ach-1': ['friend-1', 'friend-2', 'friend-3', 'friend-4'], // Everyone has this
    'ach-2': ['friend-1', 'friend-3'],
    'ach-3': ['friend-1', 'friend-2'],
    'ach-4': ['friend-2', 'friend-3', 'friend-4'],
    'ach-5': ['friend-1'],
    'ach-6': ['friend-1', 'friend-2', 'friend-3'],
    'ach-7': ['friend-1', 'friend-4'],
    'ach-8': ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    'ach-9': [],
    'ach-10': ['friend-2'],
    'ach-11': ['friend-1', 'friend-3'],
    'ach-12': [],
    'ach-13': ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    'ach-14': ['friend-2', 'friend-4'],
    'ach-15': []
  };
}

