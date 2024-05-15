const navItems = {
    tutorial: {id: 2, text: 'Tutorial and Rules', url: '/rulesandtutorial', desc: 'Learn to play Chess'},
    create: {id: 3, text: 'Create Room', url: '/createroom', desc: 'Create a room'},
    join: {id: 4, text: 'Join Room', url: '/joinroom', desc: 'Join a room'},
    practice: {id: 5, text: 'Practice', url: '/play', desc: 'Play in practice mode'},
    login: {id: 6, text: 'Login', url: '/login', desc: 'Log in to your account'},
    signup: {id: 7, text: 'Sign Up', url: '/signup', desc: 'Sign up for a new account'},
    profile: {id: 8, text: 'Profile', url: '/profile', desc: 'View your profile'},
    blog: {id: 9, text: 'Blog', url: '/dev', desc: 'Explore our developer blog'},
    leaderboard: {id: 10, text: 'Leaderboard', url: '/leaderboard', desc: 'See where you stand among other players'},
    match: {id: 11, text: 'Random Match', url: '/match', desc: 'Randomly match and play against other players'},
};


export const navPlayItems = [
    navItems.create,
    navItems.join,
    navItems.practice,
    navItems.match
]

export const navTutorialItems = [
    navItems.tutorial,
];

export const navCommunityItems = [
    navItems.leaderboard,
    navItems.blog,
];


export const navUserItems = [
    {id: 1, text: 'Dashboard', url: '/'},
    {id: 2, text: 'Profile', url: '/profile'},
];

export const NavigationBarHeight = 76;
export const ButtonOffset = 50;