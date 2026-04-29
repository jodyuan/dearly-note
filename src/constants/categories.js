/**
 * Single source of truth for every category's visual identity.
 * NoteCard, CategoryNav, and WallBackground all derive from this.
 * Add a new category here and it propagates everywhere.
 */
export const CATEGORIES = {
  daily: {
    key: 'daily',
    label: 'daily',
    noteLabel: "today's note",
    ink: '#3D2B1F',
    accent: '#C49A6C',
    bg: '#FFFCF7',
    border: 'rgba(180,150,110,0.25)',
    tapeColor: 'rgba(240,220,180,0.75)',
    wallTint: 'rgba(255, 244, 230, 0.18)',
    lightSpot: { x: '30%', y: '20%', color: 'rgba(255,230,180,0.22)' },
  },
  birthday: {
    key: 'birthday',
    label: 'birthday',
    noteLabel: 'a birthday note',
    ink: '#4A2D2D',
    accent: '#D4A5A5',
    bg: '#FFF8F8',
    border: 'rgba(200,140,140,0.25)',
    tapeColor: 'rgba(255,200,200,0.65)',
    wallTint: 'rgba(255, 220, 220, 0.15)',
    lightSpot: { x: '70%', y: '15%', color: 'rgba(255,180,180,0.18)' },
  },
  graduation: {
    key: 'graduation',
    label: 'graduation',
    noteLabel: 'for the graduate',
    ink: '#2D334A',
    accent: '#7B8FC2',
    bg: '#F8FAFF',
    border: 'rgba(130,150,200,0.25)',
    tapeColor: 'rgba(180,200,255,0.65)',
    wallTint: 'rgba(220, 230, 255, 0.15)',
    lightSpot: { x: '50%', y: '10%', color: 'rgba(180,200,255,0.18)' },
  },
  'hard day': {
    key: 'hard day',
    label: 'hard day',
    noteLabel: 'for hard days',
    ink: '#333333',
    accent: '#999999',
    bg: '#F8F8F8',
    border: 'rgba(120,120,120,0.20)',
    tapeColor: 'rgba(200,200,200,0.70)',
    wallTint: 'rgba(210, 210, 210, 0.20)',
    lightSpot: { x: '40%', y: '25%', color: 'rgba(190,190,190,0.15)' },
  },
}

/** Ordered list of category keys for nav rendering */
export const CATEGORY_KEYS = Object.keys(CATEGORIES)